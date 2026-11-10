import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.Base64
import java.util.Properties

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.plugin.compose")
}

// ---------------------------------------------------------
// 1. Automated Versioning Logic (Reads from version.properties)
// ---------------------------------------------------------
val versionPropsFile = file("${rootDir}/version.properties")

fun loadVersionProps(): Properties {
    val props = Properties()
    if (versionPropsFile.exists()) {
        try {
            FileInputStream(versionPropsFile).use { props.load(it) }
        } catch (_: Exception) {}
    }
    return props
}

val currentProps = loadVersionProps()
val baseVersionCode = currentProps.getProperty("VERSION_CODE", "34").toIntOrNull() ?: 34
val baseVersionName = currentProps.getProperty("VERSION_NAME", "3.3.4")

// In GitHub Actions, add GITHUB_RUN_NUMBER to ensure strictly monotonic increase
val ciRunNumber = System.getenv("GITHUB_RUN_NUMBER")?.toIntOrNull() ?: 0
val resolvedVersionCode = if (ciRunNumber > 0) {
    baseVersionCode + ciRunNumber
} else {
    baseVersionCode
}

android {
    namespace = "com.masarik.tourism"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.masarik.tourism"
        minSdk = 26
        targetSdk = 35
        versionCode = resolvedVersionCode
        versionName = baseVersionName

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        create("release") {
            val releaseKeystore = file("${rootDir}/release.keystore")
            if (!releaseKeystore.exists()) {
                val releaseBase64 = System.getenv("RELEASE_KEYSTORE_BASE64")
                if (!releaseBase64.isNullOrBlank()) {
                    val bytes = Base64.getDecoder().decode(releaseBase64.trim())
                    releaseKeystore.writeBytes(bytes)
                } else {
                    val base64File = file("${rootDir}/release.keystore.base64")
                    val fallbackDebug = file("${rootDir}/debug.keystore.base64")
                    if (base64File.exists()) {
                        val bytes = Base64.getDecoder().decode(base64File.readText().trim())
                        releaseKeystore.writeBytes(bytes)
                    } else if (fallbackDebug.exists()) {
                        val bytes = Base64.getDecoder().decode(fallbackDebug.readText().trim())
                        releaseKeystore.writeBytes(bytes)
                    }
                }
            }

            storeFile = releaseKeystore
            storePassword = System.getenv("KEYSTORE_PASSWORD") ?: "android"
            keyAlias = System.getenv("KEY_ALIAS") ?: "androiddebugkey"
            keyPassword = System.getenv("KEY_PASSWORD") ?: "android"

            enableV1Signing = true
            enableV2Signing = true
        }
    }

    buildTypes {
        debug {
            signingConfig = signingConfigs.getByName("release")
        }
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    // ---------------------------------------------------------
    // Fixed APK Output Filename: Strictly Masarik-Tourism.apk
    // ---------------------------------------------------------
    applicationVariants.all {
        outputs.all {
            try {
                val setMethod = this.javaClass.getMethod("setOutputFileName", String::class.java)
                setMethod.invoke(this, "Masarik-Tourism.apk")
            } catch (_: Exception) {
                // Handled in workflow post-build
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.09.02")
    implementation(composeBom)
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.6")
    implementation("androidx.activity:activity-compose:1.9.2")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.1")
    implementation("io.coil-kt:coil-compose:2.7.0")
}
