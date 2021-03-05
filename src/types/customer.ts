export type CustomerId = number;
export type CustomerEmail = string;
export type CustomerFirstName = string;
export type CustomerLastName = string;
export type CustomerPhone = string;

export type Customer = {
  email: CustomerEmail;
  first_name: CustomerFirstName;
  last_name: CustomerLastName;
  phone: CustomerPhone;
};

export type UpdateCustomer = {
  email?: CustomerEmail;
  first_name?: CustomerFirstName;
  last_name?: CustomerLastName;
  phone?: CustomerPhone;
};
