package com.masarik.tourism

import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.Settings
import android.view.ViewGroup
import android.webkit.CookieManager
import android.webkit.URLUtil
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.SystemUpdate
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.FileProvider
import com.masarik.tourism.data.TravelRepository
import com.masarik.tourism.ui.theme.MasarikTourismTheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL

data class AppReleaseUpdate(
    val latestVersion: String,
    val downloadUrl: String,
    val releaseNotes: String
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MasarikTourismTheme {
                CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
                    val finalUrl = if (TravelRepository.WEB_URL.contains("?")) {
                        "${TravelRepository.WEB_URL}&app=1"
                    } else {
                        "${TravelRepository.WEB_URL}?app=1"
                    }
                    MainWebViewScreen(
                        targetUrl = finalUrl,
                        onFinishActivity = { finish() }
                    )
                }
            }
        }
    }
}

private fun getInstalledVersionName(context: Context): String {
    return try {
        val pInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            context.packageManager.getPackageInfo(
                context.packageName,
                android.content.pm.PackageManager.PackageInfoFlags.of(0)
            )
        } else {
            @Suppress("DEPRECATION")
            context.packageManager.getPackageInfo(context.packageName, 0)
        }
        pInfo.versionName ?: "3.3.4"
    } catch (_: Exception) {
        "3.3.4"
    }
}

private fun isRemoteVersionNewer(remoteTag: String, localVersion: String): Boolean {
    val cleanRemote = remoteTag.trim().removePrefix("v").removePrefix("V")
    val cleanLocal = localVersion.trim().removePrefix("v").removePrefix("V")
    val remoteParts = cleanRemote.split(".").mapNotNull { it.filter(Char::isDigit).toIntOrNull() }
    val localParts = cleanLocal.split(".").mapNotNull { it.filter(Char::isDigit).toIntOrNull() }
    val maxLen = maxOf(remoteParts.size, localParts.size)
    for (i in 0 until maxLen) {
        val r = remoteParts.getOrElse(i) { 0 }
        val l = localParts.getOrElse(i) { 0 }
        if (r > l) return true
        if (r < l) return false
    }
    return false
}

private fun enqueueDownloadWithManager(
    context: Context,
    url: String,
    userAgent: String? = null,
    contentDisposition: String? = null,
    mimeType: String? = null
): Boolean {
    return try {
        val lowerUrl = url.lowercase()
        val isApk = lowerUrl.endsWith(".apk") ||
            lowerUrl.contains(".apk?") ||
            lowerUrl.contains("/releases/latest/download/") ||
            lowerUrl.contains("/releases/download/") ||
            mimeType.equals("application/vnd.android.package-archive", ignoreCase = true)

        val effectiveMimeType = if (isApk) {
            "application/vnd.android.package-archive"
        } else {
            mimeType ?: "application/octet-stream"
        }

        var fileName = URLUtil.guessFileName(url, contentDisposition, effectiveMimeType)
        if (isApk && !fileName.endsWith(".apk", ignoreCase = true)) {
            fileName = "Masarik-Tourism.apk"
        }

        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager

        fun buildRequest(usePublicDir: Boolean): DownloadManager.Request {
            return DownloadManager.Request(Uri.parse(url)).apply {
                setMimeType(effectiveMimeType)
                if (!userAgent.isNullOrBlank()) {
                    addRequestHeader("User-Agent", userAgent)
                }
                val cookies = CookieManager.getInstance().getCookie(url)
                if (!cookies.isNullOrBlank()) {
                    addRequestHeader("Cookie", cookies)
                }
                setTitle("مسارك للإنجاز السياحي - تحميل التحديث")
                setDescription("جاري تحميل $fileName")
                setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                setAllowedOverMetered(true)
                setAllowedOverRoaming(true)
                if (usePublicDir) {
                    setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName)
                } else {
                    setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, fileName)
                }
            }
        }

        try {
            downloadManager.enqueue(buildRequest(usePublicDir = true))
        } catch (_: SecurityException) {
            downloadManager.enqueue(buildRequest(usePublicDir = false))
        }

        Toast.makeText(
            context,
            "بدأ تحميل $fileName — تابع التقدم في شريط الإشعارات",
            Toast.LENGTH_LONG
        ).show()
        true
    } catch (_: Exception) {
        false
    }
}

private fun openInExternalBrowser(context: Context, url: String) {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
    } catch (_: Exception) {
        Toast.makeText(context, "تعذر فتح رابط التحميل", Toast.LENGTH_SHORT).show()
    }
}

private suspend fun checkLatestGitHubRelease(installedVersion: String): AppReleaseUpdate? =
    withContext(Dispatchers.IO) {
        try {
            val apiUrl =
                "https://api.github.com/repos/masarik-tourism/masarik.tourism/releases/latest?t=${System.currentTimeMillis()}"
            val conn = (URL(apiUrl).openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                connectTimeout = 10000
                readTimeout = 10000
                useCaches = false
                setRequestProperty("Accept", "application/vnd.github.v3+json")
                setRequestProperty("Cache-Control", "no-cache, no-store, must-revalidate")
                setRequestProperty("Pragma", "no-cache")
            }

            if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                val body = conn.inputStream.bufferedReader().use { it.readText() }
                val json = JSONObject(body)
                val tagName = json.optString("tag_name", "").trim()
                if (tagName.isNotEmpty() && isRemoteVersionNewer(tagName, installedVersion)) {
                    var apkUrl =
                        "https://github.com/masarik-tourism/masarik.tourism/releases/latest/download/Masarik-Tourism.apk"
                    val assets = json.optJSONArray("assets")
                    if (assets != null) {
                        for (i in 0 until assets.length()) {
                            val asset = assets.getJSONObject(i)
                            val name = asset.optString("name", "")
                            if (name.endsWith(".apk", ignoreCase = true)) {
                                apkUrl = asset.optString("browser_download_url", apkUrl)
                                break
                            }
                        }
                    }
                    return@withContext AppReleaseUpdate(
                        latestVersion = tagName,
                        downloadUrl = apkUrl,
                        releaseNotes = json.optString("body", "")
                    )
                }
            }
        } catch (_: Exception) {
        }
        null
    }

private suspend fun downloadAndInstallApk(
    context: Context,
    apkUrl: String,
    onProgress: (Float) -> Unit
): File? = withContext(Dispatchers.IO) {
    try {
        val conn = (URL(apkUrl).openConnection() as HttpURLConnection).apply {
            instanceFollowRedirects = true
            connectTimeout = 15000
            readTimeout = 30000
            useCaches = false
        }
        conn.connect()

        if (conn.responseCode !in 200..299) return@withContext null

        val totalBytes = conn.contentLength.toLong()
        val outputDir = context.externalCacheDir ?: context.cacheDir
        val apkFile = File(outputDir, "Masarik-Tourism-update.apk")
        if (apkFile.exists()) apkFile.delete()

        conn.inputStream.use { input ->
            FileOutputStream(apkFile).use { output ->
                val buffer = ByteArray(8192)
                var downloaded = 0L
                var read: Int
                while (input.read(buffer).also { read = it } != -1) {
                    output.write(buffer, 0, read)
                    downloaded += read
                    if (totalBytes > 0) {
                        val pct = (downloaded.toFloat() / totalBytes.toFloat()).coerceIn(0f, 1f)
                        withContext(Dispatchers.Main) { onProgress(pct) }
                    }
                }
                output.flush()
            }
        }

        if (apkFile.exists() && apkFile.length() > 0) apkFile else null
    } catch (_: Exception) {
        null
    }
}

private fun installApkFile(context: Context, apkFile: File) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O &&
        !context.packageManager.canRequestPackageInstalls()
    ) {
        val permIntent = Intent(
            Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
            Uri.parse("package:${context.packageName}")
        ).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(permIntent)
        return
    }

    val apkUri = FileProvider.getUriForFile(
        context,
        "${context.packageName}.fileprovider",
        apkFile
    )
    val installIntent = Intent(Intent.ACTION_VIEW).apply {
        setDataAndType(apkUri, "application/vnd.android.package-archive")
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION)
    }
    context.startActivity(installIntent)
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun MainWebViewScreen(
    targetUrl: String,
    onFinishActivity: () -> Unit
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    val installedVersion = remember { getInstalledVersionName(context) }

    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var isLoading by remember { mutableStateOf(true) }
    var progress by remember { mutableFloatStateOf(0f) }
    var hasError by remember { mutableStateOf(false) }

    var availableUpdate by remember { mutableStateOf<AppReleaseUpdate?>(null) }
    var isDownloadingUpdate by remember { mutableStateOf(false) }
    var downloadProgress by remember { mutableFloatStateOf(0f) }
    var updateErrorMsg by remember { mutableStateOf<String?>(null) }

    // Check GitHub Releases automatically on app startup
    LaunchedEffect(Unit) {
        availableUpdate = checkLatestGitHubRelease(installedVersion)
    }

    // Navigate back in web history if possible, else finish activity
    BackHandler {
        if (webViewInstance?.canGoBack() == true) {
            webViewInstance?.goBack()
        } else {
            onFinishActivity()
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .statusBarsPadding()
            .navigationBarsPadding()
            .background(Color(0xFFF8FAFC))
    ) {
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { ctx ->
                WebView(ctx).apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )

                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        useWideViewPort = true
                        loadWithOverviewMode = true
                        builtInZoomControls = false
                        displayZoomControls = false
                        cacheMode = WebSettings.LOAD_DEFAULT
                        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        userAgentString = "$userAgentString MasarikApp/$installedVersion"
                    }

                    // Handle all file/APK downloads triggered inside WebView via DownloadManager
                    setDownloadListener { url, userAgent, contentDisposition, mimeType, _ ->
                        val started = enqueueDownloadWithManager(
                            context = ctx,
                            url = url,
                            userAgent = userAgent,
                            contentDisposition = contentDisposition,
                            mimeType = mimeType
                        )
                        if (!started) {
                            openInExternalBrowser(ctx, url)
                        }
                    }

                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            val url = request?.url?.toString() ?: return false
                            val lowerUrl = url.lowercase()

                            // 1. Intercept direct APK download links or GitHub release asset links
                            val isDirectApkLink =
                                lowerUrl.endsWith(".apk") ||
                                    lowerUrl.contains(".apk?") ||
                                    lowerUrl.contains("/releases/latest/download/") ||
                                    lowerUrl.contains("/releases/download/") ||
                                    lowerUrl.contains("objects.githubusercontent.com")

                            if (isDirectApkLink) {
                                val started = enqueueDownloadWithManager(
                                    context = ctx,
                                    url = url,
                                    userAgent = view?.settings?.userAgentString,
                                    mimeType = "application/vnd.android.package-archive"
                                )
                                if (!started) {
                                    openInExternalBrowser(ctx, url)
                                }
                                return true
                            }

                            // 2. Open any other github.com links in the external browser
                            if (lowerUrl.contains("://github.com")) {
                                openInExternalBrowser(ctx, url)
                                return true
                            }

                            // 3. Handle WhatsApp intents
                            if (url.startsWith("https://wa.me/") ||
                                url.startsWith("whatsapp://") ||
                                url.contains("api.whatsapp.com")
                            ) {
                                try {
                                    ctx.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                                } catch (_: Exception) {
                                }
                                return true
                            }

                            // 4. Handle Phone Call intents
                            if (url.startsWith("tel:")) {
                                try {
                                    ctx.startActivity(Intent(Intent.ACTION_DIAL, Uri.parse(url)))
                                } catch (_: Exception) {
                                }
                                return true
                            }

                            // 5. Handle Mail intents
                            if (url.startsWith("mailto:")) {
                                try {
                                    ctx.startActivity(Intent(Intent.ACTION_SENDTO, Uri.parse(url)))
                                } catch (_: Exception) {
                                }
                                return true
                            }

                            return false
                        }

                        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                            super.onPageStarted(view, url, favicon)
                            isLoading = true
                            hasError = false
                        }

                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)
                            isLoading = false
                        }

                        override fun onReceivedError(
                            view: WebView?,
                            request: WebResourceRequest?,
                            error: WebResourceError?
                        ) {
                            super.onReceivedError(view, request, error)
                            if (request?.isForMainFrame == true) {
                                hasError = true
                                isLoading = false
                            }
                        }
                    }

                    webChromeClient = object : WebChromeClient() {
                        override fun onProgressChanged(view: WebView?, newProgress: Int) {
                            progress = newProgress / 100f
                            if (newProgress >= 100) {
                                isLoading = false
                            }
                        }
                    }

                    loadUrl(targetUrl)
                    webViewInstance = this
                }
            },
            update = { view ->
                webViewInstance = view
            }
        )

        // Slim Golden Progress Bar while loading
        AnimatedVisibility(
            visible = isLoading && progress < 1f,
            enter = fadeIn(),
            exit = fadeOut(),
            modifier = Modifier
                .fillMaxWidth()
                .align(Alignment.TopCenter)
        ) {
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(3.5.dp),
                color = Color(0xFFC6A052),
                trackColor = Color(0x330F2438)
            )
        }

        // Offline screen fallback if network is disconnected
        if (hasError) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF8FAFC))
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.masarik_logo),
                            contentDescription = "شعار مسارك للإنجاز السياحي",
                            modifier = Modifier
                                .size(72.dp)
                                .clip(CircleShape)
                                .border(2.dp, Color(0xFFC6A052), CircleShape),
                            contentScale = ContentScale.Crop
                        )

                        Text(
                            text = TravelRepository.COMPANY_NAME_AR,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Black,
                            color = Color(0xFF0F2438),
                            textAlign = TextAlign.Center
                        )

                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            modifier = Modifier
                                .background(Color(0xFFFFF4E5), RoundedCornerShape(12.dp))
                                .padding(horizontal = 12.dp, vertical = 8.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.WifiOff,
                                contentDescription = null,
                                tint = Color(0xFFD97706),
                                modifier = Modifier.size(20.dp)
                            )
                            Text(
                                text = "تعذر الاتصال، يرجى التحقق من اتصال الإنترنت",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFFB45309)
                            )
                        }

                        Button(
                            onClick = {
                                hasError = false
                                isLoading = true
                                webViewInstance?.loadUrl(targetUrl)
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0F2438)),
                            shape = RoundedCornerShape(14.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Icon(
                                imageVector = Icons.Default.Refresh,
                                contentDescription = null,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "إعادة المحاولة",
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                        }

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Button(
                                onClick = {
                                    try {
                                        context.startActivity(
                                            Intent(Intent.ACTION_VIEW, Uri.parse(TravelRepository.WHATSAPP_URL))
                                        )
                                    } catch (_: Exception) {
                                    }
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
                                shape = RoundedCornerShape(12.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(
                                    text = "واتساب مباشر",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp
                                )
                            }

                            OutlinedButton(
                                onClick = {
                                    try {
                                        context.startActivity(
                                            Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + TravelRepository.PHONE_DIAL))
                                        )
                                    } catch (_: Exception) {
                                    }
                                },
                                shape = RoundedCornerShape(12.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Phone,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp),
                                    tint = Color(0xFF0F2438)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = "اتصال هاتفياً",
                                    color = Color(0xFF0F2438),
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }
                }
            }
        }

        // Native Auto-Update Dialog when a newer GitHub Release exists
        val updateInfo = availableUpdate
        if (updateInfo != null) {
            AlertDialog(
                onDismissRequest = {
                    if (!isDownloadingUpdate) availableUpdate = null
                },
                containerColor = Color.White,
                shape = RoundedCornerShape(20.dp),
                icon = {
                    Icon(
                        imageVector = Icons.Default.SystemUpdate,
                        contentDescription = null,
                        tint = Color(0xFFC6A052),
                        modifier = Modifier.size(36.dp)
                    )
                },
                title = {
                    Text(
                        text = "يتوفر تحديث جديد للتطبيق",
                        fontWeight = FontWeight.Black,
                        fontSize = 17.sp,
                        color = Color(0xFF0F2438),
                        textAlign = TextAlign.Center
                    )
                },
                text = {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(10.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "تم إصدار نسخة جديدة (${updateInfo.latestVersion}) من تطبيق مسارك للإنجاز السياحي مقارنةً بنسختك الحالية ($installedVersion).",
                            fontSize = 13.sp,
                            color = Color(0xFF334155)
                        )
                        Text(
                            text = "ملف رسمي آمن ومفحوص 100% وخالٍ من أي برمجيات ضارة.",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F2438)
                        )

                        if (isDownloadingUpdate) {
                            Spacer(modifier = Modifier.height(4.dp))
                            LinearProgressIndicator(
                                progress = { downloadProgress },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(6.dp)
                                    .clip(RoundedCornerShape(4.dp)),
                                color = Color(0xFFC6A052),
                                trackColor = Color(0xFFE2E8F0)
                            )
                            Text(
                                text = "جاري تحميل التحديث... ${(downloadProgress * 100).toInt()}%",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF0284C7)
                            )
                        }

                        if (updateErrorMsg != null) {
                            Text(
                                text = updateErrorMsg ?: "",
                                fontSize = 12.sp,
                                color = Color(0xFFDC2626)
                            )
                        }
                    }
                },
                confirmButton = {
                    Button(
                        enabled = !isDownloadingUpdate,
                        onClick = {
                            updateErrorMsg = null
                            isDownloadingUpdate = true
                            downloadProgress = 0f
                            coroutineScope.launch {
                                val apkFile = downloadAndInstallApk(
                                    context = context,
                                    apkUrl = updateInfo.downloadUrl,
                                    onProgress = { pct -> downloadProgress = pct }
                                )
                                isDownloadingUpdate = false
                                if (apkFile != null) {
                                    availableUpdate = null
                                    installApkFile(context, apkFile)
                                } else {
                                    availableUpdate = null
                                    val started = enqueueDownloadWithManager(
                                        context = context,
                                        url = updateInfo.downloadUrl,
                                        mimeType = "application/vnd.android.package-archive"
                                    )
                                    if (!started) {
                                        openInExternalBrowser(context, updateInfo.downloadUrl)
                                    }
                                }
                            }
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF0F2438),
                            contentColor = Color(0xFFE5C887)
                        ),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = if (isDownloadingUpdate) "جاري التحميل..." else "تحديث الآن",
                            fontWeight = FontWeight.Bold
                        )
                    }
                },
                dismissButton = {
                    if (!isDownloadingUpdate) {
                        TextButton(onClick = { availableUpdate = null }) {
                            Text(
                                text = "لاحقاً",
                                color = Color(0xFF64748B),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            )
        }
    }
}
