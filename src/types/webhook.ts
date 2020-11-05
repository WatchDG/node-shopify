export type WebHookId = number;
type WebHookTopic =
  | 'orders/create'
  | 'orders/cancelled'
  | 'orders/fulfilled'
  | 'orders/paid'
  | 'orders/partially_fulfilled'
  | 'orders/updated'
  | 'orders/delete';
type WebHookAddress = string;
type WebHookFormat = 'json' | 'xml';

export type WebHookCreate = {
  topic: WebHookTopic;
  address: WebHookAddress;
  format: WebHookFormat;
};
