import Axios, { AxiosInstance } from 'axios';
import { ResultOk, ResultFail, ResultOK, ResultFAIL } from 'node-result';

import { CarrierServiceId, CarrierService, CarrierServicesCreate } from './types/carrier_service';
import { ScriptTag, ScriptTagCreate, ScriptTagId } from './types/script_tag';
import { WebHookId, WebHookCreate } from './types/webhook';
import { Shop } from './types/shop';
import { OrderId, UpdateOrder, OrderMetafieldId } from './types/order';

export class Shopify {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string, timeout = 1000, headers = {}) {
    this.instance = Axios.create({ baseURL, timeout, headers });
  }

  async getShop(): Promise<ResultOK<Shop> | ResultFAIL<Error>> {
    try {
      const {
        data: { shop },
      } = await this.instance.get('/admin/api/2020-10/shop.json ');
      return ResultOk(shop);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCarrierServices(): Promise<ResultOK<CarrierService[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { carrier_services },
      } = await this.instance.get('/admin/api/2020-10/carrier_services.json');
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
      } = await this.instance.post('/admin/api/2020-10/carrier_services.json', payload);
      return ResultOk(carrier_service);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCarrierService(id: CarrierServiceId): Promise<ResultOK<CarrierService> | ResultFAIL<Error>> {
    try {
      const {
        data: { carrier_service },
      } = await this.instance.get(`/admin/api/2020-10/carrier_services/${id}.json`);
      return ResultOk(carrier_service);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteCarrierService(id: CarrierServiceId): Promise<ResultOK<null> | ResultFAIL<Error>> {
    try {
      await this.instance.delete(`/admin/api/2020-10/carrier_services/${id}.json`);
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getScriptTags(): Promise<ResultOK<ScriptTag[]> | ResultFAIL<Error>> {
    try {
      const {
        data: { script_tags },
      } = await this.instance.get('/admin/api/2020-07/script_tags.json');
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
      } = await this.instance.post('/admin/api/2020-07/script_tags.json', payload);
      return ResultOk(script_tag);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getScriptTag(id: ScriptTagId): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      const {
        data: { script_tag },
      } = await this.instance.get(`/admin/api/2020-10/script_tags/${id}.json`);
      return ResultOk(script_tag);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteScriptTag(id: ScriptTagId): Promise<ResultOK<ScriptTag> | ResultFAIL<Error>> {
    try {
      await this.instance.delete(`/admin/api/2020-10/script_tags/${id}.json`);
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getWebHooks() {
    try {
      const {
        data: { webhooks },
      } = await this.instance.get('/admin/api/2020-10/webhooks.json');
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
      } = await this.instance.post('/admin/api/2020-10/webhooks.json', payload);
      return ResultOk(webhook);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getWebHook(id: WebHookId) {
    try {
      const {
        data: { webhook },
      } = await this.instance.get(`/admin/api/2019-10/webhooks/${id}.json`);
      return ResultOk(webhook);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteWebHook(id: WebHookId): Promise<ResultOK<null> | ResultFAIL<Error>> {
    try {
      await this.instance.delete(`/admin/api/2020-10/webhooks/${id}.json`);
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrders(options = {}) {
    try {
      const {
        data: { orders },
      } = await this.instance.get('/admin/api/2020-10/orders.json?status=any');
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
      } = await this.instance.get(url);
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
      await this.instance.put(url, payload);
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteOrder(id: OrderId) {
    try {
      const url = `/admin/api/2020-10/orders/${id}.json`;
      await this.instance.delete(url);
      return ResultOk(null);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrderMetafields(id: OrderId) {
    try {
      const {
        data: { metafields },
      } = await this.instance.get(`/admin/orders/${id}/metafields.json`);
      return ResultOk(metafields);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId) {
    try {
      const {
        data: { metafield },
      } = await this.instance.get(`/admin/orders/${orderId}/metafields/${metafieldId}.json`);
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
      } = await this.instance.put(`/admin/orders/${orderId}/metafields/${metafieldId}.json`, payload);
      return ResultOk(metafield);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async deleteOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId) {
    try {
      await this.instance.delete(`/admin/orders/${orderId}/metafields/${metafieldId}.json`);
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
      } = await this.instance.post('/admin/api/2020-10/checkouts.json', payload);
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getCheckout(checkoutToken: CheckoutToken): Promise<ResultOK<Checkout> | ResultFAIL<Error>> {
    try {
      const {
        data: { checkout },
      } = await this.instance.get(`/admin/api/2020-10/checkouts/${checkoutToken}.json`);
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
      } = await this.instance.get(`/admin/api/2020-10/checkouts/${checkoutToken}/shipping_rates.json`);
      return ResultOk(shipping_rates);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async updateCheckout(checkoutToken: CheckoutToken, checkoutUpdate: CheckoutUpdate) {
    try {
      const payload = {
        checkout: Object.assign(checkoutUpdate, { token: checkoutToken }),
      };
      const {
        data: { checkout },
      } = await this.instance.put(`/admin/api/2020-10/checkouts/${checkoutToken}.json`, payload);
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async completeCheckout(checkoutToken: CheckoutToken) {
    try {
      const {
        data: { checkout },
      } = await this.instance.post(`/admin/api/2020-10/checkouts/${checkoutToken}/complete.json`);
      return ResultOk(checkout);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getProducts() {
    try {
      const {
        data: { products },
      } = await this.instance.get('/admin/api/2020-10/products.json');
      return ResultOk(products);
    } catch (error) {
      return ResultFail(error);
    }
  }

  async getProductsCount(): Promise<ResultOK<number> | ResultFAIL<Error>> {
    try {
      const {
        data: { count },
      } = await this.instance.get('/admin/api/2020-10/products/count.json');
      return ResultOk(count);
    } catch (error) {
      return ResultFail(error);
    }
  }
}
