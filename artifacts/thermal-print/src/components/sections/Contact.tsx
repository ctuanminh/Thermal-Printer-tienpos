import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập tên của bạn"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  message: z.string().min(10, "Vui lòng nhập nội dung yêu cầu chi tiết hơn"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Đã gửi yêu cầu thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
    });
    
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const contactInfo = [
    { icon: MapPin, title: "Địa chỉ", detail: "123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM" },
    { icon: Phone, title: "Điện thoại", detail: "0909 123 456 (Zalo/Zalo OA)" },
    { icon: Mail, title: "Email", detail: "info@mayinnhiet.vn" },
    { icon: Clock, title: "Giờ làm việc", detail: "8:00 - 18:00, Thứ 2 đến Thứ 7" },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Liên Hệ Đặt Hàng</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-8" />
            <p className="text-muted-foreground text-lg mb-12">
              Quý khách cần tư vấn lắp đặt hệ thống máy in, hoặc báo giá sỉ cho vật tư giấy in? Hãy để lại thông tin, đội ngũ của chúng tôi sẽ gọi lại ngay!
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                    <p className="text-muted-foreground">{info.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5 relative overflow-hidden"
          >
            {isSuccess ? (
              <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold font-display text-foreground mb-2">Đã Gửi Thành Công!</h3>
                <p className="text-muted-foreground">Cảm ơn bạn đã quan tâm. Chuyên viên tư vấn sẽ liên hệ sớm nhất.</p>
                <Button 
                  className="mt-8" 
                  variant="outline"
                  onClick={() => setIsSuccess(false)}
                >
                  Gửi yêu cầu khác
                </Button>
              </div>
            ) : null}

            <h3 className="text-2xl font-bold font-display mb-6">Gửi Yêu Cầu Tư Vấn</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium mb-2">Họ và Tên *</label>
                <Input 
                  placeholder="Nhập tên của bạn" 
                  {...form.register("name")}
                  className={form.formState.errors.name ? "border-destructive" : ""}
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-sm mt-1.5">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Số Điện Thoại *</label>
                  <Input 
                    placeholder="090..." 
                    {...form.register("phone")}
                    className={form.formState.errors.phone ? "border-destructive" : ""}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-destructive text-sm mt-1.5">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email (Tùy chọn)</label>
                  <Input 
                    placeholder="email@example.com" 
                    {...form.register("email")}
                    className={form.formState.errors.email ? "border-destructive" : ""}
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1.5">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nội dung yêu cầu *</label>
                <Textarea 
                  placeholder="Bạn cần tư vấn máy in loại nào? Hay số lượng giấy in cần lấy?" 
                  {...form.register("message")}
                  className={form.formState.errors.message ? "border-destructive" : ""}
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-sm mt-1.5">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : (
                  <>
                    Gửi Thông Tin <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
