import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Tiêu đề",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Đường dẫn (slug)",
      required: true,
      unique: true,
      admin: {
        description: "Đường dẫn URL, ví dụ: may-in-nhiet-epson-2024",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Mô tả ngắn",
      admin: {
        description: "Hiển thị ở trang danh sách tin tức",
      },
    },
    {
      name: "thumbnail",
      type: "relationship",
      relationTo: "media",
      label: "Ảnh đại diện",
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Ngày đăng",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "status",
      type: "select",
      label: "Trạng thái",
      defaultValue: "published",
      options: [
        { label: "Đã đăng", value: "published" },
        { label: "Bản nháp", value: "draft" },
      ],
    },
    {
      name: "content",
      type: "richText",
      label: "Nội dung",
    },
  ],
};
