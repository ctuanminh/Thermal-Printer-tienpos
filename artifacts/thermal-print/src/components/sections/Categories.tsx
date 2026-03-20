import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Categories() {
  const categories = [
    {
      title: "Máy In Nhiệt",
      description: "Đa dạng các dòng máy in hóa đơn, máy in nhãn, và máy in cầm tay phục vụ mọi nhu cầu kinh doanh.",
      image: `${import.meta.env.BASE_URL}images/cat-printer.png`,
      features: ["Tốc độ in cao", "Độ phân giải sắc nét", "Kết nối đa dạng"],
      color: "from-blue-50 to-indigo-50/50"
    },
    {
      title: "Giấy In Nhiệt",
      description: "Giấy in chất lượng cao, bám mực tốt, bảo vệ đầu in. Đầy đủ các kích thước K80, K57 và tem nhãn.",
      image: `${import.meta.env.BASE_URL}images/cat-paper.png`,
      features: ["Lõi nhựa không bụi", "Giấy trắng sáng", "Giá tận xưởng"],
      color: "from-slate-50 to-gray-50/50"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Danh Mục Sản Phẩm</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg">
            Chúng tôi cung cấp hệ sinh thái thiết bị và vật tư in ấn toàn diện, giúp tối ưu hóa quy trình bán hàng và quản lý kho.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.color} border border-border/50 p-8 hover:shadow-2xl transition-all duration-500`}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-display font-bold text-foreground">{cat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  <ul className="space-y-2 pb-4">
                    {cat.features.map(f => (
                      <li key={f} className="flex items-center text-sm font-medium text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#products" className="inline-flex items-center text-primary font-semibold group-hover:underline underline-offset-4">
                    Khám phá ngay
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="w-full md:w-1/2 aspect-square relative rounded-2xl overflow-hidden shadow-lg border border-white/50 bg-white/50 backdrop-blur-sm">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
