const categories = [
  {
    id: 1,
    name: "Máy In Nhiệt",
    description: "Máy in hóa đơn, nhãn, bill cho nhà hàng, siêu thị, bán lẻ",
    icon: "🖨️",
    color: "blue",
    items: ["Máy in hóa đơn", "Máy in nhãn mã vạch", "Máy in bill cầm tay", "Máy in kiosk"],
  },
  {
    id: 2,
    name: "Giấy In Nhiệt",
    description: "Giấy in nhiệt chất lượng cao, nhiều kích cỡ, chịu nhiệt tốt",
    icon: "📄",
    color: "green",
    items: ["Giấy cuộn 80mm, 57mm", "Giấy A4 in nhiệt", "Tem nhãn in nhiệt", "Giấy in ATM"],
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đa dạng sản phẩm máy in nhiệt và vật tư tiêu hao đáp ứng mọi nhu cầu kinh doanh
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                  <ul className="space-y-1.5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#products"
                  className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-2.5 transition-all"
                >
                  Xem tất cả sản phẩm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
