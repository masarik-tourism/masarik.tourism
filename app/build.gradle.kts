import java.util.Base64

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.masarik.tourism"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.masarik.tourism"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        create("release") {
            val keystoreFile = file("${rootDir}/release.keystore")
            val base64File = file("${rootDir}/release.keystore.base64")
            val fallbackDebugBase64 = file("${rootDir}/debug.keystore.base64")

            if (!keystoreFile.exists()) {
                val customB64 = System.getenv("RELEASE_KEYSTORE_BASE64")
                if (!customB64.isNullOrBlank()) {
                    keystoreFile.writeBytes(Base64.getDecoder().decode(customB64.trim()))
                } else if (base64File.exists()) {
                    keystoreFile.writeBytes(Base64.getDecoder().decode(base64File.readText().trim()))
                } else if (fallbackDebugBase64.exists()) {
                    keystoreFile.writeBytes(Base64.getDecoder().decode(fallbackDebugBase64.readText().trim()))
                }
            }

            storeFile = if (keystoreFile.exists()) keystoreFile else file("${rootDir}/debug.keystore")
            storePassword = System.getenv("KEYSTORE_PASSWORD")?.takeIf { it.isNotBlank() } ?: "android"
            keyAlias = System.getenv("KEY_ALIAS")?.takeIf { it.isNotBlank() } ?: "androiddebugkey"
            keyPassword = System.getenv("KEY_PASSWORD")?.takeIf { it.isNotBlank() } ?: "android"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    base {
        archivesName.set("Masarik-Tourism")
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

androidComponents {
    beforeVariants { variantBuilder ->
        if (variantBuilder.buildType != "release") {
            variantBuilder.enable = false
        }
    }
}
