import { Printer, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                ThermalPrint
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Đơn vị cung cấp giải pháp in ấn mã vạch, hóa đơn chuyên nghiệp hàng đầu tại Việt Nam. Cam kết chất lượng và dịch vụ tận tâm.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>0909 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@mayinnhiet.vn</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Sản Phẩm</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#products" className="hover:text-primary transition-colors">Máy In Hóa Đơn</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Máy In Mã Vạch</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Máy In Cầm Tay</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Giấy In Nhiệt 80mm</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Giấy In Tem Nhãn</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Giờ Làm Việc</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Thứ 2 - Thứ 6:</span>
                <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Thứ 7:</span>
                <span>8:00 - 12:00</span>
              </li>
              <li className="flex justify-between pb-2 text-white/40">
                <span>Chủ Nhật:</span>
                <span>Nghỉ</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
          <p>© {new Date().getFullYear()} ThermalPrint. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
