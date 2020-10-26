export type ScriptTagId = number;
type ScriptTagEvent = 'onload';
type ScriptTagSrc = string;
type ScriptTagCreatedAt = string;
type ScriptTagUpdatedAt = string;
type ScriptTagDisplayScope = 'all';

export type ScriptTagCreate = {
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
