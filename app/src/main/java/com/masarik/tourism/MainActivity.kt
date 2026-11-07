package com.masarik.tourism

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.masarik.tourism.data.TravelRepository
import com.masarik.tourism.ui.screens.*
import com.masarik.tourism.ui.theme.*
import com.masarik.tourism.util.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MasarikTourismTheme {
                MainAppScaffold()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppScaffold() {
    val context = LocalContext.current
    var currentTab by remember { mutableStateOf(0) }
    var selectedServiceForContact by remember { mutableStateOf<String?>(null) }

    // Handle back button on secondary tabs
    BackHandler(enabled = currentTab != 0) {
        currentTab = 0
    }

    val tabs = listOf(
        Triple("الرئيسية", Icons.Default.Home, 0),
        Triple("الخدمات", Icons.Default.Work, 1),
        Triple("طرق الدفع", Icons.Default.Payment, 2),
        Triple("اتصل بنا", Icons.Default.ContactPhone, 3)
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.masarik_logo),
                            contentDescription = "شعار مسارك للإنجاز السياحي",
                            modifier = Modifier
                                .size(44.dp)
                                .clip(CircleShape)
                                .border(1.5.dp, GoldPrimary, CircleShape),
                            contentScale = ContentScale.Crop
                        )
                        Column {
                            Text(
                                text = TravelRepository.COMPANY_NAME_AR,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Black,
                                color = NavyPrimary
                            )
                            Text(
                                text = TravelRepository.COMPANY_NAME_EN,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = TealPrimary
                            )
                        }
                    }
                },
                actions = {
                    IconButton(
                        onClick = {
                            dialPhoneNumber(context, TravelRepository.PHONE_DIAL)
                        }
                    ) {
                        Icon(
                            imageVector = Icons.Default.Phone,
                            contentDescription = "اتصل الآن",
                            tint = NavyPrimary
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = CreamLight,
                    titleContentColor = NavyPrimary,
                    actionIconContentColor = NavyPrimary
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = SurfaceWhite,
                tonalElevation = 4.dp
            ) {
                tabs.forEach { (label, icon, index) ->
                    val isSelected = currentTab == index
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { currentTab = index },
                        icon = {
                            Icon(
                                imageVector = icon,
                                contentDescription = label,
                                tint = if (isSelected) NavyPrimary else TextMuted
                            )
                        },
                        label = {
                            Text(
                                text = label,
                                fontSize = 11.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                color = if (isSelected) NavyPrimary else TextMuted
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            indicatorColor = TealSoft
                        )
                    )
                }
            }
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = {
                    openWhatsApp(context, TravelRepository.WHATSAPP_URL)
                },
                containerColor = WhatsAppGreen,
                contentColor = SurfaceWhite,
                shape = CircleShape
            ) {
                Icon(
                    imageVector = Icons.Default.Chat,
                    contentDescription = "تواصل عبر واتساب",
                    modifier = Modifier.size(28.dp)
                )
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentTab) {
                0 -> HomeScreen(
                    onNavigateToServices = { currentTab = 1 },
                    onNavigateToContact = { serviceName ->
                        selectedServiceForContact = serviceName
                        currentTab = 3
                    }
                )
                1 -> ServicesScreen(
                    onNavigateToContact = { serviceName ->
                        selectedServiceForContact = serviceName
                        currentTab = 3
                    }
                )
                2 -> PaymentScreen(
                    onNavigateToContact = { currentTab = 3 }
                )
                3 -> ContactScreen(
                    initialService = selectedServiceForContact
                )
            }
        }
    }
}
