"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Liên Hệ & Báo Giá</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Để lại thông tin để nhận tư vấn miễn phí và báo giá tốt nhất từ đội ngũ chuyên gia của chúng tôi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              {[
                {
                  icon: "📍",
                  title: "Địa Chỉ",
                  content: "123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh",
                },
                {
                  icon: "📞",
                  title: "Điện Thoại",
                  content: "0909 123 456",
                  href: "tel:0909123456",
                },
                {
                  icon: "✉️",
                  title: "Email",
                  content: "info@thermalprint.vn",
                  href: "mailto:info@thermalprint.vn",
                },
                {
                  icon: "🕐",
                  title: "Giờ Làm Việc",
                  content: "Thứ 2 - Thứ 7: 8:00 - 18:00",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 mb-0.5">{item.title}</div>
                    {item.href ? (
                      <a href={item.href} className="text-blue-600 hover:underline">
                        {item.content}
                      </a>
                    ) : (
                      <div className="text-gray-600">{item.content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
              <h3 className="font-bold text-blue-900 mb-2">🎁 Ưu Đãi Đặc Biệt</h3>
              <ul className="space-y-1.5 text-sm text-blue-800">
                <li>✓ Miễn phí lắp đặt và cài đặt tại TP.HCM</li>
                <li>✓ Tặng cuộn giấy dùng thử khi mua máy in</li>
                <li>✓ Chiết khấu 5-15% cho đơn hàng số lượng lớn</li>
                <li>✓ Bảo hành tận nơi trong vòng 12 tháng</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Đã gửi thành công!</h3>
                <p className="text-gray-600">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 30 phút.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-600 font-semibold hover:underline"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Gửi Yêu Cầu Tư Vấn</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ Tên *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Điện Thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0909 123 456"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sản Phẩm Quan Tâm</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    <option value="">-- Chọn sản phẩm --</option>
                    <option value="may-in-hoa-don">Máy In Hóa Đơn</option>
                    <option value="may-in-nhan">Máy In Nhãn Mã Vạch</option>
                    <option value="may-in-cam-tay">Máy In Cầm Tay</option>
                    <option value="giay-in-nhiet">Giấy In Nhiệt</option>
                    <option value="phu-kien">Phụ Kiện</option>
                    <option value="khac">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nội Dung</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mô tả nhu cầu của bạn, số lượng cần mua..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
                >
                  Gửi Yêu Cầu Tư Vấn
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
