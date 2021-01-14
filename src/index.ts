import { ResultOK, ResultFAIL, ResultOk, ResultFail, tryCatchWrapperAsync } from 'node-result';
import { HttpInstance } from 'http-instance';

import { CarrierServiceId, CarrierService, CreateCarrierServices } from './types/carrier_service';
import { ScriptTag, CreateScriptTag, ScriptTagId } from './types/script_tag';
import { WebHook, WebHookId, CreateWebHook } from './types/webhook';
import { Shop } from './types/shop';
import { Order, OrderId, UpdateOrder, OrderMetafield, OrderMetafieldId, UpdateOrderMetafield } from './types/order';
import { CreateCheckout, UpdateCheckout, CheckoutToken, Checkout, CheckoutShippingRates } from './types/checkout';
import {
  ProductId,
  Product,
  CreateProduct,
  UpdateProduct,
  ProductListing,
  ProductVariantId,
  CreateProductVariant,
  ProductVariant
} from './types/product';

type ReturnAsync<T> = Promise<ResultOK<T> | ResultFAIL<Error>>;

export class Shopify {
  private readonly instance: HttpInstance;

  constructor(baseUrl: string, timeout = 1000) {
    this.instance = new HttpInstance({
      baseUrl,
      timeout
    });
  }

  @tryCatchWrapperAsync
  async getApiToken(
    appApiKey: string,
    appSecret: string,
    code: string
  ): Promise<ResultOK<{ accessToken: string; scope: string[] }> | ResultFAIL<Error>> {
    type rT = {
      access_token: string;
      scope: string;
    };
    const url = '/admin/oauth/access_token';
    const payload = {
      client_id: appApiKey,
      client_secret: appSecret,
      code
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    const { access_token, scope } = data;
    return ResultOk({
      accessToken: access_token,
      scope: scope.split(',')
    });
  }

  @tryCatchWrapperAsync
  async getShop(): Promise<ResultOK<Shop> | ResultFAIL<Error>> {
    type rT = { shop: Shop };
    const url = '/admin/api/2020-10/shop.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.shop);
  }

  @tryCatchWrapperAsync
  async getCarrierServices(): Promise<ResultOK<CarrierService[]> | ResultFAIL<Error>> {
    type rT = { carrier_services: CarrierService[] };
    const url = '/admin/api/2020-10/carrier_services.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.carrier_services);
  }

  @tryCatchWrapperAsync
  async createCarrierService(
    carrierServicesCreate: CreateCarrierServices
  ): Promise<ResultOK<CarrierService> | ResultFAIL<Error>> {
    type rT = { carrier_service: CarrierService };
    const url = '/admin/api/2020-10/carrier_services.json';
    const payload = {
      carrier_service: carrierServicesCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.carrier_service);
  }

  @tryCatchWrapperAsync
  async getCarrierService(id: CarrierServiceId): Promise<ResultOK<CarrierService> | ResultFAIL<Error>> {
    type rT = { carrier_service: CarrierService };
    const url = `/admin/api/2020-10/carrier_services/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.carrier_service);
  }

  @tryCatchWrapperAsync
  async deleteCarrierService(id: CarrierServiceId): ReturnAsync<null> {
    const url = `/admin/api/2020-10/carrier_services/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getScriptTags(): ReturnAsync<ScriptTag[]> {
    type rT = { script_tags: ScriptTag[] };
    const url = '/admin/api/2020-07/script_tags.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.script_tags);
  }

  @tryCatchWrapperAsync
  async createScriptTag(scriptTagCreate: CreateScriptTag): ReturnAsync<ScriptTag> {
    type rT = { script_tag: ScriptTag };
    const url = '/admin/api/2020-07/script_tags.json';
    const payload = {
      script_tag: scriptTagCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.script_tag);
  }

  @tryCatchWrapperAsync
  async getScriptTag(id: ScriptTagId): ReturnAsync<ScriptTag> {
    type rT = { script_tag: ScriptTag };
    const url = `/admin/api/2020-10/script_tags/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.script_tag);
  }

  @tryCatchWrapperAsync
  async deleteScriptTag(id: ScriptTagId): ReturnAsync<null> {
    const url = `/admin/api/2020-10/script_tags/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getWebHooks(): ReturnAsync<WebHook[]> {
    type rT = { webhooks: WebHook[] };
    const url = '/admin/api/2020-10/webhooks.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.webhooks);
  }

  @tryCatchWrapperAsync
  async createWebHook(webHookCreate: CreateWebHook): ReturnAsync<WebHook> {
    type rT = { webhook: WebHook };
    const url = '/admin/api/2020-10/webhooks.json';
    const payload = {
      webhook: webHookCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.webhook);
  }

  @tryCatchWrapperAsync
  async getWebHook(id: WebHookId): ReturnAsync<WebHook> {
    type rT = { webhook: WebHook };
    const url = `/admin/api/2019-10/webhooks/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.webhook);
  }

  @tryCatchWrapperAsync
  async deleteWebHook(id: WebHookId): ReturnAsync<null> {
    const url = `/admin/api/2020-10/webhooks/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getOrders(): ReturnAsync<Order[]> {
    type rT = { orders: Order[] };
    const url = '/admin/api/2020-10/orders.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.orders);
  }

  @tryCatchWrapperAsync
  async getOrder(id: OrderId): ReturnAsync<Order> {
    type rT = { order: Order };
    const url = `/admin/api/2020-10/orders/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.order);
  }

  @tryCatchWrapperAsync
  async updateOrder(id: OrderId, updateOrder: UpdateOrder): ReturnAsync<null> {
    const url = `/admin/api/2020-10/orders/${id}.json`;
    const order = Object.assign({ id }, updateOrder);
    const payload = {
      order
    };
    (await this.instance.put(url, payload)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async deleteOrder(id: OrderId): ReturnAsync<null> {
    const url = `/admin/api/2020-10/orders/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getOrderMetafields(id: OrderId): ReturnAsync<OrderMetafield[]> {
    type rT = { metafields: OrderMetafield[] };
    const url = `/admin/orders/${id}/metafields.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.metafields);
  }

  @tryCatchWrapperAsync
  async getOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId): ReturnAsync<OrderMetafield> {
    type rT = { metafield: OrderMetafield };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.metafield);
  }

  @tryCatchWrapperAsync
  async updateOrderMetafield(
    orderId: OrderId,
    metafieldId: OrderMetafieldId,
    updateOrderMetafield: UpdateOrderMetafield
  ): ReturnAsync<OrderMetafield> {
    type rT = { metafield: OrderMetafield };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const payload = {
      metafield: Object.assign({ id: metafieldId }, updateOrderMetafield)
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.metafield);
  }

  @tryCatchWrapperAsync
  async deleteOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId): ReturnAsync<null> {
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async createCheckout(checkoutCreate: CreateCheckout): ReturnAsync<Checkout> {
    type rT = { checkout: Checkout };
    const url = '/admin/api/2020-10/checkouts.json';
    const payload = {
      checkout: checkoutCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.checkout);
  }

  @tryCatchWrapperAsync
  async getCheckout(checkoutToken: CheckoutToken): ReturnAsync<Checkout> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.checkout);
  }

  @tryCatchWrapperAsync
  async getCheckoutShippingRates(checkoutToken: CheckoutToken): ReturnAsync<CheckoutShippingRates[]> {
    type rT = { shipping_rates: CheckoutShippingRates[] };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}/shipping_rates.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.shipping_rates);
  }

  @tryCatchWrapperAsync
  async updateCheckout(checkoutToken: CheckoutToken, checkoutUpdate: UpdateCheckout): ReturnAsync<Checkout> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}.json`;
    const payload = {
      checkout: Object.assign(checkoutUpdate, { token: checkoutToken })
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.checkout);
  }

  @tryCatchWrapperAsync
  async completeCheckout(checkoutToken: CheckoutToken): ReturnAsync<Checkout> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/2020-10/checkouts/${checkoutToken}/complete.json`;
    const { data } = (await this.instance.post<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.checkout);
  }

  /**
   * get products
   */
  @tryCatchWrapperAsync
  async getProducts(): ReturnAsync<Product[]> {
    type rT = { products: Product[] };
    const url = '/admin/api/2020-10/products.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.products);
  }

  /**
   * get products count
   */
  @tryCatchWrapperAsync
  async getProductsCount(): ReturnAsync<number> {
    type rT = { count: number };
    const url = '/admin/api/2020-10/products/count.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.count);
  }

  /**
   * get product by product id
   * @param productId - product id
   */
  @tryCatchWrapperAsync
  async getProduct(productId: ProductId): ReturnAsync<Product> {
    type rT = { product: Product };
    const url = `/admin/api/2021-01/products/${productId}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product);
  }

  /**
   * create new product
   * @param createProduct - product create object
   */
  @tryCatchWrapperAsync
  async createProduct(createProduct: CreateProduct): ReturnAsync<Product> {
    type rT = { product: Product };
    const url = '/admin/api/2021-01/products.json';
    const payload = { product: createProduct };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product);
  }

  /**
   * update product
   * @param productId - product id
   * @param updateProduct - product update object
   */
  @tryCatchWrapperAsync
  async updateProduct(productId: ProductId, updateProduct: UpdateProduct): ReturnAsync<Product> {
    type rT = { product: Product };
    const url = `/admin/api/2021-01/products/${productId}.json`;
    const payload = { product: Object.assign({ id: productId }, updateProduct) };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product);
  }

  /**
   * delete product by product id
   * @param productId - product id
   */
  @tryCatchWrapperAsync
  async deleteProduct(productId: ProductId): ReturnAsync<null> {
    type rT = Record<string, never>;
    const url = `DELETE /admin/api/2021-01/products/${productId}.json`;
    (await this.instance.delete<rT>(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getProductListings(): ReturnAsync<ProductListing[]> {
    type rT = { product_listings: ProductListing[] };
    const url = '/admin/api/2021-01/product_listings.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product_listings);
  }

  @tryCatchWrapperAsync
  async getProductListingIds(): ReturnAsync<ProductId[]> {
    type rT = { product_ids: ProductId[] };
    const url = '/admin/api/2021-01/product_listings/product_ids.json';
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product_ids);
  }

  @tryCatchWrapperAsync
  async createProductListing(productId: ProductId): ReturnAsync<ProductListing> {
    type rT = { product_listing: ProductListing };
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    const payload = {
      product_listing: {
        product_id: productId
      }
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product_listing);
  }

  @tryCatchWrapperAsync
  async getProductListing(productId: ProductId): ReturnAsync<ProductListing> {
    type rT = { product_listing: ProductListing };
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.product_listing);
  }

  @tryCatchWrapperAsync
  async deleteProductListing(productId: ProductId): ReturnAsync<null> {
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async createProductVariant(
    productId: ProductId,
    createProductVariant: CreateProductVariant
  ): ReturnAsync<ProductVariant> {
    type rT = { variant: ProductVariant };
    const payload = {
      variant: createProductVariant
    };
    const url = `/admin/api/2021-01/products/632910392/variants.json`;
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return ResultFail(new Error('Response without data.'));
    }
    return ResultOk(data.variant);
  }

  @tryCatchWrapperAsync
  async deleteProductVariant(productId: ProductId, productVariantId: ProductVariantId): ReturnAsync<null> {
    const url = `/admin/api/2021-01/products/${productId}/variants/${productVariantId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }
}
