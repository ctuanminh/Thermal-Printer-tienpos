"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart, Trash2, Plus, Minus, CreditCard,
  Truck, CheckCircle2, ChevronRight, Phone, ArrowLeft,
} from "lucide-react";

type PaymentMethod = "bank" | "cod";

const BANK_INFO = {
  bank: "Vietcombank",
  account: "1234567890",
  name: "CONG TY TNHH THERMAL PRINT",
  branch: "Chi nhánh TP.HCM",
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [note, setNote] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const shippingFee = totalPrice > 5000000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center shadow-lg border-border">
          <CardContent className="pt-12 pb-10 px-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Đặt Hàng Thành Công!</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.
            </p>
            {payment === "bank" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Thông tin chuyển khoản
                </p>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>Ngân hàng: <span className="font-semibold">{BANK_INFO.bank}</span></p>
                  <p>Số TK: <span className="font-semibold font-mono">{BANK_INFO.account}</span></p>
                  <p>Chủ TK: <span className="font-semibold">{BANK_INFO.name}</span></p>
                  <p>Chi nhánh: {BANK_INFO.branch}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/products">Tiếp Tục Mua Hàng</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Về Trang Chủ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Giỏ hàng</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" /> Giỏ Hàng
            </h1>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-7xl mb-5">🛒</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-8">Thêm sản phẩm vào giỏ để tiếp tục mua hàng.</p>
          <Button asChild size="lg">
            <Link href="/products">Xem Sản Phẩm</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Giỏ hàng</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" /> Giỏ Hàng
              <Badge variant="secondary" className="ml-1">{totalItems}</Badge>
            </h1>
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <Link href="/products" className="flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Tiếp tục mua
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Sản phẩm ({items.length})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/80 text-xs"
                    onClick={clearCart}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Xóa tất cả
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-0 divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex items-start gap-4">
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl">
                        {item.product.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-primary font-medium mb-0.5">
                          {item.product.brand} · {item.product.category}
                        </div>
                        <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-primary whitespace-nowrap">
                              {(item.product.priceNumber * item.quantity).toLocaleString("vi-VN")} VNĐ
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">Thông Tin Giao Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Họ và tên <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Số điện thoại <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="0909 123 456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Địa chỉ giao hàng <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ghi chú đơn hàng</label>
                  <Input
                    placeholder="Ghi chú cho người giao hàng..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">Phương Thức Thanh Toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === "cod"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                    className="mt-0.5 w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-foreground text-sm">Thanh Toán Khi Nhận Hàng (COD)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Thanh toán bằng tiền mặt khi nhận hàng. Kiểm tra hàng trước khi nhận.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === "bank"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={payment === "bank"}
                    onChange={() => setPayment("bank")}
                    className="mt-0.5 w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-foreground text-sm">Chuyển Khoản Ngân Hàng</span>
                      <Badge variant="secondary" className="text-xs">Ưu đãi</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Giảm thêm 1% khi thanh toán chuyển khoản. Đơn hàng xử lý nhanh hơn.
                    </p>
                    {payment === "bank" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1">
                        <p className="text-xs font-semibold text-blue-800">Thông tin tài khoản:</p>
                        <p className="text-xs text-blue-700">Ngân hàng: <span className="font-semibold">{BANK_INFO.bank}</span></p>
                        <p className="text-xs text-blue-700">Số TK: <span className="font-mono font-semibold">{BANK_INFO.account}</span></p>
                        <p className="text-xs text-blue-700">Chủ TK: <span className="font-semibold">{BANK_INFO.name}</span></p>
                        <p className="text-xs text-blue-700 mt-1 font-medium">Nội dung: [SĐT] + Đặt hàng ThermalPrint</p>
                      </div>
                    )}
                  </div>
                </label>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <Card className="border-border sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">Tóm Tắt Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2 flex-1">
                        {item.product.name.split(" ").slice(0, 4).join(" ")}
                        <span className="ml-1 text-xs">x{item.quantity}</span>
                      </span>
                      <span className="font-medium text-foreground whitespace-nowrap">
                        {(item.product.priceNumber * item.quantity).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tạm tính</span>
                    <span>{totalPrice.toLocaleString("vi-VN")} VNĐ</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phí vận chuyển</span>
                    <span>{shippingFee === 0 ? <span className="text-green-600 font-medium">Miễn phí</span> : `${shippingFee.toLocaleString("vi-VN")}đ`}</span>
                  </div>
                  {payment === "bank" && (
                    <div className="flex justify-between text-green-600 text-xs">
                      <span>Giảm chuyển khoản (1%)</span>
                      <span>-{Math.round(totalPrice * 0.01).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  {totalPrice <= 5000000 && (
                    <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                      💡 Mua thêm {(5000000 - totalPrice).toLocaleString("vi-VN")}đ để miễn phí ship
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-base">
                  <span>Tổng cộng</span>
                  <span className="text-primary">
                    {(
                      finalTotal -
                      (payment === "bank" ? Math.round(totalPrice * 0.01) : 0)
                    ).toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-2 font-semibold"
                  onClick={handleOrder}
                >
                  Đặt Hàng Ngay
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                  <Phone className="w-3.5 h-3.5" />
                  Hỗ trợ: <a href="tel:0909123456" className="text-primary font-medium">0909 123 456</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
