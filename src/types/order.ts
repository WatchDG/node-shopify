export type OrderId = number;
export type OrderNote = string;
export type OrderTags = string;
export type OrderEmail = string;
export type OrderPhone = string;

export type UpdateOrderTags = {
  tags: OrderTags;
};

export type UpdateOrderNote = {
  note: OrderNote;
};

export type UpdateOrderEmail = {
  email: OrderEmail;
};

export type UpdateOrderPhone = {
  phone: OrderPhone;
};

export type UpdateOrderShippingAddress = {
  shipping_address: {
    city?: string;
    address1?: string;
    address2?: string;
  };
};

export type UpdateOrder =
  | UpdateOrderTags
  | UpdateOrderNote
  | UpdateOrderEmail
  | UpdateOrderPhone
  | UpdateOrderShippingAddress;

export type OrderMetafieldId = number;
