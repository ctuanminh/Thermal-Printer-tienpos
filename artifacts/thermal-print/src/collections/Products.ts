import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên sản phẩm",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô tả ngắn",
    },
    {
      name: "content",
      type: "richText",
      label: "Mô tả chi tiết",
    },
    {
      name: "price",
      type: "number",
      label: "Giá (VNĐ)",
    },
    {
      name: "priceText",
      type: "text",
      label: "Hiển thị giá (vd: 2.850.000 VNĐ)",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Danh mục",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Hình ảnh",
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Sản phẩm nổi bật",
      defaultValue: false,
    },
    {
      name: "inStock",
      type: "checkbox",
      label: "Còn hàng",
      defaultValue: true,
    },
    {
      name: "specs",
      type: "array",
      label: "Thông số kỹ thuật",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Tên",
        },
        {
          name: "value",
          type: "text",
          label: "Giá trị",
        },
      ],
    },
  ],
};
