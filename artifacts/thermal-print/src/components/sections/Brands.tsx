const brands = [
  { name: "EPSON", description: "Thương hiệu Nhật Bản hàng đầu" },
  { name: "CITIZEN", description: "Máy in hóa đơn chuyên nghiệp" },
  { name: "BIXOLON", description: "Công nghệ Hàn Quốc tiên tiến" },
  { name: "ZEBRA", description: "Chuyên gia in nhãn mã vạch" },
  { name: "TSC", description: "Máy in nhãn giá tốt" },
  { name: "DATALOGIC", description: "Thiết bị mã vạch công nghiệp" },
];

export default function Brands() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Thương Hiệu Đối Tác</h2>
          <p className="text-gray-600">
            Chúng tôi là đại lý chính thức của các thương hiệu máy in nhiệt uy tín toàn cầu
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="font-black text-xl text-gray-700 group-hover:text-blue-700 transition-colors tracking-tight mb-1">
                {brand.name}
              </div>
              <div className="text-xs text-gray-400">{brand.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Tất cả sản phẩm đều có{" "}
            <span className="font-semibold text-blue-600">tem bảo hành chính hãng</span> và{" "}
            <span className="font-semibold text-blue-600">hóa đơn VAT</span>
          </p>
        </div>
      </div>
    </section>
  );
}
