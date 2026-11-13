# Proguard rules for Masarik Tourism Android App
-keepattributes *Annotation*,JavascriptInterface
-keep class com.masarik.tourism.AndroidBridge { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-dontwarn java.lang.invoke.**
