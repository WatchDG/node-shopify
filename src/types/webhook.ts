export type WebHookId = number;
type WebHookTopic = string;
type WebHookAddress = string;
type WebHookFormat = 'json' | 'xml';

export type WebHookCreate = {
  topic: WebHookTopic;
  address: WebHookAddress;
  format: WebHookFormat;
};
