export type ScriptTagId = number;
export type ScriptTagEvent = 'onload';
export type ScriptTagSrc = string;
export type ScriptTagCreatedAt = string;
export type ScriptTagUpdatedAt = string;
export type ScriptTagDisplayScope = 'all';

export type CreateScriptTag = {
  event: ScriptTagEvent;
  src: ScriptTagSrc;
};

export type ScriptTag = {
  id: ScriptTagId;
  src: ScriptTagSrc;
  event: ScriptTagEvent;
  created_at: ScriptTagCreatedAt;
  updated_at: ScriptTagUpdatedAt;
  display_scope: ScriptTagDisplayScope;
};
