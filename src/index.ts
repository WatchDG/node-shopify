import { Result, ResultOk, tryCatchWrapperAsync } from 'node-result';
import { HttpInstance } from 'http-instance';

import { CarrierServiceId, CarrierService, CarrierServicesCreate } from './types/carrier_service';
import { ScriptTag, ScriptTagCreate, ScriptTagId } from './types/script_tag';
import { WebHookId, WebHookCreate } from './types/webhook';
import { Shop } from './types/shop';
import { OrderId, UpdateOrder, OrderMetafieldId } from './types/order';
import { CheckoutCreate, CheckoutUpdate, CheckoutToken, Checkout, CheckoutShippingRates } from './types/checkout';

export class Shopify {
  private readonly instance: HttpInstance;

  constructor(baseUrl: string, timeout = 1000) {
    this.instance = new HttpInstance({
      baseUrl,
      timeout
    });
  }

  @tryCatchWrapperAsync
  async getShop(): Promise<Result<Error, Shop>> {
    type rT = { shop: Shop };
    const url = '/admin/api/2020-10/shop.json';
    const {
      data: { shop }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(shop);
  }

  @tryCatchWrapperAsync
  async getCarrierServices(): Promise<Result<Error, CarrierService[]>> {
    type rT = { carrier_services: CarrierService[] };
    const url = '/admin/api/2020-10/carrier_services.json';
    const {
      data: { carrier_services }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(carrier_services);
  }

  @tryCatchWrapperAsync
  async createCarrierService(carrierServicesCreate: CarrierServicesCreate): Promise<Result<Error, CarrierService>> {
    type rT = { carrier_service: CarrierService };
    const url = '/admin/api/2020-10/carrier_services.json';
    const payload = {
      carrier_service: carrierServicesCreate
    };
    const {
      data: { carrier_service }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk(carrier_service);
  }

  @tryCatchWrapperAsync
  async getCarrierService(id: CarrierServiceId): Promise<Result<Error, CarrierService>> {
    type rT = { carrier_service: CarrierService };
    const url = `/admin/api/2020-10/carrier_services/${id}.json`;
    const {
      data: { carrier_service }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(carrier_service);
  }

  @tryCatchWrapperAsync
  async deleteCarrierService(id: CarrierServiceId): Promise<Result<Error, null>> {
    const url = `/admin/api/2020-10/carrier_services/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getScriptTags(): Promise<Result<Error, ScriptTag[]>> {
    type rT = { script_tags: ScriptTag[] };
    const url = '/admin/api/2020-07/script_tags.json';
    const {
      data: { script_tags }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(script_tags);
  }

  @tryCatchWrapperAsync
  async createScriptTag(scriptTagCreate: ScriptTagCreate): Promise<Result<Error, ScriptTag>> {
    type rT = { script_tag: ScriptTag };
    const url = '/admin/api/2020-07/script_tags.json';
    const payload = {
      script_tag: scriptTagCreate
    };
    const {
      data: { script_tag }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk(script_tag);
  }

  @tryCatchWrapperAsync
  async getScriptTag(id: ScriptTagId): Promise<Result<Error, ScriptTag>> {
    type rT = { script_tag: ScriptTag };
    const url = `/admin/api/2020-10/script_tags/${id}.json`;
    const {
      data: { script_tag }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(script_tag);
  }

  @tryCatchWrapperAsync
  async deleteScriptTag(id: ScriptTagId): Promise<Result<Error, ScriptTag>> {
    const url = `/admin/api/2020-10/script_tags/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getWebHooks() {
    type rT = { webhooks: object };
    const url = '/admin/api/2020-10/webhooks.json';
    const {
      data: { webhooks }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(webhooks);
  }

  @tryCatchWrapperAsync
  async createWebHook(webHookCreate: WebHookCreate) {
    type rT = { webhook: object };
    const url = '/admin/api/2020-10/webhooks.json';
    const payload = {
      webhook: webHookCreate
    };
    const {
      data: { webhook }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk(webhook);
  }

  @tryCatchWrapperAsync
  async getWebHook(id: WebHookId) {
    type rT = { webhook: object };
    const url = `/admin/api/2019-10/webhooks/${id}.json`;
    const {
      data: { webhook }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(webhook);
  }

  @tryCatchWrapperAsync
  async deleteWebHook(id: WebHookId): Promise<Result<Error, null>> {
    const url = `/admin/api/2020-10/webhooks/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getOrders(options = {}) {
    type rT = { orders: object[] };
    const url = '/admin/api/2020-10/orders.json';
    const {
      data: { orders }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(orders);
  }

  @tryCatchWrapperAsync
  async getOrder(id: OrderId) {
    type rT = { order: object };
    const url = `/admin/api/2020-10/orders/${id}.json`;
    const {
      data: { order }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(order);
  }

  @tryCatchWrapperAsync
  async updateOrder(id, updateData: UpdateOrder) {
    const url = `/admin/api/2020-10/orders/${id}.json`;
    const order = Object.assign({ id }, updateData);
    const payload = {
      order
    };
    (await this.instance.put(url, payload)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async deleteOrder(id: OrderId) {
    const url = `/admin/api/2020-10/orders/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getOrderMetafields(id: OrderId) {
    type rT = { metafields: object[] };
    const url = `/admin/orders/${id}/metafields.json`;
    const {
      data: { metafields }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(metafields);
  }

  @tryCatchWrapperAsync
  async getOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId) {
    type rT = { metafield: object };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const {
      data: { metafield }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(metafield);
  }

  @tryCatchWrapperAsync
  async updateOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId, updateOrderMetafield: object) {
    type rT = { metafield: object };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const payload = {
      metafield: Object.assign({ id: metafieldId }, updateOrderMetafield)
    };
    const {
      data: { metafield }
    } = (await this.instance.put<rT>(url, payload)).unwrap();
    return ResultOk(metafield);
  }

  @tryCatchWrapperAsync
  async deleteOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId) {
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async createCheckout(checkoutCreate: CheckoutCreate): Promise<Result<Error, Checkout>> {
    type rT = { checkout: Checkout };
    const url = '/admin/api/2020-10/checkouts.json';
    const payload = {
      checkout: checkoutCreate
    };
    const {
      data: { checkout }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk(checkout);
  }

  @tryCatchWrapperAsync
  async getCheckout(checkoutToken: CheckoutToken): Promise<Result<Error, Checkout>> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}.json`;
    const {
      data: { checkout }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(checkout);
  }

  @tryCatchWrapperAsync
  async getCheckoutShippingRates(checkoutToken: CheckoutToken): Promise<Result<Error, CheckoutShippingRates[]>> {
    type rT = { shipping_rates: CheckoutShippingRates[] };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}/shipping_rates.json`;
    const {
      data: { shipping_rates }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(shipping_rates);
  }

  @tryCatchWrapperAsync
  async updateCheckout(checkoutToken: CheckoutToken, checkoutUpdate: CheckoutUpdate): Promise<Result<Error, Checkout>> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}.json`;
    const payload = {
      checkout: Object.assign(checkoutUpdate, { token: checkoutToken })
    };
    const {
      data: { checkout }
    } = (await this.instance.put<rT>(url, payload)).unwrap();
    return ResultOk(checkout);
  }

  @tryCatchWrapperAsync
  async completeCheckout(checkoutToken: CheckoutToken): Promise<Result<Error, Checkout>> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}/complete.json`;
    const {
      data: { checkout }
    } = (await this.instance.post<rT>(url)).unwrap();
    return ResultOk(checkout);
  }

  @tryCatchWrapperAsync
  async getProducts() {
    type rT = { products: object[] };
    const url = '/admin/api/2020-10/products.json';
    const {
      data: { products }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(products);
  }

  @tryCatchWrapperAsync
  async getProductsCount(): Promise<Result<Error, number>> {
    type rT = { count: number };
    const url = '/admin/api/2020-10/products/count.json';
    const {
      data: { count }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(count);
  }

  @tryCatchWrapperAsync
  async getProductListings() {
    type rT = { product_listings: object[] };
    const url = '/admin/api/2021-01/product_listings.json';
    const {
      data: { product_listings }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product_listings);
  }

  @tryCatchWrapperAsync
  async getProductListingIds() {
    type rT = { product_ids: number[] };
    const url = '/admin/api/2021-01/product_listings/product_ids.json';
    const {
      data: { product_ids }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product_ids);
  }

  @tryCatchWrapperAsync
  async createProductListing(productId: number) {
    type rT = { product_listing: object };
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    const payload = {
      product_listing: {
        product_id: productId
      }
    };
    const {
      data: { product_listing }
    } = (await this.instance.put<rT>(url, payload)).unwrap();
    return ResultOk(product_listing);
  }

  @tryCatchWrapperAsync
  async getProductListing(productId: number) {
    type rT = { product_listing: object };
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    const {
      data: { product_listing }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product_listing);
  }

  @tryCatchWrapperAsync
  async deleteProductListing(productId: number): Promise<Result<Error, null>> {
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }
}
