export interface ServiceCategory {
  id: string;
  titleAr: string;
}

export interface TravelService {
  id: string;
  categoryId: string;
  title: string;
  badge?: string;
  features: string[];
}

export interface ClientReview {
  id: string;
  author: string;
  tripType: string;
  year: string;
  comment: string;
  rating?: number;
}

export interface FeatureBadge {
  title: string;
  subtitle: string;
  icon?: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
