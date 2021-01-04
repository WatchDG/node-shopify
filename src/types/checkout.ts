export type CheckoutEmail = string;
export type CheckoutToken = string;
export type Checkout = {
  created_at: string;
  currency: string;
  presentment_currency: string;
  customer_locale: string;
  token: CheckoutToken;
  email: CheckoutEmail | null;
};

export type CheckoutShippingRates = object;

export type CheckoutCreateLineItem = {
  variant_id: number;
  quantity: number;
};
export type CheckoutCreate = {
  line_items?: CheckoutCreateLineItem[];
  email?: CheckoutEmail;
};

export type CheckoutUpdate = {
  email?: CheckoutEmail;
  shipping_address?: object;
};
