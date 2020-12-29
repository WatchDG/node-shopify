type CheckoutEmail = string;
type CheckoutToken = string;
type Checkout = {
  created_at: string;
  currency: string;
  presentment_currency: string;
  customer_locale: string;
  token: CheckoutToken;
  email: CheckoutEmail | null;
};

type CheckoutShippingRates = object;

type CheckoutCreateLineItem = {
  variant_id: number;
  quantity: number;
};
type CheckoutCreate = {
  line_items?: CheckoutCreateLineItem[];
  email?: CheckoutEmail;
};

type CheckoutUpdate = {
  email?: CheckoutEmail;
  shipping_address?: object;
};
