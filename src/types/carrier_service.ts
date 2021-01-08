export type CarrierServiceId = number;
export type CarrierServiceName = string;
export type CarrierServiceCallbackUrl = string;
export type CarrierServiceServiceDiscovery = boolean;
export type CarrierServiceActive = boolean;
export type CarrierServiceType = 'api';
export type CarrierServiceFormat = 'json';
export type CarrierServiceAdminGraphqlApiId = string;

export type CreateCarrierServices = {
  name: CarrierServiceName;
  callback_url: CarrierServiceCallbackUrl;
  service_discovery: CarrierServiceServiceDiscovery;
};

export type CarrierService = {
  id: CarrierServiceId;
  name: CarrierServiceName;
  active: CarrierServiceActive;
  service_discovery: CarrierServiceServiceDiscovery;
  carrier_service_type: CarrierServiceType;
  admin_graphql_api_id: CarrierServiceAdminGraphqlApiId;
  format: CarrierServiceFormat;
  callback_url: CarrierServiceCallbackUrl;
};
