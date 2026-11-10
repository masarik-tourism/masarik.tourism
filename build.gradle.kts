// Top-level build file where you can add configuration options common to all sub-projects/modules.
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.Properties

plugins {
    id("com.android.application") version "9.1.1" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.2.10" apply false
}

// ---------------------------------------------------------
// Root Task: Automated Version Increment
// ---------------------------------------------------------
tasks.register("incrementVersionCode") {
    description = "Increments the VERSION_CODE in version.properties for automated releases"
    group = "versioning"
    doLast {
        val versionPropsFile = file("version.properties")
        val props = Properties()
        if (versionPropsFile.exists()) {
            FileInputStream(versionPropsFile).use { props.load(it) }
            val currentCode = props.getProperty("VERSION_CODE", "34").toInt()
            val nextCode = currentCode + 1
            props["VERSION_CODE"] = nextCode.toString()
            FileOutputStream(versionPropsFile).use {
                props.store(it, "Automated Version Increment")
            }
            println("==> [Version Auto-Increment] Successfully bumped VERSION_CODE: $currentCode -> $nextCode")
        } else {
            props["VERSION_CODE"] = "35"
            props["VERSION_NAME"] = "3.3.4"
            FileOutputStream(versionPropsFile).use {
                props.store(it, "Automated Version Increment")
            }
            println("==> [Version Auto-Increment] Created version.properties with VERSION_CODE: 35")
        }
    }
}
