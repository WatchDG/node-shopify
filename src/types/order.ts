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

export type UpdateOrder = UpdateOrderTags | UpdateOrderNote | UpdateOrderEmail | UpdateOrderPhone;

export type OrderMetafieldId = number;
