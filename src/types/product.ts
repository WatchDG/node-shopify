export type ProductId = number;
export type ProductTitle = string;
export type ProductVendor = string;
export type ProductType = string;
export type ProductTags = string;
export type ProductBodyHtml = string;
export type ProductCreatedAt = string;
export type ProductHandle = string;
export type ProductUpdatedAt = string;
export type ProductPublishedAt = string;
export type ProductStatus = 'active';
export type ProductPublishedScope = 'global';

export type ProductVariantId = number;
export type ProductVariantPrice = string;
export type ProductVariantBarcode = string;
export type ProductVariantGrams = number;
export type ProductVariant = {
  id: ProductVariantId;
  price: ProductVariantPrice;
  barcode: ProductVariantBarcode;
  grams: ProductVariantGrams;
  product_id: ProductId;
};

export type Product = {
  id: ProductId;
  title: ProductTitle;
  body_html: ProductBodyHtml | null;
  vendor: ProductVendor;
  product_type: ProductType;
  created_at: ProductCreatedAt;
  handle: ProductHandle;
  updated_at: ProductUpdatedAt;
  published_at: ProductPublishedAt;
  status: ProductStatus;
  published_scope: ProductPublishedScope;
  tags: ProductTags;
  variants: ProductVariant[];
};

export type CreateProduct = {
  title: ProductTitle;
  body_html?: string;
  vendor?: ProductVendor;
  product_type?: ProductType;
  tags?: string[];
  published?: boolean;
};

export type UpdateProduct = {
  title?: ProductTitle;
};

export type ProductListing = {
  product_id: ProductId;
  created_at: ProductCreatedAt;
  updated_at: ProductUpdatedAt;
  body_html: ProductBodyHtml;
  handle: ProductHandle;
  product_type: ProductType;
  title: ProductTitle;
  vendor: ProductVendor;
  available: boolean;
  tags: ProductTags;
  published_at: ProductPublishedAt;
};

export type CreateProductVariant = {
  title?: string;
  price?: string;
};

export type CreateProductImage = {
  image: {
    attachment?: string;
    filename?: string;
    src?: string;
  };
};
