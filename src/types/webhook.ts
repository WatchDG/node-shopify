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
export type WebHookFormat = 'json' | 'xml';
export type WebHookCreatedAt = string;
export type WebHookUpdatedAt = string;
export type WebHookApiVersion = '2021-01';

export type WebHook = {
  id: WebHookId;
  address: WebHookAddress;
  topic: WebHookTopic;
  created_at: WebHookCreatedAt;
  updated_at: WebHookUpdatedAt;
  format: WebHookFormat;
  api_version: WebHookApiVersion;
};

export type CreateWebHook = Pick<WebHook, 'topic' | 'address' | 'format'>;
