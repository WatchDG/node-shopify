export type OrderId = number;
export type OrderNote = string;
export type OrderTags = string;
export type OrderEmail = string;
export type OrderPhone = string;

export type UpdateOrderTags = {
  id: OrderId;
  tags: OrderTags;
};

export type UpdateOrderNote = {
  id: OrderId;
  note: OrderNote;
};

export type UpdateOrderEmail = {
  id: OrderId;
  email: OrderEmail;
};

export type UpdateOrderPhone = {
  id: OrderId;
  phone: OrderPhone;
};

export type UpdateOrder = UpdateOrderTags | UpdateOrderNote | UpdateOrderEmail | UpdateOrderPhone;
