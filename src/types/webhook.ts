export type WebHookId = number;
export type WebHookTopic =
  | 'orders/create'
  | 'orders/cancelled'
  | 'orders/fulfilled'
  | 'orders/paid'
  | 'orders/partially_fulfilled'
  | 'orders/updated'
  | 'orders/delete';
export type WebHookAddress = string;
export type WebhookFormat = 'json' | 'xml';

export type WebHook = {
  id: WebHookId;
};

export type CreateWebHook = {
  topic: WebHookTopic;
  address: WebHookAddress;
  format: WebhookFormat;
};
