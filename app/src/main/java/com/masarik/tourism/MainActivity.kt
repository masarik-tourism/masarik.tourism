package com.masarik.tourism

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
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
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.masarik.tourism.R
import com.masarik.tourism.data.TravelRepository
import com.masarik.tourism.ui.theme.MasarikTourismTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MasarikTourismTheme {
                val finalUrl = if (TravelRepository.WEB_URL.contains("?")) "${TravelRepository.WEB_URL}&app=1" else "${TravelRepository.WEB_URL}?app=1"
                MainWebViewScreen(
                    targetUrl = finalUrl,
                    onFinishActivity = { finish() }
                )
            }
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun MainWebViewScreen(
    targetUrl: String,
    onFinishActivity: () -> Unit
) {
    val context = LocalContext.current
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var isLoading by remember { mutableStateOf(true) }
    var progress by remember { mutableFloatStateOf(0f) }
    var hasError by remember { mutableStateOf(false) }

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
            .background(Color(0xFFFAF9F6))
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
                        userAgentString = "${userAgentString} MasarikApp/1.1"
                    }

                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            val url = request?.url?.toString() ?: return false

                            // Handle WhatsApp intents
                            if (url.startsWith("https://wa.me/") || url.startsWith("whatsapp://") || url.contains("api.whatsapp.com")) {
                                try {
                                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                    ctx.startActivity(intent)
                                } catch (_: Exception) {}
                                return true
                            }

                            // Handle Phone Call intents
                            if (url.startsWith("tel:")) {
                                try {
                                    val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                                    ctx.startActivity(intent)
                                } catch (_: Exception) {}
                                return true
                            }

                            // Handle Mail intents
                            if (url.startsWith("mailto:")) {
                                try {
                                    val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(url))
                                    ctx.startActivity(intent)
                                } catch (_: Exception) {}
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
                progress = progress,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(3.5.dp),
                color = Color(0xFFC6A052),
                trackColor = Color(0x3317344F)
            )
        }

        // Offline screen fallback if network is disconnected
        if (hasError) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFFAF9F6))
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
                            contentDescription = "شعار مسارك",
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
                            color = Color(0xFF0F2437),
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
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF17344F)),
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
                                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(TravelRepository.WHATSAPP_URL))
                                        context.startActivity(intent)
                                    } catch (_: Exception) {}
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
                                        val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + TravelRepository.PHONE_DIAL))
                                        context.startActivity(intent)
                                    } catch (_: Exception) {}
                                },
                                shape = RoundedCornerShape(12.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Phone,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp),
                                    tint = Color(0xFF17344F)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = "اتصال هاتفياً",
                                    color = Color(0xFF17344F),
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
