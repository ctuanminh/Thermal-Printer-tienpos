export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.05) 40px,
            rgba(255,255,255,0.05) 41px
          ), repeating-linear-gradient(
            90deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.05) 40px,
            rgba(255,255,255,0.05) 41px
          )`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Nhà cung cấp hàng đầu Việt Nam
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Máy In Nhiệt &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Giấy In Chất Lượng Cao
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Giải pháp in ấn tốc độ cao, bền bỉ và tiết kiệm cho doanh nghiệp của bạn. Cung cấp thiết bị
              chính hãng, hỗ trợ kỹ thuật tận tâm 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-blue-600/30"
              >
                Xem Sản Phẩm
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-600 hover:border-blue-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                Nhận Báo Giá Ngay
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700/50">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400 mt-1">Khách hàng tin dùng</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-sm text-gray-400 mt-1">Năm kinh nghiệm</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400 mt-1">Hỗ trợ kỹ thuật</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🖨️", label: "Máy In Hóa Đơn", sub: "Tốc độ 200mm/s" },
                    { icon: "🏷️", label: "Máy In Nhãn", sub: "Độ bền cao" },
                    { icon: "📄", label: "Giấy In 80mm", sub: "Chống ẩm tốt" },
                    { icon: "📱", label: "Máy In Di Động", sub: "Kết nối Bluetooth" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/40 transition-colors"
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-white font-semibold text-sm">{item.label}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
