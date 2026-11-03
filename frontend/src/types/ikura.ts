export type Language = 'vi' | 'en' | 'km';

export interface ProductSpec {
  glassDimension: string;      // Kích thước mặt kính (ví dụ: 750 x 450 mm)
  cutoutDimension: string;     // Kích thước khoét đá (ví dụ: 680 x 380 mm)
  burnersCount: number;        // Số lò nấu
  burnerMaterial: string;      // Đồng thau nguyên khối / Hợp kim cao cấp
  ignitionSystem: string;      // Pin IC 1.5V / Magneto
  safetyCutoff: boolean;       // Ngắt ga tự động an toàn
  glassMaterial: string;       // Mặt kính cường lực chịu nhiệt
  warrantyMonths: number;      // 24 hoặc 36 tháng
  gasConsumption?: string;     // Lượng ga tiêu thụ (kg/h)
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'bep-ga-am' | 'bep-ga-duong' | 'bep-hong-ngoai' | 'phu-kien';
  categoryLabel: string;
  image: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  specs: ProductSpec;
  features: string[];
  description: string;
}

export interface WarrantyRecord {
  serialNumber: string;
  customerName: string;
  phoneNumber: string;
  productModel: string;
  purchaseDate: string;
  expiryDate: string;
  warrantyPeriodMonths: number;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  dealerName: string;
  city: string;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  workingHours: string;
  hasWarrantyCenter: boolean;
  googleMapsUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Mẹo an toàn' | 'Tin tức Ikura' | 'Khuyến mãi' | 'Cẩm nang bếp';
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
}
