import { ResultOk, ResultFail, ResultOK, ResultFAIL } from 'node-result';
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
      timeout,
    });
  }

  async getShop(): Promise<ResultOK<Shop> | ResultFAIL<Error>> {
    try {
      const {
        data: { shop },
      } = (await this.instance.get<{ shop: Shop }>('/admin/api/2020-10/shop.json')).unwrap();
      return ResultOk(shop);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCarrierServices(): Promise<ResultOK<CarrierService[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { carrier_services },
      } = (
        await this.instance.get<{ carrier_services: CarrierService[] }>('/admin/api/2020-10/carrier_services.json')
      ).unwrap();
      return ResultOk(carrier_services);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createCarrierService(
    carrierServicesCreate: CarrierServicesCreate,
  ): Promise<ResultOK<CarrierService> | ResultFAIL<Error>> {
    try {
      const payload = {
        carrier_service: carrierServicesCreate,
      };
      const {
        data: { carrier_service },
      } = (
        await this.instance.post<{ carrier_service: CarrierService }>(
          '/admin/api/2020-10/carrier_services.json',
          payload,
        )
      ).unwrap();
      return ResultOk(carrier_service);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCarrierService(id: CarrierServiceId): Promise<ResultOK<CarrierService> | ResultFAIL<Error>> {
    try {
      const {
        data: { carrier_service },
      } = (
        await this.instance.get<{ carrier_service: CarrierService }>(`/admin/api/2020-10/carrier_services/${id}.json`)
      ).unwrap();
      return ResultOk(carrier_service);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteCarrierService(id: CarrierServiceId): Promise<ResultOK<null> | ResultFAIL<Error>> {
    try {
      (await this.instance.delete(`/admin/api/2020-10/carrier_services/${id}.json`)).unwrap();
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getScriptTags(): Promise<ResultOK<ScriptTag[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { script_tags },
      } = (await this.instance.get<{ script_tags: ScriptTag[] }>('/admin/api/2020-07/script_tags.json')).unwrap();
      return ResultOk(script_tags);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createScriptTag(scriptTagCreate: ScriptTagCreate): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      const payload = {
        script_tag: scriptTagCreate,
      };
      const {
        data: { script_tag },
      } = (
        await this.instance.post<{ script_tag: ScriptTag }>('/admin/api/2020-07/script_tags.json', payload)
      ).unwrap();
      return ResultOk(script_tag);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getScriptTag(id: ScriptTagId): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      const {
        data: { script_tag },
      } = (await this.instance.get<{ script_tag: ScriptTag }>(`/admin/api/2020-10/script_tags/${id}.json`)).unwrap();
      return ResultOk(script_tag);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteScriptTag(id: ScriptTagId): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      (await this.instance.delete(`/admin/api/2020-10/script_tags/${id}.json`)).unwrap();
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getWebHooks() {
    try {
      const {
        data: { webhooks },
      } = (await this.instance.get<{ webhooks: object }>('/admin/api/2020-10/webhooks.json')).unwrap();
      return ResultOk(webhooks);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createWebHook(webHookCreate: WebHookCreate) {
    try {
      const payload = {
        webhook: webHookCreate,
      };
      const {
        data: { webhook },
      } = (await this.instance.post<{ webhook: object }>('/admin/api/2020-10/webhooks.json', payload)).unwrap();
      return ResultOk(webhook);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getWebHook(id: WebHookId) {
    try {
      const {
        data: { webhook },
      } = (await this.instance.get<{ webhook: object }>(`/admin/api/2019-10/webhooks/${id}.json`)).unwrap();
      return ResultOk(webhook);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteWebHook(id: WebHookId): Promise<ResultOK<null> | ResultFAIL<Error>> {
    try {
      (await this.instance.delete(`/admin/api/2020-10/webhooks/${id}.json`)).unwrap();
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrders(options = {}) {
    try {
      const {
        data: { orders },
      } = (await this.instance.get<{ orders: object[] }>('/admin/api/2020-10/orders.json?status=any')).unwrap();
      return ResultOk(orders);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrder(id: OrderId) {
    try {
      const url = `/admin/api/2020-10/orders/${id}.json`;
      const {
        data: { order },
      } = (await this.instance.get<{ order: object }>(url)).unwrap();
      return ResultOk(order);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async updateOrder(id, updateData: UpdateOrder) {
    try {
      const order = Object.assign({ id }, updateData);
      const payload = {
        order,
      };
      const url = `/admin/api/2020-10/orders/${id}.json`;
      (await this.instance.put(url, payload)).unwrap();
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteOrder(id: OrderId) {
    try {
      const url = `/admin/api/2020-10/orders/${id}.json`;
      (await this.instance.delete(url)).unwrap();
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrderMetafields(id: OrderId) {
    try {
      const {
        data: { metafields },
      } = (await this.instance.get<{ metafields: object[] }>(`/admin/orders/${id}/metafields.json`)).unwrap();
      return ResultOk(metafields);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId) {
    try {
      const {
        data: { metafield },
      } = (
        await this.instance.get<{ metafield: object }>(`/admin/orders/${orderId}/metafields/${metafieldId}.json`)
      ).unwrap();
      return ResultOk(metafield);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async updateOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId, updateOrderMetafield: object) {
    try {
      const payload = {
        metafield: Object.assign({ id: metafieldId }, updateOrderMetafield),
      };
      const {
        data: { metafield },
      } = (
        await this.instance.put<{ metafield: object }>(
          `/admin/orders/${orderId}/metafields/${metafieldId}.json`,
          payload,
        )
      ).unwrap();
      return ResultOk(metafield);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId) {
    try {
      (await this.instance.delete(`/admin/orders/${orderId}/metafields/${metafieldId}.json`)).unwrap();
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async createCheckout(checkoutCreate: CheckoutCreate): Promise<ResultOK<Checkout> | ResultFAIL<Error>> {
    try {
      const payload = {
        checkout: checkoutCreate,
      };
      const {
        data: { checkout },
      } = (await this.instance.post<{ checkout: Checkout }>('/admin/api/2020-10/checkouts.json', payload)).unwrap();
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCheckout(checkoutToken: CheckoutToken): Promise<ResultOK<Checkout> | ResultFAIL<Error>> {
    try {
      const {
        data: { checkout },
      } = (
        await this.instance.get<{ checkout: Checkout }>(`/admin/api/2020-10/checkouts/${checkoutToken}.json`)
      ).unwrap();
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCheckoutShippingRates(
    checkoutToken: CheckoutToken,
  ): Promise<ResultOK<CheckoutShippingRates[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { shipping_rates },
      } = (
        await this.instance.get<{ shipping_rates: CheckoutShippingRates[] }>(
          `/admin/api/2020-10/checkouts/${checkoutToken}/shipping_rates.json`,
        )
      ).unwrap();
      return ResultOk(shipping_rates);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async updateCheckout(
    checkoutToken: CheckoutToken,
    checkoutUpdate: CheckoutUpdate,
  ): Promise<ResultOK<Checkout> | ResultFAIL<Error>> {
    try {
      const payload = {
        checkout: Object.assign(checkoutUpdate, { token: checkoutToken }),
      };
      const {
        data: { checkout },
      } = (
        await this.instance.put<{ checkout: Checkout }>(`/admin/api/2020-10/checkouts/${checkoutToken}.json`, payload)
      ).unwrap();
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async completeCheckout(checkoutToken: CheckoutToken): Promise<ResultOK<Checkout> | ResultFAIL<Error>> {
    try {
      const {
        data: { checkout },
      } = (
        await this.instance.post<{ checkout: Checkout }>(`/admin/api/2020-10/checkouts/${checkoutToken}/complete.json`)
      ).unwrap();
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getProducts() {
    try {
      const {
        data: { products },
      } = (await this.instance.get<{ products: object[] }>('/admin/api/2020-10/products.json')).unwrap();
      return ResultOk(products);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getProductsCount(): Promise<ResultOK<number> | ResultFAIL<Error>> {
    try {
      const {
        data: { count },
      } = (await this.instance.get<{ count: number }>('/admin/api/2020-10/products/count.json')).unwrap();
      return ResultOk(count);
    } catch (error) {
      return ResultFail(error);
    }
  }
}
