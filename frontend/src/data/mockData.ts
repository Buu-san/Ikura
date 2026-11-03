import { Product, WarrantyRecord, Dealer, NewsArticle } from '../types/ikura';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'ik-880-pro',
    name: 'Bếp Ga Âm Cao Cấp Ikura Pro IK-880',
    sku: 'IK-880PRO',
    category: 'bep-ga-am',
    categoryLabel: 'Bếp Ga Âm',
    image: '/images/bep-ga-am.jpg',
    price: 4850000,
    originalPrice: 5600000,
    isNew: true,
    isBestseller: true,
    description: 'Thiết kế sang trọng chuẩn phong cách Nhật Bản. Tích hợp cảm biến ngắt ga tự động FFD cao cấp, đầu đốt đồng thau chịu nhiệt độ cao.',
    specs: {
      glassDimension: '750 x 450 mm',
      cutoutDimension: '680 x 380 mm',
      burnersCount: 2,
      burnerMaterial: 'Đồng thau nguyên khối đúc áp lực',
      ignitionSystem: 'Đánh lửa Pin IC 1.5V siêu nhạy',
      safetyCutoff: true,
      glassMaterial: 'Kính cường lực vát cạnh chịu nhiệt 850°C',
      warrantyMonths: 36,
      gasConsumption: '0.38 kg/h'
    },
    features: [
      'Cảm biến ngắt ga tự động chống cháy nổ 100%',
      'Đầu đốt đồng thau lửa xanh tiết kiệm 30% ga',
      'Kiềng gang đúc nguyên khối chống trơn trượt',
      'Bảo hành chính hãng 36 tháng tại nhà'
    ]
  },
  {
    id: 'ik-990-infrared',
    name: 'Bếp Ga Hồng Ngoại Ikura Hi-Heat IK-990',
    sku: 'IK-990IR',
    category: 'bep-hong-ngoai',
    categoryLabel: 'Bếp Ga Hồng Ngoại',
    image: '/images/bep-hong-ngoai.jpg',
    price: 3950000,
    originalPrice: 4500000,
    isNew: true,
    isBestseller: false,
    description: 'Công nghệ đầu đốt ceramic tổ ong hồng ngoại không khói, không đen đáy nồi, đun nấu siêu nhanh và an toàn tuyệt đối trước gió và nước trào.',
    specs: {
      glassDimension: '720 x 420 mm',
      cutoutDimension: '650 x 350 mm',
      burnersCount: 2,
      burnerMaterial: 'Gốm Ceramic tổ ong đường kính 135mm',
      ignitionSystem: 'Đánh lửa Pin IC điện tử',
      safetyCutoff: true,
      glassMaterial: 'Kính Ceramic chịu lực 60kg, chống sốc nhiệt',
      warrantyMonths: 24,
      gasConsumption: '0.30 kg/h'
    },
    features: [
      'Mâm nhiệt tổ ong đốt cháy 100% lượng ga',
      'Không đen đáy nồi, không tạo muội than độc hại',
      'Kháng gió và kháng nước trào tắt bếp',
      'Bảo hành chính hãng 24 tháng tận nhà'
    ]
  },
  {
    id: 'ik-680-classic',
    name: 'Bếp Ga Âm Đôi Thế Hệ Mới Ikura IK-680',
    sku: 'IK-680',
    category: 'bep-ga-am',
    categoryLabel: 'Bếp Ga Âm',
    image: '/images/bep-ga-am.jpg',
    price: 3690000,
    originalPrice: 4200000,
    isNew: false,
    isBestseller: true,
    description: 'Dòng bếp ga âm quốc dân được hàng trăm nghìn gia đình Việt tin dùng nhờ độ bền vượt trội và tính năng an toàn tự động đóng ngắt van ga.',
    specs: {
      glassDimension: '730 x 430 mm',
      cutoutDimension: '660 x 360 mm',
      burnersCount: 2,
      burnerMaterial: 'Hợp kim đồng phủ carbon chống gỉ',
      ignitionSystem: 'Pin IC 1.5V siêu nhạy',
      safetyCutoff: true,
      glassMaterial: 'Kính cường lực đen bóng dày 8mm',
      warrantyMonths: 24,
      gasConsumption: '0.35 kg/h'
    },
    features: [
      'Ngắt ga an toàn tự động khi có sự cố gió hoặc tràn',
      'Khay hứng mỡ inox 304 không rỉ sét',
      'Thiết kế nút vặn kim loại đầm tay',
      'Bảo hành 24 tháng chính hãng'
    ]
  },
  {
    id: 'ik-320-tabletop',
    name: 'Bếp Ga Dương Đôi Mặt Kính Ikura Eco IK-320',
    sku: 'IK-320ECO',
    category: 'bep-ga-duong',
    categoryLabel: 'Bếp Ga Dương',
    image: '/images/bep-hong-ngoai.jpg',
    price: 1850000,
    originalPrice: 2200000,
    isNew: false,
    isBestseller: true,
    description: 'Bếp để bàn nhỏ gọn, mặt kính cường lực dễ lau chùi, hệ thống đánh lửa Magneto cơ học siêu bền bỉ không lo hết pin.',
    specs: {
      glassDimension: '690 x 380 x 135 mm',
      cutoutDimension: 'Không cần khoét đá (Đặt dương bàn)',
      burnersCount: 2,
      burnerMaterial: 'Hợp kim nhôm đúc nguyên khối',
      ignitionSystem: 'Magneto cơ học thế hệ mới',
      safetyCutoff: false,
      glassMaterial: 'Kính cường lực in hoa văn chống xước',
      warrantyMonths: 24,
      gasConsumption: '0.38 kg/h'
    },
    features: [
      'Đánh lửa cơ Magneto êm ái, tuổi thọ trên 5 năm',
      'Thân bếp sơn tĩnh điện chống oxy hóa',
      'Mặt kính dày 7mm chịu nhiệt chống bám dầu mỡ',
      'Bảo hành chính hãng 24 tháng'
    ]
  }
];

export const WARRANTY_DEMO_RECORDS: WarrantyRecord[] = [
  {
    serialNumber: 'IK2024-8899',
    customerName: 'Nguyễn Văn Minh',
    phoneNumber: '0901234567',
    productModel: 'Bếp Ga Âm Ikura Pro IK-880',
    purchaseDate: '15/06/2024',
    expiryDate: '15/06/2027',
    warrantyPeriodMonths: 36,
    status: 'ACTIVE',
    dealerName: 'Đại lý Bếp Xanh Q.1',
    city: 'TP. Hồ Chí Minh'
  },
  {
    serialNumber: 'IK2023-6621',
    customerName: 'Trần Thị Thu Hà',
    phoneNumber: '0988776655',
    productModel: 'Bếp Ga Hồng Ngoại Ikura IK-990',
    purchaseDate: '20/09/2023',
    expiryDate: '20/09/2025',
    warrantyPeriodMonths: 24,
    status: 'ACTIVE',
    dealerName: 'Siêu thị Điện Máy Xanh Cầu Giấy',
    city: 'Hà Nội'
  },
  {
    serialNumber: 'IK2021-1102',
    customerName: 'Lê Hoàng Nam',
    phoneNumber: '0912345678',
    productModel: 'Bếp Ga Dương Ikura Eco IK-320',
    purchaseDate: '10/01/2021',
    expiryDate: '10/01/2023',
    warrantyPeriodMonths: 24,
    status: 'EXPIRED',
    dealerName: 'Showroom Ikura Hải Châu',
    city: 'Đà Nẵng'
  }
];

export const DEALERS_DATA: Dealer[] = [
  {
    id: 'd-hcm-1',
    name: 'Showroom Trụ Sở Chính Ikura Sài Gòn',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    address: '188 Nguyễn Thái Học, Phường Cầu Ông Lãnh',
    phone: '028 3920 6868',
    workingHours: '08:00 - 20:30 (Tất cả các ngày)',
    hasWarrantyCenter: true
  },
  {
    id: 'd-hcm-2',
    name: 'Trung Tâm Bảo Hành & Đại Lý Ikura Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    address: '425 Bạch Đằng, Phường 14',
    phone: '028 3841 8899',
    workingHours: '08:00 - 18:00 (T2 - T7)',
    hasWarrantyCenter: true
  },
  {
    id: 'd-hn-1',
    name: 'Showroom Ikura Hà Nội & Trạm Kỹ Thuật Miền Bắc',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    address: '268 Xuân Thủy, Phường Dịch Vọng Hậu',
    phone: '024 3768 8899',
    workingHours: '08:00 - 20:00 (Tất cả các ngày)',
    hasWarrantyCenter: true
  },
  {
    id: 'd-hn-2',
    name: 'Đại Lý Phân Phối Thiết Bị Bếp Đống Đa',
    city: 'Hà Nội',
    district: 'Đống Đa',
    address: '152 Xã Đàn, Phường Phương Liên',
    phone: '024 3574 6622',
    workingHours: '08:30 - 19:30',
    hasWarrantyCenter: false
  },
  {
    id: 'd-dn-1',
    name: 'Trạm Bảo Hành & Đại Lý Chính Hãng Đà Nẵng',
    city: 'Đà Nẵng',
    district: 'Hải Châu',
    address: '92 Nguyễn Văn Linh, Phường Nam Dương',
    phone: '0236 388 9966',
    workingHours: '08:00 - 18:00',
    hasWarrantyCenter: true
  },
  {
    id: 'd-ct-1',
    name: 'Showroom Đại Lý Ikura Tây Nam Bộ',
    city: 'Cần Thơ',
    district: 'Ninh Kiều',
    address: '75 Đại lộ Hòa Bình, Phường Tân An',
    phone: '0292 381 2288',
    workingHours: '08:00 - 19:00',
    hasWarrantyCenter: true
  }
];

export const NEWS_DATA: NewsArticle[] = [
  {
    id: 'news-1',
    title: '5 Dấu hiệu nhận biết rò rỉ khí ga và cách xử lý cấp tốc an toàn',
    category: 'Mẹo an toàn',
    excerpt: 'Khí ga có mùi gì? Khi phát hiện mùi ga nồng nặc trong bếp, những thao tác nào tuyệt đối không được làm để ngăn ngừa cháy nổ...',
    date: '02/10/2026',
    readTime: '4 phút đọc',
    imageUrl: '/images/hero-kitchen.jpg'
  },
  {
    id: 'news-2',
    title: 'Tại sao bếp ga âm Ikura trang bị van cảm ứng ngắt ga tự động FFD?',
    category: 'Cẩm nang bếp',
    excerpt: 'Tìm hiểu nguyên lý vận hành của van cảm ứng nhiệt ngắt ga tự động - bức tường lửa bảo vệ sự an toàn cho mọi căn bếp gia đình.',
    date: '28/09/2026',
    readTime: '6 phút đọc',
    imageUrl: '/images/bep-ga-am.jpg'
  },
  {
    id: 'news-3',
    title: 'Chương trình "Thu Bếp Cũ - Đổi Bếp Mới Trợ Giá Đến 30%" Cùng Ikura',
    category: 'Khuyến mãi',
    excerpt: 'Hỗ trợ khách hàng nâng cấp lên dòng bếp ga âm ngắt ga an toàn thế hệ mới với chính sách bảo hành chính hãng lên đến 36 tháng.',
    date: '20/09/2026',
    readTime: '3 phút đọc',
    imageUrl: '/images/bep-hong-ngoai.jpg'
  }
];
