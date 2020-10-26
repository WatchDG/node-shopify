export type CarrierServicesId = number;
export type CarrierServicesName = string;
export type CarrierServicesCallbackUrl = string;
export type CarrierServicesServiceDiscovery = boolean;
export type CarrierServicesActive = boolean;
export type CarrierServiceType = 'api';
export type CarrierServiceFormat = 'json';
export type CarrierServiceAdminGraphqlApiId = string;

export type CarrierServicesCreate = {
  name: CarrierServicesName;
  callback_url: CarrierServicesCallbackUrl;
  service_discovery: CarrierServicesServiceDiscovery;
};

export type CarrierService = {
  id: CarrierServicesId;
  name: CarrierServicesName;
  active: CarrierServicesActive;
  service_discovery: CarrierServicesServiceDiscovery;
  carrier_service_type: CarrierServiceType;
  admin_graphql_api_id: CarrierServiceAdminGraphqlApiId;
  format: CarrierServiceFormat;
  callback_url: CarrierServicesCallbackUrl;
};
