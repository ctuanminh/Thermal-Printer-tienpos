export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  brand: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  emoji: string;
  specs: { label: string; value: string }[];
  promotions?: string[];
};

export type Category = {
  id: string;
  name: string;
  count: number;
};

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Máy In Hóa Đơn EPSON TM-T82",
    description: "Tốc độ in cao 200mm/s, độ phân giải 180dpi, kết nối USB + Serial + Ethernet. Phù hợp nhà hàng, siêu thị, chuỗi bán lẻ.",
    price: "2.850.000 VNĐ",
    priceNumber: 2850000,
    brand: "EPSON",
    category: "Máy In Nhiệt",
    badge: "Bán Chạy",
    badgeColor: "bg-orange-500",
    emoji: "🖨️",
    specs: [
      { label: "Tốc độ in", value: "200mm/s" },
      { label: "Độ phân giải", value: "180dpi" },
      { label: "Kết nối", value: "USB, Serial, Ethernet" },
      { label: "Khổ giấy", value: "80mm" },
      { label: "Cắt giấy", value: "Tự động" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 1 cuộn giấy in nhiệt 80mm x 80m",
      "🔧 Miễn phí lắp đặt & cài đặt phần mềm",
      "📦 Miễn phí vận chuyển nội thành",
      "📞 Hỗ trợ kỹ thuật 24/7 trong 3 tháng đầu",
    ],
  },
  {
    id: 2,
    name: "Máy In Bill CITIZEN CT-E301",
    description: "Kết nối USB, LAN, Serial. Hỗ trợ cắt giấy tự động, in logo, mã vạch QR. Bền bỉ với môi trường bụi bẩn.",
    price: "3.200.000 VNĐ",
    priceNumber: 3200000,
    brand: "CITIZEN",
    category: "Máy In Nhiệt",
    badge: "Mới",
    badgeColor: "bg-green-500",
    emoji: "🖨️",
    specs: [
      { label: "Tốc độ in", value: "250mm/s" },
      { label: "Độ phân giải", value: "203dpi" },
      { label: "Kết nối", value: "USB, LAN, Serial" },
      { label: "Khổ giấy", value: "80mm" },
      { label: "Cắt giấy", value: "Tự động" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 2 cuộn giấy in nhiệt 80mm",
      "📦 Miễn phí vận chuyển toàn quốc",
      "🔧 Miễn phí cài đặt driver & phần mềm POS",
    ],
  },
  {
    id: 3,
    name: "Máy In Hóa Đơn BIXOLON SRP-350V",
    description: "Máy in bill POS tốc độ cao, hỗ trợ in đậm, in mã vạch, logo. Giao diện đa dạng cho mọi loại hình kinh doanh.",
    price: "2.950.000 VNĐ",
    priceNumber: 2950000,
    brand: "BIXOLON",
    category: "Máy In Nhiệt",
    emoji: "🖨️",
    specs: [
      { label: "Tốc độ in", value: "250mm/s" },
      { label: "Độ phân giải", value: "180dpi" },
      { label: "Kết nối", value: "USB, Serial, Parallel" },
      { label: "Khổ giấy", value: "80mm" },
      { label: "Cắt giấy", value: "Tự động" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 1 cuộn giấy in nhiệt 80mm x 80m",
      "📦 Miễn phí vận chuyển nội thành TP.HCM & HN",
    ],
  },
  {
    id: 4,
    name: "Máy In Nhãn ZEBRA ZD220",
    description: "In nhãn mã vạch chuyên nghiệp, tốc độ 102mm/s, kết nối USB. Phù hợp kho hàng, logistics, y tế.",
    price: "4.500.000 VNĐ",
    priceNumber: 4500000,
    brand: "ZEBRA",
    category: "Máy In Nhãn",
    badge: "Chính Hãng",
    badgeColor: "bg-blue-500",
    emoji: "🏷️",
    specs: [
      { label: "Tốc độ in", value: "102mm/s" },
      { label: "Độ phân giải", value: "203dpi" },
      { label: "Kết nối", value: "USB" },
      { label: "Khổ nhãn", value: "25-108mm" },
      { label: "Loại in", value: "Nhiệt trực tiếp / Truyền nhiệt" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 1 cuộn nhãn giấy 100mm x 100mm (500 tờ)",
      "🔧 Miễn phí cài đặt phần mềm ZPL",
      "📦 Miễn phí vận chuyển toàn quốc",
      "💰 Giảm 5% khi mua thêm nhãn giấy từ 5 cuộn",
    ],
  },
  {
    id: 5,
    name: "Máy In Nhãn TSC TTP-225",
    description: "In nhãn nhiệt trực tiếp và truyền nhiệt. Tốc độ cao, độ bền tốt. Lý tưởng cho sản xuất và phân phối.",
    price: "3.800.000 VNĐ",
    priceNumber: 3800000,
    brand: "TSC",
    category: "Máy In Nhãn",
    emoji: "🏷️",
    specs: [
      { label: "Tốc độ in", value: "127mm/s" },
      { label: "Độ phân giải", value: "203dpi" },
      { label: "Kết nối", value: "USB, Serial, Parallel" },
      { label: "Khổ nhãn", value: "25-108mm" },
      { label: "Loại in", value: "Nhiệt trực tiếp / Truyền nhiệt" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 1 cuộn ribbon wax 110mm x 300m",
      "📦 Miễn phí vận chuyển toàn quốc",
    ],
  },
  {
    id: 6,
    name: "Máy In Nhãn ZEBRA ZD421",
    description: "Màn hình màu, cảm biến đầy đủ, hỗ trợ RFID tùy chọn. Thiết kế chắc chắn cho môi trường công nghiệp.",
    price: "8.200.000 VNĐ",
    priceNumber: 8200000,
    brand: "ZEBRA",
    category: "Máy In Nhãn",
    badge: "Cao Cấp",
    badgeColor: "bg-purple-500",
    emoji: "🏷️",
    specs: [
      { label: "Tốc độ in", value: "152mm/s" },
      { label: "Độ phân giải", value: "203/300dpi" },
      { label: "Kết nối", value: "USB, LAN, WiFi, Bluetooth" },
      { label: "Màn hình", value: "3.5 inch màu" },
      { label: "Tùy chọn", value: "RFID" },
      { label: "Bảo hành", value: "24 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 2 cuộn nhãn giấy 100mm x 100mm",
      "🎁 Tặng kèm 1 cuộn ribbon resin 110mm x 300m",
      "🔧 Miễn phí lắp đặt & đào tạo sử dụng",
      "📦 Miễn phí vận chuyển toàn quốc",
      "💰 Ưu đãi đặc biệt khi mua 2 máy trở lên",
    ],
  },
  {
    id: 7,
    name: "Máy In Cầm Tay Bluetooth 58mm",
    description: "Di động tiện lợi, pin sạc Li-ion dùng 8 giờ liên tục, kết nối Bluetooth 4.0 & USB, in khổ 58mm.",
    price: "1.800.000 VNĐ",
    priceNumber: 1800000,
    brand: "Đa thương hiệu",
    category: "Máy In Di Động",
    emoji: "📱",
    specs: [
      { label: "Tốc độ in", value: "70mm/s" },
      { label: "Kết nối", value: "Bluetooth 4.0, USB" },
      { label: "Pin", value: "Li-ion 1500mAh" },
      { label: "Khổ giấy", value: "58mm" },
      { label: "Thời lượng pin", value: "~8 giờ" },
      { label: "Bảo hành", value: "6 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm 3 cuộn giấy in nhiệt 58mm",
      "📦 Miễn phí vận chuyển toàn quốc",
    ],
  },
  {
    id: 8,
    name: "Máy In Cầm Tay BIXOLON SPP-R310",
    description: "Máy in di động công nghiệp, chống bụi & nước IP54, in 80mm, kết nối Bluetooth & WiFi.",
    price: "5.500.000 VNĐ",
    priceNumber: 5500000,
    brand: "BIXOLON",
    category: "Máy In Di Động",
    badge: "Công Nghiệp",
    badgeColor: "bg-gray-600",
    emoji: "📱",
    specs: [
      { label: "Tốc độ in", value: "100mm/s" },
      { label: "Kết nối", value: "Bluetooth, WiFi" },
      { label: "Bảo vệ", value: "IP54" },
      { label: "Khổ giấy", value: "80mm" },
      { label: "Thời lượng pin", value: "~10 giờ" },
      { label: "Bảo hành", value: "12 tháng" },
    ],
    promotions: [
      "🎁 Tặng kèm túi đựng máy in chuyên dụng",
      "🎁 Tặng kèm 5 cuộn giấy in nhiệt 80mm",
      "🔧 Miễn phí cài đặt & kết nối thiết bị",
      "📦 Miễn phí vận chuyển toàn quốc",
    ],
  },
  {
    id: 9,
    name: "Giấy In Nhiệt 80mm x 80m",
    description: "Hộp 10 cuộn, chống ẩm tốt, phù hợp máy in hóa đơn 80mm mọi thương hiệu. Màu trắng sáng, không lem.",
    price: "120.000 VNĐ",
    priceNumber: 120000,
    brand: "Đa thương hiệu",
    category: "Giấy In Nhiệt",
    badge: "Tiết Kiệm",
    badgeColor: "bg-teal-500",
    emoji: "📄",
    specs: [
      { label: "Kích thước", value: "80mm x 80m" },
      { label: "Số cuộn/hộp", value: "10 cuộn" },
      { label: "Nhiệt độ lưu trữ", value: "≤ 40°C" },
      { label: "Thời hạn bảo quản", value: "5 năm" },
      { label: "Màu sắc", value: "Trắng sáng" },
      { label: "Đơn vị", value: "Hộp 10 cuộn" },
    ],
    promotions: [
      "💰 Mua 5 hộp giảm 5%, mua 10 hộp giảm 10%",
      "📦 Miễn phí vận chuyển khi mua từ 3 hộp",
    ],
  },
  {
    id: 10,
    name: "Giấy In Nhiệt 57mm x 50m",
    description: "Hộp 20 cuộn, dùng cho máy in POS, máy tính tiền, ATM, màu trắng sáng, chống phai màu lâu dài.",
    price: "130.000 VNĐ",
    priceNumber: 130000,
    brand: "Đa thương hiệu",
    category: "Giấy In Nhiệt",
    emoji: "📄",
    specs: [
      { label: "Kích thước", value: "57mm x 50m" },
      { label: "Số cuộn/hộp", value: "20 cuộn" },
      { label: "Nhiệt độ lưu trữ", value: "≤ 40°C" },
      { label: "Thời hạn bảo quản", value: "5 năm" },
      { label: "Màu sắc", value: "Trắng sáng" },
      { label: "Đơn vị", value: "Hộp 20 cuộn" },
    ],
    promotions: [
      "💰 Mua 5 hộp giảm 5%, mua 10 hộp giảm 10%",
      "📦 Miễn phí vận chuyển khi mua từ 3 hộp",
    ],
  },
  {
    id: 11,
    name: "Giấy In Nhiệt 80mm x 50m",
    description: "Cuộn nhỏ gọn hơn, phù hợp máy có lõi nhỏ. Hộp 20 cuộn, chất lượng in sắc nét, chống ẩm.",
    price: "95.000 VNĐ",
    priceNumber: 95000,
    brand: "Đa thương hiệu",
    category: "Giấy In Nhiệt",
    emoji: "📄",
    specs: [
      { label: "Kích thước", value: "80mm x 50m" },
      { label: "Số cuộn/hộp", value: "20 cuộn" },
      { label: "Nhiệt độ lưu trữ", value: "≤ 40°C" },
      { label: "Thời hạn bảo quản", value: "5 năm" },
      { label: "Màu sắc", value: "Trắng sáng" },
      { label: "Đơn vị", value: "Hộp 20 cuộn" },
    ],
    promotions: [
      "💰 Mua 5 hộp giảm 5%, mua 10 hộp giảm 10%",
      "📦 Miễn phí vận chuyển khi mua từ 3 hộp",
    ],
  },
  {
    id: 12,
    name: "Tem Nhãn In Nhiệt A4 (100 tờ)",
    description: "Tem nhãn A4 trắng cho máy in nhiệt khổ A4. Dùng in hóa đơn, phiếu giao hàng, nhãn kho.",
    price: "85.000 VNĐ",
    priceNumber: 85000,
    brand: "Đa thương hiệu",
    category: "Giấy In Nhiệt",
    emoji: "📋",
    specs: [
      { label: "Kích thước", value: "A4 (210x297mm)" },
      { label: "Số tờ/hộp", value: "100 tờ" },
      { label: "Loại giấy", value: "Nhiệt trực tiếp" },
      { label: "Ứng dụng", value: "Hóa đơn, phiếu giao hàng" },
      { label: "Màu sắc", value: "Trắng" },
      { label: "Đơn vị", value: "Hộp 100 tờ" },
    ],
    promotions: [
      "💰 Mua 10 hộp giảm 8%",
      "📦 Miễn phí vận chuyển khi mua từ 5 hộp",
    ],
  },
];

export const CATEGORIES: Category[] = [
  { id: "all", name: "Tất Cả", count: ALL_PRODUCTS.length },
  { id: "Máy In Nhiệt", name: "Máy In Nhiệt", count: ALL_PRODUCTS.filter((p) => p.category === "Máy In Nhiệt").length },
  { id: "Máy In Nhãn", name: "Máy In Nhãn", count: ALL_PRODUCTS.filter((p) => p.category === "Máy In Nhãn").length },
  { id: "Máy In Di Động", name: "Máy In Di Động", count: ALL_PRODUCTS.filter((p) => p.category === "Máy In Di Động").length },
  { id: "Giấy In Nhiệt", name: "Giấy In Nhiệt", count: ALL_PRODUCTS.filter((p) => p.category === "Giấy In Nhiệt").length },
];

export const BRANDS = [...new Set(ALL_PRODUCTS.map((p) => p.brand))].filter((b) => b !== "Đa thương hiệu");

export const PRICE_RANGES = [
  { id: "all", label: "Tất cả mức giá" },
  { id: "under500", label: "Dưới 500.000 VNĐ" },
  { id: "500to2m", label: "500.000 - 2.000.000 VNĐ" },
  { id: "2mto5m", label: "2.000.000 - 5.000.000 VNĐ" },
  { id: "over5m", label: "Trên 5.000.000 VNĐ" },
];

export const ZALO_NUMBER = "0909123456";
export const PHONE_NUMBER = "0909123456";
