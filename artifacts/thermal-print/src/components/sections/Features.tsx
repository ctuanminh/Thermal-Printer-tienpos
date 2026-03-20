import { motion } from "framer-motion";
import { Zap, ShieldCheck, Headset, Truck } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Tốc Độ Vượt Trội",
      desc: "Thiết bị được trang bị cấu hình cao, cho phép in hàng ngàn hóa đơn, tem nhãn mỗi ngày không gián đoạn."
    },
    {
      icon: ShieldCheck,
      title: "Bền Bỉ Dài Lâu",
      desc: "Đầu in siêu bền, chống mài mòn. Khung máy thiết kế chống va đập, hoạt động tốt trong môi trường khắc nghiệt."
    },
    {
      icon: Headset,
      title: "Hỗ Trợ 24/7",
      desc: "Đội ngũ kỹ thuật viên am hiểu sâu sắc về máy in, sẵn sàng hỗ trợ cài đặt, xử lý sự cố từ xa nhanh chóng."
    },
    {
      icon: Truck,
      title: "Giao Hàng Tận Nơi",
      desc: "Hệ thống kho hàng rộng khắp, đảm bảo vật tư giấy in luôn sẵn sàng và giao hỏa tốc đến doanh nghiệp bạn."
    }
  ];

  return (
    <section id="features" className="py-24 bg-foreground text-white relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tại Sao Chọn Chúng Tôi?</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-lg">
            Hơn 5 năm kinh nghiệm, cung cấp giải pháp cho hơn 10.000 cửa hàng bán lẻ, nhà kho trên toàn quốc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg">
                <feat.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{feat.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
