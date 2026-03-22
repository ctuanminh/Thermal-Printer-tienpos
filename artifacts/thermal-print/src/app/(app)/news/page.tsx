import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function NewsPage() {
  let articles: any[] = [];

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 20,
    });
    articles = result.docs;
  } catch (e) {
    articles = [];
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Tin tức</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Newspaper className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Tin Tức & Bài Viết</h1>
          </div>
          <p className="text-muted-foreground text-base">
            Cập nhật thông tin mới nhất về máy in nhiệt, giấy in và công nghệ POS.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Chưa có bài viết nào</h3>
            <p className="text-muted-foreground mb-6">
              Hãy thêm tin tức trong trang quản trị Payload CMS.
            </p>
            <Button asChild variant="outline">
              <Link href="/admin">Vào Trang Quản Trị</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{articles.length}</span> bài viết
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card key={article.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200 border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">Tin tức</Badge>
                      {article.publishedAt && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(article.publishedAt)}
                        </div>
                      )}
                    </div>
                    <h2 className="font-bold text-lg text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h2>
                  </CardHeader>

                  {article.excerpt && (
                    <CardContent className="py-0 flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </CardContent>
                  )}

                  <CardFooter className="pt-4 mt-auto">
                    <Separator className="mb-4" />
                    <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto font-medium">
                      <Link href={`/news/${article.slug}`} className="flex items-center gap-1.5">
                        Đọc tiếp
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
