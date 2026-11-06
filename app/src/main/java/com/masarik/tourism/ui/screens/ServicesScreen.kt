package com.masarik.tourism.ui.screens

import android.content.Context
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.masarik.tourism.data.TravelRepository
import com.masarik.tourism.ui.theme.*
import com.masarik.tourism.util.*

@Composable
fun ServicesScreen(
    onNavigateToContact: (String?) -> Unit
) {
    val context = LocalContext.current
    var selectedCategory by remember { mutableStateOf("all") }

    val filteredServices = if (selectedCategory == "all") {
        TravelRepository.services
    } else {
        TravelRepository.services.filter { it.categoryId == selectedCategory }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundSlate),
        contentPadding = PaddingValues(top = 16.dp, bottom = 80.dp)
    ) {
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                Text(
                    text = "دليل الخدمات والتأشيرات",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Black,
                    color = NavyDark
                )
                Text(
                    text = "اختر الخدمة المطلوبة لإنجاز معاملاتك بأسرع وقت وأعلى دقة",
                    fontSize = 12.sp,
                    color = TextMedium
                )
                Spacer(modifier = Modifier.height(10.dp))
            }
        }

        // Category Filter Chips
        item {
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(bottom = 14.dp)
            ) {
                items(TravelRepository.categories) { category ->
                    val isSelected = selectedCategory == category.id
                    FilterChip(
                        selected = isSelected,
                        onClick = { selectedCategory = category.id },
                        label = {
                            Text(
                                text = category.titleAr,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                fontSize = 12.sp
                            )
                        },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = NavyPrimary,
                            selectedLabelColor = SurfaceWhite,
                            containerColor = SurfaceWhite,
                            labelColor = TextDark
                        ),
                        border = FilterChipDefaults.filterChipBorder(
                            enabled = true,
                            selected = isSelected,
                            borderColor = CardBorder,
                            selectedBorderColor = NavyPrimary
                        )
                    )
                }
            }
        }

        // Services list
        items(filteredServices) { service ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder.copy(alpha = 0.6f))
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
                        service.badge?.let { b ->
                            Surface(
                                color = CreamParchment,
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Text(
                                    text = b,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = GoldDark,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    service.features.forEach { item ->
                        Row(modifier = Modifier.padding(vertical = 3.dp)) {
                            Text(text = "✓", color = GoldPrimary, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(text = item, fontSize = 12.sp, color = TextMedium)
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = { onNavigateToContact(service.title) },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = NavyPrimary),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(text = "حجز الخدمة ومراسلتنا", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }

                        Button(
                            onClick = {
                                val url = "${TravelRepository.WHATSAPP_URL}?text=السلام%20عليكم،%20أستفسر%20عن%20خدمة:%20${Uri.encode(service.title)}"
                                openWhatsApp(context, url)
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(text = "واتساب", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = SurfaceWhite)
                        }
                    }
                }
            }
        }
    }
}
