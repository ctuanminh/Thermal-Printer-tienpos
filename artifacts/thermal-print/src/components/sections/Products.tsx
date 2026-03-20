const products = [
  {
    id: 1,
    name: "Máy In Hóa Đơn EPSON TM-T82",
    description: "Tốc độ in cao 200mm/s, độ phân giải 180dpi, kết nối USB + Serial + Ethernet",
    price: "2.850.000 VNĐ",
    brand: "EPSON",
    category: "Máy In Nhiệt",
    badge: "Bán Chạy",
    badgeColor: "bg-orange-500",
    emoji: "🖨️",
  },
  {
    id: 2,
    name: "Máy In Bill CITIZEN CT-E301",
    description: "Kết nối USB, LAN, Serial. Hỗ trợ cắt giấy tự động, in logo, mã vạch QR",
    price: "3.200.000 VNĐ",
    brand: "CITIZEN",
    category: "Máy In Nhiệt",
    badge: "Mới",
    badgeColor: "bg-green-500",
    emoji: "🖨️",
  },
  {
    id: 3,
    name: "Máy In Nhãn ZEBRA ZD220",
    description: "In nhãn mã vạch chuyên nghiệp, tốc độ 102mm/s, kết nối USB",
    price: "4.500.000 VNĐ",
    brand: "ZEBRA",
    category: "Máy In Nhãn",
    badge: "Chính Hãng",
    badgeColor: "bg-blue-500",
    emoji: "🏷️",
  },
  {
    id: 4,
    name: "Máy In Cầm Tay Bluetooth",
    description: "Di động tiện lợi, pin sạc dùng 8 giờ, kết nối Bluetooth & USB, in khổ 58mm",
    price: "1.800.000 VNĐ",
    brand: "Đa thương hiệu",
    category: "Máy In Di Động",
    badge: "",
    badgeColor: "",
    emoji: "📱",
  },
  {
    id: 5,
    name: "Giấy In Nhiệt 80mm x 80m",
    description: "Hộp 10 cuộn, chống ẩm tốt, phù hợp máy in hóa đơn 80mm mọi thương hiệu",
    price: "120.000 VNĐ / hộp",
    brand: "Đa thương hiệu",
    category: "Giấy In Nhiệt",
    badge: "Tiết Kiệm",
    badgeColor: "bg-teal-500",
    emoji: "📄",
  },
  {
    id: 6,
    name: "Giấy In Nhiệt 57mm x 50m",
    description: "Hộp 20 cuộn, dùng cho máy in POS, máy tính tiền, ATM, màu trắng sáng",
    price: "130.000 VNĐ / hộp",
    brand: "Đa thương hiệu",
    category: "Giấy In Nhiệt",
    badge: "",
    badgeColor: "",
    emoji: "📄",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Các thiết bị và vật tư in nhiệt chất lượng cao từ những thương hiệu uy tín nhất thị trường
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center relative">
                <span className="text-7xl">{product.emoji}</span>
                {product.badge && (
                  <span className={`absolute top-3 right-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                  {product.category} · {product.brand}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-blue-700">{product.price}</span>
                  <a
                    href="#contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Liên Hệ
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Xem Tất Cả Sản Phẩm
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
