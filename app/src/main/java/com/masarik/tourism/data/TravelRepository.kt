package com.masarik.tourism.data

import com.masarik.tourism.model.ClientReview
import com.masarik.tourism.model.FeatureBadge
import com.masarik.tourism.model.ServiceCategory
import com.masarik.tourism.model.TravelService

object TravelRepository {
    const val COMPANY_NAME_AR = "مسارك للإنجاز السياحي"
    const val COMPANY_NAME_EN = "MASARIK TOURISM"
    const val TAGLINE = "خدمات التأشيرات والسفر – إنجاز معاملاتك بسرعة واحترافية"
    const val PHONE_NUMBER = "01128440008"
    const val PHONE_DIAL = "+201128440008"
    const val WHATSAPP_URL = "https://wa.me/201128440008"
    const val OFFICIAL_EMAIL = "sabeeluk.lilssafar@gmail.com"
    const val COMMERCIAL_RECORD = "٧٨٣٩"
    const val COMMERCIAL_RECORD_AR = "٧٨٣٩"
    const val CERTIFICATION_TITLE = "معتمدة وموثقة من الغرفة التجارية المصرية"
    const val COMMERCIAL_RECORD_STATEMENT = "تحمل السجل التجاري رقم ٧٨٣٩"
    const val CERTIFICATION = "معتمدة وموثقة من الغرفة التجارية المصرية\nتحمل السجل التجاري رقم ٧٨٣٩"
    const val WORKING_HOURS = "خدمة عملاء متاحة 24 ساعة طوال أيام الأسبوع"

    val featureBadges = listOf(
        FeatureBadge("حجز مواعيد تساهيل", "VFS Tasheer المباشرة"),
        FeatureBadge("تسديد منصة إنجاز", "الرسوم والتأمين الطبي"),
        FeatureBadge("تأشيرة B2C عمرة", "حجز سكن وطيران وباركود"),
        FeatureBadge("كشف طبي جامكا", "معامل GAMCA / LAB"),
        FeatureBadge("أفضل خيارات الطيران", "أسعار مخفضة وتأكيد فوري"),
        FeatureBadge("شهادات التطعيمات", "المعتمدة لوزارة الصحة"),
        FeatureBadge("جميع التأشيرات", "عائلية • عمل • شخصية • زيارة")
    )

    val categories = listOf(
        ServiceCategory("all", "جميع الخدمات"),
        ServiceCategory("visa", "تأشيرات السعودية وتساهيل"),
        ServiceCategory("umrah", "العمرة B2C والحج"),
        ServiceCategory("tourism", "الطيران والفنادق"),
        ServiceCategory("documents", "التوثيق والمستندات")
    )

    val services = listOf(
        TravelService(
            id = "tasheer-enjaz",
            categoryId = "visa",
            title = "حجز مواعيد تساهيل VFS وتسديد إنجاز",
            badge = "سجل ٧٨٣٩ معتمد",
            features = listOf(
                "حجز فوري ومستعجل لمواعيد البصمة بمركز تساهيل VFS Tasheer",
                "تسديد طلب منصة إنجاز وتسديد رسوم التأشيرة والتأمين الإلزامي",
                "إنشاء وطباعة الباركود الرسمي الخاص بالموعد",
                "مراجعة وتدقيق المستندات وتجهيز الملف بالكامل قبل الذهاب"
            )
        ),
        TravelService(
            id = "saudi-visas",
            categoryId = "visa",
            title = "جميع أنواع تأشيرات السعودية",
            badge = "إنجاز سريع",
            features = listOf(
                "تأشيرات الزيارة العائلية المباشرة والشخصية وزيارات الأصدقاء",
                "تأشيرات العمل وتفويض المعاملات وإجراءات الاستقدام",
                "تأشيرات السياحة والعلاج والترانزيت ورجال الأعمال",
                "تمديد وتجديد تأشيرات الزيارة السارية نظامياً"
            )
        ),
        TravelService(
            id = "gamca-medical",
            categoryId = "visa",
            title = "حجز الكشف الطبي GAMCA / LAB",
            badge = "فوري",
            features = listOf(
                "حجز فوري في معامل جامكا المعتمدة للسفر إلى المملكة",
                "استخراج إيصال السداد وباركود حجز الموعد الطبي",
                "متابعة ظهور النتائج وربطها إلكترونياً على المنصة",
                "استخراج وتوثيق شهادات التطعيمات واللقاحات المطلوبة"
            )
        ),
        TravelService(
            id = "umrah-b2c",
            categoryId = "umrah",
            title = "تأشيرة B2C (عمرة) وحجز سكن وطيران",
            badge = "طوال العام",
            features = listOf(
                "إصدار تأشيرة B2C للعمرة مع الباركود النظامي المعتمد",
                "برامج عمرة ميسرة واقتصادية وVIP طوال العام وشهر رمضان",
                "فنادق 5 نجوم و4 نجوم قريبة ومطلة على الحرمين الشريفين",
                "نقل مريح بحافلات حديثة ومكيفة بين مكة والمدينة والمشاعر",
                "إشراف ديني ومرافقة ميدانية متواصلة"
            )
        ),
        TravelService(
            id = "flight-booking",
            categoryId = "tourism",
            title = "حجز تذاكر الطيران (أفضل الخيارات)",
            badge = "أفضل الأسعار",
            features = listOf(
                "تذاكر طيران دولية ومحلية بأقوى الخصومات التنافسية",
                "رحلات مباشرة من القاهرة وبرج العرب إلى جدة والرياض والمدينة",
                "إمكانية اختيار المقاعد وشراء أوزان وحقائب إضافية",
                "تعديل وتأكيد فوري للحجوزات"
            )
        ),
        TravelService(
            id = "hotel-booking",
            categoryId = "tourism",
            title = "حجز الفنادق والشقق المفروشة",
            features = listOf(
                "فنادق فاخرة مطلة على ساحات الحرم المكي والنبوي",
                "شقق فندقية عائلية واسعة تلائم جميع الأسر",
                "خيارات شاملة الإفطار وبوفيه مفتوح وخدمة الغرف",
                "مواقع مركزية قريبة من مراكز التسوق والمواصلات"
            )
        ),
        TravelService(
            id = "documents-attestation",
            categoryId = "documents",
            title = "توثيق المستندات وعقود العمل",
            badge = "سجل ٧٨٣٩",
            features = listOf(
                "توثيق الغرفة التجارية المصرية ووزارة الخارجية",
                "توثيق وتصديق عقود العمل والاتفاقيات",
                "معادلة وتوثيق الشهادات الأكاديمية والجامعية",
                "ترجمة معتمدة لجميع الوثائق والتقارير الطبية"
            )
        )
    )

    val reviews = listOf(
        ClientReview(
            id = "1",
            author = "أحمد محمود العوضي",
            tripType = "تأشيرة زيارة وتساهيل",
            year = "2024",
            comment = "مكتب مسارك للإنجاز السياحي أنقذ موقفي في حجز موعد تساهيل وتسديد إنجاز في وقت قياسي. دقة عالية وسرعة في الرد عبر الواتساب والمتابعة حتى استلام الجواز."
        ),
        ClientReview(
            id = "2",
            author = "سارة عبدالرحمن",
            tripType = "عمرة B2C وطيران",
            year = "2024",
            comment = "رحلة العمرة كانت منظمة بأعلى مستوى احترافي، الفندق كان دقيقتين مشي من ساحة الحرم، واستخرجوا لنا الباركود وتذاكر الطيران بأفضل سعر."
        ),
        ClientReview(
            id = "3",
            author = "المهندس طارق منصور",
            tripType = "تأشيرة عمل وجامكا",
            year = "2024",
            comment = "تعامل راقي جداً من فريق مسارك، أنهوا كل إجراءات الكشف الطبي جامكا وتوثيق العقود وحجز الطيران دون أي تعقيد. أنصح الجميع بالتعامل معهم."
        )
    )
}
