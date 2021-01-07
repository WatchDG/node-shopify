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
type WebhookFormat = 'json' | 'xml';

export type WebHook = {
  id: WebHookId;
};

export type CreateWebHook = {
  topic: WebHookTopic;
  address: WebHookAddress;
  format: WebhookFormat;
};
