package com.masarik.tourism.ui.screens

import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.masarik.tourism.data.TravelRepository
import com.masarik.tourism.ui.theme.*
import com.masarik.tourism.util.*

@Composable
fun PaymentScreen(
    onNavigateToContact: () -> Unit
) {
    val context = LocalContext.current
    var showPaymobDialog by remember { mutableStateOf(false) }
    var payAmount by remember { mutableStateOf("1500") }
    var paySuccess by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundSlate),
        contentPadding = PaddingValues(16.dp, 16.dp, 16.dp, 80.dp)
    ) {
        item {
            Text(
                text = "طرق السداد الآمنة",
                fontSize = 20.sp,
                fontWeight = FontWeight.Black,
                color = NavyDark
            )
            Text(
                text = "نوفر لك خيارات دفع متعددة وموثقة لضمان سرعة إنجاز معاملتك",
                fontSize = 12.sp,
                color = TextMedium
            )
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Method 1: Electronic Paymob
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder.copy(alpha = 0.6f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.CreditCard,
                            contentDescription = null,
                            tint = TealPrimary,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "الدفع الإلكتروني (Paymob)",
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold,
                                color = NavyPrimary
                            )
                            Text(
                                text = "بطاقات فيزا / ماستركارد ومحافظ كاش وإنستاباي",
                                fontSize = 11.sp,
                                color = TextMuted
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = "سداد فوري مشفر وموثق لرسوم منصة إنجاز، مواعيد تساهيل، وتذاكر الطيران مع استلام إيصال إلكتروني فوري.",
                        fontSize = 12.sp,
                        color = TextMedium,
                        lineHeight = 17.sp
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = { showPaymobDialog = true },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = TealPrimary),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Lock,
                            contentDescription = null,
                            tint = SurfaceWhite,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(text = "سداد عبر بوابة Paymob الآن", fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // Method 2: Bank transfer & WhatsApp
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder.copy(alpha = 0.6f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Chat,
                            contentDescription = null,
                            tint = WhatsAppDark,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "التحويل البنكي وإنستاباي",
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold,
                                color = NavyPrimary
                            )
                            Text(
                                text = "واتساب: ${TravelRepository.PHONE_NUMBER}",
                                fontSize = 11.sp,
                                color = TextMuted
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = "تواصل عبر الواتساب للحصول على الحساب البنكي (البنك الأهلي / بنك مصر) أو حساب إنستاباي وإرسال إشعار التحويل لتأكيد الحجز فوراً.",
                        fontSize = 12.sp,
                        color = TextMedium,
                        lineHeight = 17.sp
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = {
                            val text = "السلام عليكم، أود الحصول على بيانات التحويل البنكي وإنستاباي لسداد المعاملة."
                            val url = "${TravelRepository.WHATSAPP_URL}?text=${Uri.encode(text)}"
                            openWhatsApp(context, url)
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = "طلب بيانات التحويل عبر واتساب",
                            fontWeight = FontWeight.Bold,
                            color = SurfaceWhite
                        )
                    }
                }
            }
        }

        // Method 3: Cash at Branches
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder.copy(alpha = 0.6f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Storefront,
                            contentDescription = null,
                            tint = GoldDark,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "السداد نقداً في الفروع",
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold,
                                color = NavyPrimary
                            )
                            Text(
                                text = "القاهرة • الدقهلية",
                                fontSize = 11.sp,
                                color = TextMuted
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = "تشريفنا في أحد مقراتنا الرسمية واستلام إيصال وعقد موثق ومعتمد بجميع المعاملات وباقات السفر.",
                        fontSize = 12.sp,
                        color = TextMedium,
                        lineHeight = 17.sp
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    OutlinedButton(
                        onClick = onNavigateToContact,
                        modifier = Modifier.fillMaxWidth(),
                        border = androidx.compose.foundation.BorderStroke(1.5.dp, NavyPrimary),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(text = "عرض عناوين ومواقع الفروع", color = NavyPrimary, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // Policy
        item {
            Spacer(modifier = Modifier.height(12.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = CreamParchment),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Info,
                            contentDescription = null,
                            tint = NavyPrimary,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "سياسة السداد والضمان",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "• جميع الرسوم موثقة بفواتير رسمية.\n• البريد الرسمي للمتابعة المالية: ${TravelRepository.OFFICIAL_EMAIL}\n• للاستفسارات المالية: ${TravelRepository.PHONE_NUMBER}",
                        fontSize = 11.sp,
                        color = TextMedium,
                        lineHeight = 16.sp
                    )
                }
            }
        }
    }

    // Paymob Simulation Dialog
    if (showPaymobDialog) {
        AlertDialog(
            onDismissRequest = {
                showPaymobDialog = false
                paySuccess = false
            },
            title = {
                Text(
                    text = if (!paySuccess) "سداد المعاملة عبر Paymob" else "تم السداد بنجاح!",
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )
            },
            text = {
                if (!paySuccess) {
                    Column {
                        Text(
                            text = "المبلغ المراد سداده (ج.م):",
                            fontSize = 13.sp,
                            color = TextMedium
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        OutlinedTextField(
                            value = payAmount,
                            onValueChange = { payAmount = it },
                            modifier = Modifier.fillMaxWidth(),
                            singleLine = true
                        )
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = "اختر وسيلة الدفع:",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyPrimary
                        )
                        Text(
                            text = "• فيزا / ماستركارد\n• فودافون كاش ومحافظ المحمول\n• إنستاباي وميزة",
                            fontSize = 11.sp,
                            color = TextMuted
                        )
                    }
                } else {
                    Column {
                        Text(
                            text = "تمت عملية السداد بمبلغ $payAmount ج.م بنجاح.",
                            fontSize = 13.sp,
                            color = Color(0xFF15803D),
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "رقم المعاملة: MS-${(100000..999999).random()}",
                            fontSize = 12.sp,
                            color = TextMedium
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "تم توجيه نسخة من الإيصال إلى: ${TravelRepository.OFFICIAL_EMAIL}",
                            fontSize = 11.sp,
                            color = TealPrimary,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "يرجى إرسال تفاصيل الإيصال عبر الواتساب (${TravelRepository.PHONE_NUMBER}) للمتابعة الفورية.",
                            fontSize = 11.sp,
                            color = TextMuted
                        )
                    }
                }
            },
            confirmButton = {
                if (!paySuccess) {
                    Button(
                        onClick = { paySuccess = true },
                        colors = ButtonDefaults.buttonColors(containerColor = TealPrimary)
                    ) {
                        Text("تأكيد السداد")
                    }
                } else {
                    Button(
                        onClick = {
                            val msg = "السلام عليكم، قمت بسداد مبلغ $payAmount ج.م عبر Paymob. برجاء تأكيد المعاملة."
                            openWhatsApp(context, "${TravelRepository.WHATSAPP_URL}?text=${Uri.encode(msg)}")
                            showPaymobDialog = false
                            paySuccess = false
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen)
                    ) {
                        Text("إرسال للواتساب", color = SurfaceWhite)
                    }
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    showPaymobDialog = false
                    paySuccess = false
                }) {
                    Text("إغلاق")
                }
            }
        )
    }
}
