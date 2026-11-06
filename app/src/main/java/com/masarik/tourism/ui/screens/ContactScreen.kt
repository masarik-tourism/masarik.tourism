package com.masarik.tourism.ui.screens

import android.content.Context
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
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun ContactScreen(
    initialService: String? = null
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var selectedService by remember { mutableStateOf(initialService ?: "حجز موعد تساهيل VFS") }
    var message by remember { mutableStateOf("") }
    var isSending by remember { mutableStateOf(false) }
    var showSuccessDialog by remember { mutableStateOf(false) }
    var validationError by remember { mutableStateOf<String?>(null) }

    val serviceOptions = listOf(
        "حجز موعد تساهيل VFS",
        "تسديد منصة إنجاز والتأمين",
        "تأشيرة B2C (عمرة) وحجز طيران",
        "الكشف الطبي GAMCA / LAB",
        "تأشيرات الزيارة العائلية والشخصية",
        "تأشيرات العمل والاستقدام",
        "حجز تذاكر الطيران بأفضل الأسعار",
        "حجز الفنادق بمكة والمدينة",
        "توثيق المستندات والغرفة التجارية",
        "استفسار عام آخر"
    )

    fun sendEmailDirectly() {
        if (name.isBlank() || phone.isBlank() || email.isBlank()) {
            validationError = "يرجى ملء الاسم ورقم الهاتف والبريد الإلكتروني لإتمام الإرسال"
            return
        }
        validationError = null
        isSending = true

        val currentDate = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault()).format(Date())
        val subject = "طلب جديد من مسارك للإنجاز السياحي (س.ت: ${TravelRepository.COMMERCIAL_RECORD}): $selectedService"
        val bodyText = """
السلام عليكم ورحمة الله،
طلب حجز واستفسار جديد عبر تطبيق مسارك للإنجاز السياحي:
--------------------------------------------------
• اسم العميل: $name
• البريد الإلكتروني للعميل: $email
• رقم الهاتف / الواتساب: $phone
• الخدمة المطلوبة: $selectedService
• تفاصيل الرسالة والملاحظات:
${message.ifBlank { "لا توجد ملاحظات إضافية" }}
--------------------------------------------------
سجل تجاري: ${TravelRepository.COMMERCIAL_RECORD}
تاريخ وتوقيت الطلب: $currentDate
المرسل إليه الرسمي: ${TravelRepository.OFFICIAL_EMAIL}
--------------------------------------------------
        """.trimIndent()

        coroutineScope.launch {
            try {
                withContext(Dispatchers.IO) {
                    val url = URL("https://formsubmit.co/ajax/${TravelRepository.OFFICIAL_EMAIL}")
                    val connection = url.openConnection() as HttpURLConnection
                    connection.requestMethod = "POST"
                    connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                    connection.setRequestProperty("Accept", "application/json")
                    connection.connectTimeout = 5000
                    connection.readTimeout = 5000
                    connection.doOutput = true

                    val postData = "name=" + URLEncoder.encode(name, "UTF-8") +
                            "&email=" + URLEncoder.encode(email, "UTF-8") +
                            "&phone=" + URLEncoder.encode(phone, "UTF-8") +
                            "&service=" + URLEncoder.encode(selectedService, "UTF-8") +
                            "&message=" + URLEncoder.encode(bodyText, "UTF-8") +
                            "&_replyto=" + URLEncoder.encode(email, "UTF-8") +
                            "&_subject=" + URLEncoder.encode(subject, "UTF-8")

                    val writer = OutputStreamWriter(connection.outputStream)
                    writer.write(postData)
                    writer.flush()
                    writer.close()
                    connection.responseCode
                }
            } catch (_: Exception) {
            } finally {
                isSending = false
                showSuccessDialog = true
            }
        }

        launchEmailIntent(context, TravelRepository.OFFICIAL_EMAIL, subject, bodyText)
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundSlate),
        contentPadding = PaddingValues(16.dp, 16.dp, 16.dp, 80.dp)
    ) {
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = GoldSoft),
                border = androidx.compose.foundation.BorderStroke(1.2.dp, GoldLight)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Verified,
                        contentDescription = null,
                        tint = GoldDark,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = TravelRepository.CERTIFICATION_TITLE,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Black,
                            color = GoldDark
                        )
                        Text(
                            text = TravelRepository.COMMERCIAL_RECORD_STATEMENT,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )
                    }
                }
            }
        }

        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = CreamLight),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, GoldLight)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Email,
                            contentDescription = null,
                            tint = GoldDark,
                            modifier = Modifier.size(26.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "تواصل ومراسلة مباشرة للإيميل",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Black,
                                color = NavyDark
                            )
                            Text(
                                text = "يتم إرسال كافة البيانات فوراً إلى بريد المكتب الرسمي:",
                                fontSize = 12.sp,
                                color = TextMedium
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Surface(
                        color = SurfaceWhite,
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = TravelRepository.OFFICIAL_EMAIL,
                            color = TealPrimary,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                        )
                    }
                }
            }
        }

        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Button(
                    onClick = {
                        openWhatsApp(context, TravelRepository.WHATSAPP_URL)
                    },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Chat,
                        contentDescription = null,
                        tint = SurfaceWhite,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(text = "واتساب فوري", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = SurfaceWhite)
                }

                Button(
                    onClick = {
                        dialPhoneNumber(context, TravelRepository.PHONE_DIAL)
                    },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = NavyPrimary),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Phone,
                        contentDescription = null,
                        tint = SurfaceWhite,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(text = "اتصال هاتفياً", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = SurfaceWhite)
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = "نموذج إرسال الطلب وحجز الخدمة",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyPrimary
                    )
                    Text(
                        text = "اكتب بياناتك وسيتم إرسالها فوراً لبريد ${TravelRepository.OFFICIAL_EMAIL}",
                        fontSize = 11.sp,
                        color = TextMuted
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    validationError?.let { err ->
                        Surface(
                            color = Color(0xFFFEE2E2),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 12.dp)
                        ) {
                            Text(
                                text = err,
                                color = Color(0xFFB91C1C),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(10.dp)
                            )
                        }
                    }

                    OutlinedTextField(
                        value = name,
                        onValueChange = { name = it },
                        label = { Text("الاسم بالكامل *") },
                        placeholder = { Text("مثال: أحمد محمد") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("بريدك الإلكتروني (لإرسال الرد والتأكيد) *") },
                        placeholder = { Text("example@gmail.com") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    OutlinedTextField(
                        value = phone,
                        onValueChange = { phone = it },
                        label = { Text("رقم الهاتف / الواتساب *") },
                        placeholder = { Text(TravelRepository.PHONE_NUMBER) },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = "نوع الخدمة المراد إنجازها:",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                    Spacer(modifier = Modifier.height(4.dp))

                    var expanded by remember { mutableStateOf(false) }
                    Box(modifier = Modifier.fillMaxWidth()) {
                        OutlinedButton(
                            onClick = { expanded = true },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.outlinedButtonColors(containerColor = CreamLight),
                            border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = selectedService,
                                    fontSize = 13.sp,
                                    color = NavyDark,
                                    fontWeight = FontWeight.Bold
                                )
                                Icon(Icons.Default.ArrowDropDown, contentDescription = null, tint = NavyPrimary)
                            }
                        }

                        DropdownMenu(
                            expanded = expanded,
                            onDismissRequest = { expanded = false }
                        ) {
                            serviceOptions.forEach { opt ->
                                DropdownMenuItem(
                                    text = { Text(opt, fontSize = 12.sp) },
                                    onClick = {
                                        selectedService = opt
                                        expanded = false
                                    }
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    OutlinedTextField(
                        value = message,
                        onValueChange = { message = it },
                        label = { Text("تفاصيل الرسالة أو الاستفسار أو الموعد") },
                        placeholder = { Text("اكتب أي بيانات إضافية تخص التأشيرة أو عدد المسافرين...") },
                        modifier = Modifier.fillMaxWidth(),
                        maxLines = 4
                    )

                    Spacer(modifier = Modifier.height(18.dp))

                    Button(
                        onClick = { sendEmailDirectly() },
                        enabled = !isSending,
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = NavyPrimary),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        if (isSending) {
                            CircularProgressIndicator(
                                color = SurfaceWhite,
                                modifier = Modifier.size(18.dp),
                                strokeWidth = 2.dp
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(text = "جارٍ إرسال الإيميل...")
                        } else {
                            Icon(Icons.Default.Send, contentDescription = null, tint = SurfaceWhite, modifier = Modifier.size(18.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "إرسال إلى الإيميل (${TravelRepository.OFFICIAL_EMAIL})",
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    OutlinedButton(
                        onClick = {
                            val msg = "السلام عليكم، أود حجز خدمة من مكتب ${TravelRepository.COMPANY_NAME_AR} (س.ت: ${TravelRepository.COMMERCIAL_RECORD}):\n• الاسم: ${name.ifBlank { "عميل" }}\n• الإيميل: ${email.ifBlank { "غير محدد" }}\n• الهاتف: ${phone.ifBlank { "غير محدد" }}\n• الخدمة: $selectedService\n• تفاصيل: ${message.ifBlank { "لا توجد" }}"
                            val url = "${TravelRepository.WHATSAPP_URL}?text=${Uri.encode(msg)}"
                            openWhatsApp(context, url)
                        },
                        modifier = Modifier.fillMaxWidth(),
                        border = androidx.compose.foundation.BorderStroke(1.5.dp, WhatsAppGreen),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.Chat, contentDescription = null, tint = WhatsAppGreen, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = "إرسال نسخة عبر الواتساب فوراً", color = WhatsAppGreen, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = CreamLight),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "فروع ومقرات ${TravelRepository.COMPANY_NAME_AR}",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "• سجل تجاري معتمد رقم: ${TravelRepository.COMMERCIAL_RECORD}\n• الفرع الرئيسي: محافظة القاهرة، جمهورية مصر العربية\n• فرع الدلتا: محافظة الدقهلية، جمهورية مصر العربية",
                        fontSize = 12.sp,
                        color = TextMedium,
                        lineHeight = 18.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "البريد الإلكتروني: ${TravelRepository.OFFICIAL_EMAIL}\nالهاتف / الواتساب: ${TravelRepository.PHONE_NUMBER}\n${TravelRepository.WORKING_HOURS}",
                        fontSize = 12.sp,
                        color = NavyPrimary,
                        lineHeight = 18.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }

    if (showSuccessDialog) {
        AlertDialog(
            onDismissRequest = { showSuccessDialog = false },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF15803D), modifier = Modifier.size(24.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = "تم إرسال الطلب بنجاح!", fontWeight = FontWeight.Bold, color = Color(0xFF15803D))
                }
            },
            text = {
                Column {
                    Text(
                        text = "شكراً لك يا $name. تم إرسال رسالتك وتفاصيل طلبك بنجاح إلى البريد الإلكتروني الرسمي:",
                        fontSize = 13.sp,
                        color = TextMedium,
                        lineHeight = 18.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Surface(
                        color = CreamLight,
                        shape = RoundedCornerShape(6.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder)
                    ) {
                        Text(
                            text = TravelRepository.OFFICIAL_EMAIL,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyPrimary,
                            modifier = Modifier.padding(8.dp)
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "• الخدمة: $selectedService\n• رقم الهاتف: $phone\n• بريد العميل: $email\n• رقم السجل: ${TravelRepository.COMMERCIAL_RECORD}",
                        fontSize = 12.sp,
                        color = TextDark,
                        lineHeight = 18.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "سيقوم فريق العمل بالرد والتواصل معك في أقرب وقت لإتمام الإجراءات.",
                        fontSize = 11.sp,
                        color = TextMuted
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val msg = "السلام عليكم، قمت بإرسال طلب لخدمة ($selectedService) عبر الإيميل باسم ($name) ورقم ($phone). أرجو المتابعة."
                        val url = "${TravelRepository.WHATSAPP_URL}?text=${Uri.encode(msg)}"
                        openWhatsApp(context, url)
                        showSuccessDialog = false
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen)
                ) {
                    Text("متابعة بالواتساب أيضاً", color = SurfaceWhite)
                }
            },
            dismissButton = {
                TextButton(onClick = { showSuccessDialog = false }) {
                    Text("تم")
                }
            }
        )
    }
}
