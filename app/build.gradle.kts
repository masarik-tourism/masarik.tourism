import java.util.Base64

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.masarik.tourism"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.masarik.tourism"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        create("release") {
            val keystoreFile = file("${rootDir}/debug.keystore")
            if (keystoreFile.exists()) {
                storeFile = keystoreFile
            } else {
                val base64File = file("${rootDir}/debug.keystore.base64")
                if (base64File.exists()) {
                    val bytes = Base64.getDecoder().decode(base64File.readText().trim())
                    keystoreFile.writeBytes(bytes)
                    storeFile = keystoreFile
                }
            }
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
        getByName("debug") {
            val keystoreFile = file("${rootDir}/debug.keystore")
            if (keystoreFile.exists()) {
                storeFile = keystoreFile
            } else {
                val base64File = file("${rootDir}/debug.keystore.base64")
                if (base64File.exists()) {
                    val bytes = Base64.getDecoder().decode(base64File.readText().trim())
                    keystoreFile.writeBytes(bytes)
                    storeFile = keystoreFile
                }
            }
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        debug {
            signingConfig = signingConfigs.getByName("debug")
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

    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
