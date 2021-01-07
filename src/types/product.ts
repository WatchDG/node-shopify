export type ProductId = number;
export type ProductVariantId = number;
export type ProductTitle = string;
export type ProductVendor = string;
export type ProductType = string;
export type ProductTags = string[];

export type Product = {
  id: ProductId;
};

export type CreateProduct = {
  title: ProductTitle;
  body_html: string;
  vendor: ProductVendor;
  product_type: ProductType;
  tags?: ProductTags;
};

export type UpdateProduct = {
  title?: ProductTitle;
};


export type ProductListingId = number;
export type ProductListing = {
  id: ProductListingId;
};