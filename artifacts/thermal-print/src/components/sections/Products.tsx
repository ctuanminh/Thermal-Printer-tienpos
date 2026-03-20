import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Máy In Hóa Đơn EPSON TM-T82",
    price: 2850000,
    category: "Máy In Hóa Đơn",
    desc: "Tốc độ in nhanh 200mm/s, độ bền bỉ cao, phù hợp siêu thị, nhà hàng.",
    image: `${import.meta.env.BASE_URL}images/prod-epson.png`,
    featured: true,
  },
  {
    id: 2,
    name: "Máy In Bill CITIZEN CT-E301",
    price: 3200000,
    category: "Máy In Hóa Đơn",
    desc: "Thiết kế hiện đại vuông vức, đa kết nối USB, LAN, Serial tiện lợi.",
    image: `${import.meta.env.BASE_URL}images/prod-citizen.png`,
  },
  {
    id: 3,
    name: "Máy In Nhãn ZEBRA ZD220",
    price: 4500000,
    category: "Máy In Mã Vạch",
    desc: "In nhãn mã vạch chuyên nghiệp, vỏ bọc chắc chắn, dễ dàng thay mực/giấy.",
    image: `${import.meta.env.BASE_URL}images/prod-zebra.png`,
  },
  {
    id: 4,
    name: "Máy In Cầm Tay Bluetooth",
    price: 1800000,
    category: "Máy In Cầm Tay",
    desc: "Nhỏ gọn di động, dung lượng pin trâu, kết nối Bluetooth với điện thoại.",
    image: `${import.meta.env.BASE_URL}images/prod-mobile.png`,
  },
  {
    id: 5,
    name: "Giấy In Nhiệt 80x80 (Hộp 10 cuộn)",
    price: 1200000,
    category: "Giấy In Nhiệt",
    desc: "Giấy OJI chất lượng cao, lõi nhựa nhỏ không bụi, bảo vệ tuổi thọ đầu in.",
    image: `${import.meta.env.BASE_URL}images/prod-roll80.png`,
  },
  {
    id: 6,
    name: "Cuộn Tem Nhãn 35x22mm (3 tem/hàng)",
    price: 85000,
    category: "Giấy Tem Nhãn",
    desc: "Decal nhiệt bám dính tốt, in sắc nét không phai, cuộn dài 50 mét.",
    image: `${import.meta.env.BASE_URL}images/prod-label.png`,
  }
];

export function Products() {
  return (
    <section id="products" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Sản Phẩm Nổi Bật</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground text-lg">
              Các dòng sản phẩm bán chạy nhất được nhiều doanh nghiệp tin dùng nhờ độ ổn định và chi phí hợp lý.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            Xem Tất Cả Sản Phẩm
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col group">
                <div className="relative aspect-square overflow-hidden bg-white p-6">
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-accent text-white no-default-hover-elevate">
                      Bán chạy
                    </Badge>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="flex-1">
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{product.category}</div>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between border-t border-border/50 pt-6">
                  <div className="font-display font-bold text-xl text-foreground">
                    {formatCurrency(product.price)}
                  </div>
                  <a href="#contact">
                    <Button size="sm">Liên Hệ</Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="w-full">
            Xem Tất Cả Sản Phẩm
          </Button>
        </div>
      </div>
    </section>
  );
}
