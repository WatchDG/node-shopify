export type CheckoutEmail = string;
export type CheckoutToken = string;
export type CheckoutWebUrl = string;
export type Checkout = {
  created_at: string;
  currency: string;
  presentment_currency: string;
  customer_locale: string;
  token: CheckoutToken;
  email: CheckoutEmail | null;
  web_url: CheckoutWebUrl;
};

export type CheckoutShippingRates = Record<string, never>;

export type CheckoutCreateLineItem = {
  variant_id: number;
  quantity: number;
};
export type CreateCheckout = {
  line_items?: CheckoutCreateLineItem[];
  email?: CheckoutEmail;
};

export type CheckoutUpdateShippingAddress = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  province_code?: string;
  country?: string;
  country_code?: string;
  zip?: string;
};

export type UpdateCheckout = {
  email?: CheckoutEmail;
  shipping_address?: CheckoutUpdateShippingAddress;
};
