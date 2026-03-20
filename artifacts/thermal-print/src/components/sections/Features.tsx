const features = [
  {
    icon: "⚡",
    title: "Tốc Độ In Cao",
    description:
      "Công nghệ in nhiệt tiên tiến cho tốc độ lên đến 250mm/s, đảm bảo in hóa đơn nhanh chóng ngay cả giờ cao điểm.",
  },
  {
    icon: "🔧",
    title: "Bền Bỉ & Ổn Định",
    description:
      "Thiết bị chính hãng với tuổi thọ cao, giảm thiểu sự cố, tiết kiệm chi phí bảo trì cho doanh nghiệp.",
  },
  {
    icon: "🛡️",
    title: "Bảo Hành Chính Hãng",
    description:
      "Cam kết bảo hành 12-24 tháng theo chính sách nhà sản xuất, hỗ trợ đổi mới khi phát sinh lỗi kỹ thuật.",
  },
  {
    icon: "📞",
    title: "Hỗ Trợ Kỹ Thuật 24/7",
    description:
      "Đội ngũ kỹ thuật viên chuyên nghiệp, hỗ trợ qua điện thoại, Zalo, email mọi lúc bạn cần.",
  },
  {
    icon: "🚚",
    title: "Giao Hàng Toàn Quốc",
    description:
      "Giao hàng nhanh trên toàn quốc, đóng gói cẩn thận, có bảo hiểm hàng hóa trong quá trình vận chuyển.",
  },
  {
    icon: "💰",
    title: "Giá Cả Cạnh Tranh",
    description:
      "Nhập khẩu trực tiếp từ nhà sản xuất, không qua trung gian, giá luôn tốt nhất thị trường, chiết khấu cao cho đại lý.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-blue-950 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tại Sao Chọn Chúng Tôi?</h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Hơn 10 năm kinh nghiệm trong ngành in nhiệt, chúng tôi hiểu rõ nhu cầu của từng doanh nghiệp
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
