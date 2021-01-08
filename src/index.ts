import { Result, ResultOk, tryCatchWrapperAsync } from 'node-result';
import { HttpInstance } from 'http-instance';

import { CarrierServiceId, CarrierService, CreateCarrierServices } from './types/carrier_service';
import { ScriptTag, CreateScriptTag, ScriptTagId } from './types/script_tag';
import { WebHook, WebHookId, CreateWebHook } from './types/webhook';
import { Shop } from './types/shop';
import { Order, OrderId, UpdateOrder, OrderMetafield, OrderMetafieldId, UpdateOrderMetafield } from './types/order';
import { CreateCheckout, UpdateCheckout, CheckoutToken, Checkout, CheckoutShippingRates } from './types/checkout';
import { ProductId, Product, CreateProduct, UpdateProduct, ProductListing } from './types/product';

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
  ): Promise<Result<Error, { accessToken: string; scope: string[] }>> {
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
    const {
      data: { access_token, scope }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk({
      accessToken: access_token,
      scope: scope.split(',')
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
  async createCarrierService(carrierServicesCreate: CreateCarrierServices): Promise<Result<Error, CarrierService>> {
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
  async createScriptTag(scriptTagCreate: CreateScriptTag): Promise<Result<Error, ScriptTag>> {
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
  async getWebHooks(): Promise<Result<Error, WebHook[]>> {
    type rT = { webhooks: WebHook[] };
    const url = '/admin/api/2020-10/webhooks.json';
    const {
      data: { webhooks }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(webhooks);
  }

  @tryCatchWrapperAsync
  async createWebHook(webHookCreate: CreateWebHook): Promise<Result<Error, WebHook>> {
    type rT = { webhook: WebHook };
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
  async getWebHook(id: WebHookId): Promise<Result<Error, WebHook>> {
    type rT = { webhook: WebHook };
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
  async getOrders(): Promise<Result<Error, Order[]>> {
    type rT = { orders: Order[] };
    const url = '/admin/api/2020-10/orders.json';
    const {
      data: { orders }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(orders);
  }

  @tryCatchWrapperAsync
  async getOrder(id: OrderId): Promise<Result<Error, Order>> {
    type rT = { order: Order };
    const url = `/admin/api/2020-10/orders/${id}.json`;
    const {
      data: { order }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(order);
  }

  @tryCatchWrapperAsync
  async updateOrder(id: OrderId, updateData: UpdateOrder): Promise<Result<Error, null>> {
    const url = `/admin/api/2020-10/orders/${id}.json`;
    const order = Object.assign({ id }, updateData);
    const payload = {
      order
    };
    (await this.instance.put(url, payload)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async deleteOrder(id: OrderId): Promise<Result<Error, null>> {
    const url = `/admin/api/2020-10/orders/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getOrderMetafields(id: OrderId): Promise<Result<Error, OrderMetafield[]>> {
    type rT = { metafields: OrderMetafield[] };
    const url = `/admin/orders/${id}/metafields.json`;
    const {
      data: { metafields }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(metafields);
  }

  @tryCatchWrapperAsync
  async getOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId): Promise<Result<Error, OrderMetafield>> {
    type rT = { metafield: OrderMetafield };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const {
      data: { metafield }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(metafield);
  }

  @tryCatchWrapperAsync
  async updateOrderMetafield(
    orderId: OrderId,
    metafieldId: OrderMetafieldId,
    updateOrderMetafield: UpdateOrderMetafield
  ): Promise<Result<Error, OrderMetafield>> {
    type rT = { metafield: OrderMetafield };
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
  async deleteOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId): Promise<Result<Error, null>> {
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async createCheckout(checkoutCreate: CreateCheckout): Promise<Result<Error, Checkout>> {
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
  async updateCheckout(checkoutToken: CheckoutToken, checkoutUpdate: UpdateCheckout): Promise<Result<Error, Checkout>> {
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

  /**
   * get products
   */
  @tryCatchWrapperAsync
  async getProducts(): Promise<Result<Error, Product[]>> {
    type rT = { products: Product[] };
    const url = '/admin/api/2020-10/products.json';
    const {
      data: { products }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(products);
  }

  /**
   * get products count
   */
  @tryCatchWrapperAsync
  async getProductsCount(): Promise<Result<Error, number>> {
    type rT = { count: number };
    const url = '/admin/api/2020-10/products/count.json';
    const {
      data: { count }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(count);
  }

  /**
   * get product by product id
   * @param productId - product id
   */
  @tryCatchWrapperAsync
  async getProduct(productId: ProductId): Promise<Result<Error, Product>> {
    type rT = { product: Product };
    const url = `/admin/api/2021-01/products/${productId}.json`;
    const {
      data: { product }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product);
  }

  /**
   * create new product
   * @param createProduct - product create object
   */
  @tryCatchWrapperAsync
  async createProduct(createProduct: CreateProduct): Promise<Result<Error, Product>> {
    type rT = { product: Product };
    const url = '/admin/api/2021-01/products.json';
    const payload = { product: createProduct };
    const {
      data: { product }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk(product);
  }

  /**
   * update product
   * @param productId - product id
   * @param updateProduct - product update object
   */
  @tryCatchWrapperAsync
  async updateProduct(productId: ProductId, updateProduct: UpdateProduct): Promise<Result<Error, Product>> {
    type rT = { product: Product };
    const url = `/admin/api/2021-01/products/${productId}.json`;
    const payload = { product: Object.assign({ id: productId }, updateProduct) };
    const {
      data: { product }
    } = (await this.instance.post<rT>(url, payload)).unwrap();
    return ResultOk(product);
  }

  /**
   * delete product by product id
   * @param productId - product id
   */
  @tryCatchWrapperAsync
  async deleteProduct(productId: ProductId): Promise<Result<Error, null>> {
    type rT = Record<string, never>;
    const url = `DELETE /admin/api/2021-01/products/${productId}.json`;
    (await this.instance.delete<rT>(url)).unwrap();
    return ResultOk(null);
  }

  @tryCatchWrapperAsync
  async getProductListings(): Promise<Result<Error, ProductListing[]>> {
    type rT = { product_listings: ProductListing[] };
    const url = '/admin/api/2021-01/product_listings.json';
    const {
      data: { product_listings }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product_listings);
  }

  @tryCatchWrapperAsync
  async getProductListingIds(): Promise<Result<Error, ProductId[]>> {
    type rT = { product_ids: ProductId[] };
    const url = '/admin/api/2021-01/product_listings/product_ids.json';
    const {
      data: { product_ids }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product_ids);
  }

  @tryCatchWrapperAsync
  async createProductListing(productId: ProductId): Promise<Result<Error, ProductListing>> {
    type rT = { product_listing: ProductListing };
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
  async getProductListing(productId: ProductId): Promise<Result<Error, ProductListing>> {
    type rT = { product_listing: ProductListing };
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    const {
      data: { product_listing }
    } = (await this.instance.get<rT>(url)).unwrap();
    return ResultOk(product_listing);
  }

  @tryCatchWrapperAsync
  async deleteProductListing(productId: ProductId): Promise<Result<Error, null>> {
    const url = `/admin/api/2021-01/product_listings/${productId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ResultOk(null);
  }
}
