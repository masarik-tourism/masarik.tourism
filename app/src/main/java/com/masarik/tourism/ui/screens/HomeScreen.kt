package com.masarik.tourism.ui.screens

import android.content.Context
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.masarik.tourism.R
import com.masarik.tourism.data.TravelRepository
import com.masarik.tourism.ui.theme.*
import com.masarik.tourism.util.*

@Composable
fun HomeScreen(
    onNavigateToServices: () -> Unit,
    onNavigateToContact: (String?) -> Unit
) {
    val context = LocalContext.current

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundSlate),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        // Bright & Luminous Hero Section
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(320.dp)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.masarik_hero_bg),
                    contentDescription = null,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop,
                    alpha = 0.25f
                )

                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(
                                    CreamLight.copy(alpha = 0.88f),
                                    CreamParchment.copy(alpha = 0.94f)
                                )
                            )
                        )
                )

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.masarik_logo),
                        contentDescription = "شعار مسارك للإنجاز السياحي",
                        modifier = Modifier
                            .size(88.dp)
                            .clip(CircleShape)
                            .border(3.dp, GoldPrimary, CircleShape),
                        contentScale = ContentScale.Crop
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = TravelRepository.COMPANY_NAME_AR,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Black,
                        color = NavyDark,
                        textAlign = TextAlign.Center
                    )

                    Text(
                        text = TravelRepository.COMPANY_NAME_EN,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = TealPrimary
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = TravelRepository.TAGLINE,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextMedium,
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Row(
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Button(
                            onClick = {
                                openWhatsApp(context, TravelRepository.WHATSAPP_URL)
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen),
                            shape = RoundedCornerShape(25.dp),
                            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Chat,
                                contentDescription = null,
                                tint = SurfaceWhite,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "واتساب (${TravelRepository.PHONE_NUMBER})",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = SurfaceWhite
                            )
                        }

                        Button(
                            onClick = {
                                dialPhoneNumber(context, TravelRepository.PHONE_DIAL)
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = NavyPrimary),
                            shape = RoundedCornerShape(25.dp),
                            contentPadding = PaddingValues(horizontal = 14.dp, vertical = 8.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Phone,
                                contentDescription = null,
                                tint = SurfaceWhite,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = TravelRepository.PHONE_NUMBER,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = SurfaceWhite
                            )
                        }
                    }
                }
            }
        }

        // Official Certification & Commercial Registration Banner
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 10.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = GoldSoft),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, GoldLight)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(CircleShape)
                            .background(GoldPrimary.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Verified,
                            contentDescription = null,
                            tint = GoldDark,
                            modifier = Modifier.size(28.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = TravelRepository.CERTIFICATION_TITLE,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Black,
                            color = GoldDark
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = TravelRepository.COMMERCIAL_RECORD_STATEMENT,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )
                    }
                }
            }
        }

        // Feature Badges Horizontal Scroll
        item {
            Text(
                text = "أبرز المعاملات والخدمات المعتمدة",
                fontSize = 17.sp,
                fontWeight = FontWeight.Black,
                color = NavyDark,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
            )

            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(TravelRepository.featureBadges) { badge ->
                    Card(
                        modifier = Modifier.width(165.dp),
                        shape = RoundedCornerShape(10.dp),
                        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp)
                        ) {
                            Text(
                                text = badge.title,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = NavyPrimary
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = badge.subtitle,
                                fontSize = 11.sp,
                                color = TextMuted,
                                lineHeight = 15.sp
                            )
                        }
                    }
                }
            }
        }

        // Services Highlights Header
        item {
            Spacer(modifier = Modifier.height(18.dp))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "باقات وخدمات التأشيرات",
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Black,
                    color = NavyDark
                )
                TextButton(onClick = onNavigateToServices) {
                    Text(text = "عرض الكل", color = TealPrimary, fontWeight = FontWeight.Bold)
                }
            }
        }

        // Top 3 Services in Light Theme Cards
        items(TravelRepository.services.take(3)) { service ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = service.title,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyPrimary,
                            modifier = Modifier.weight(1f)
                        )
                        service.badge?.let { badgeText ->
                            Surface(
                                color = TealSoft,
                                shape = RoundedCornerShape(16.dp),
                                border = androidx.compose.foundation.BorderStroke(1.dp, TealLight.copy(alpha = 0.3f))
                            ) {
                                Text(
                                    text = badgeText,
                                    color = TealPrimary,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    service.features.forEach { feat ->
                        Row(modifier = Modifier.padding(vertical = 2.dp)) {
                            Text(text = "✓", color = GoldDark, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(text = feat, fontSize = 12.sp, color = TextMedium)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = { onNavigateToContact(service.title) },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = NavyPrimary),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(text = "طلب إنجاز المعاملة", fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // About Us Section with Commercial Record 7839
        item {
            Spacer(modifier = Modifier.height(16.dp))
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = CreamLight),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, GoldLight)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Security,
                            contentDescription = null,
                            tint = GoldDark,
                            modifier = Modifier.size(22.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "عن ${TravelRepository.COMPANY_NAME_AR}",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black,
                            color = NavyDark
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = "وكالة سفر وتأشيرات معتمدة وموثقة برقم سجل تجاري (${TravelRepository.COMMERCIAL_RECORD}) صادرة من الغرفة التجارية المصرية. متخصصة في تأشيرات السعودية (زيارة • عمل • عمرة B2C • سياحة)، حجز مواعيد البصمة تساهيل VFS، تسديد منصة إنجاز، والكشف الطبي جامكا GAMCA، وحجز الطيران والفنادق بأعلى معايير المصداقية والجودة.",
                        fontSize = 13.sp,
                        color = TextMedium,
                        lineHeight = 20.sp
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Surface(
                        color = SurfaceWhite,
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text(
                                text = "• رقم السجل التجاري: ${TravelRepository.COMMERCIAL_RECORD}",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = NavyPrimary
                            )
                            Text(
                                text = "• البريد الرسمي لاستقبال الطلبات: ${TravelRepository.OFFICIAL_EMAIL}",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = TealPrimary
                            )
                            Text(
                                text = "• فروعنا: محافظة القاهرة • محافظة الدقهلية",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = TextDark
                            )
                            Text(
                                text = "• ساعات العمل: ${TravelRepository.WORKING_HOURS}",
                                fontSize = 11.sp,
                                color = TextMuted
                            )
                        }
                    }
                }
            }
        }

        // Reviews
        item {
            Spacer(modifier = Modifier.height(18.dp))
            Text(
                text = "آراء العملاء",
                fontSize = 17.sp,
                fontWeight = FontWeight.Black,
                color = NavyDark,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
            )
        }

        items(TravelRepository.reviews) { review ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 5.dp),
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder.copy(alpha = 0.6f))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = review.author,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = NavyDark
                        )
                        Text(
                            text = "★★★★★",
                            color = GoldPrimary,
                            fontSize = 12.sp
                        )
                    }
                    Text(
                        text = "${review.tripType} (${review.year})",
                        fontSize = 11.sp,
                        color = TextMuted
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "\"${review.comment}\"",
                        fontSize = 12.sp,
                        color = TextMedium,
                        lineHeight = 17.sp
                    )
                }
            }
        }
    }
}
