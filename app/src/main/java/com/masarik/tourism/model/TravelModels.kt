package com.masarik.tourism.model

data class ServiceCategory(
    val id: String,
    val titleAr: String
)

data class TravelService(
    val id: String,
    val categoryId: String,
    val title: String,
    val badge: String? = null,
    val features: List<String>
)

data class ClientReview(
    val id: String,
    val author: String,
    val tripType: String,
    val year: String,
    val comment: String,
    val rating: Int = 5
)

data class FeatureBadge(
    val title: String,
    val subtitle: String
)
