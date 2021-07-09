import { ok, fail, tryCatchAsync, TResultAsync } from 'node-result';
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
  ProductVariant,
  CreateProductImage
} from './types/product';
import { Customer, CustomerId, UpdateCustomer } from './types/customer';

const API_VERSION = '2021-07';

export class Shopify {
  private readonly instance: HttpInstance;

  constructor(baseUrl: string, timeout = 1000) {
    this.instance = new HttpInstance({
      baseUrl,
      timeout
    });
  }

  @tryCatchAsync
  async getApiToken(
    appApiKey: string,
    appSecret: string,
    code: string
  ): TResultAsync<{ accessToken: string; scope: string[] }, Error> {
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
      return fail(new Error('Response without data.'));
    }
    const { access_token, scope } = data;
    return ok({
      accessToken: access_token,
      scope: scope.split(',')
    });
  }

  @tryCatchAsync
  async getShop(): TResultAsync<Shop, Error> {
    type rT = { shop: Shop };
    const url = `/admin/api/${API_VERSION}/shop.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.shop);
  }

  @tryCatchAsync
  async getCarrierServices(): TResultAsync<CarrierService[], Error> {
    type rT = { carrier_services: CarrierService[] };
    const url = `/admin/api/${API_VERSION}/carrier_services.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.carrier_services);
  }

  @tryCatchAsync
  async createCarrierService(createCarrierServices: CreateCarrierServices): TResultAsync<CarrierService, Error> {
    type rT = { carrier_service: CarrierService };
    const url = `/admin/api/${API_VERSION}/carrier_services.json`;
    const payload = {
      carrier_service: createCarrierServices
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.carrier_service);
  }

  @tryCatchAsync
  async getCarrierService(id: CarrierServiceId): TResultAsync<CarrierService, Error> {
    type rT = { carrier_service: CarrierService };
    const url = `/admin/api/${API_VERSION}/carrier_services/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.carrier_service);
  }

  @tryCatchAsync
  async deleteCarrierService(id: CarrierServiceId): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/carrier_services/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async getScriptTags(): TResultAsync<ScriptTag[], Error> {
    type rT = { script_tags: ScriptTag[] };
    const url = `/admin/api/${API_VERSION}/script_tags.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.script_tags);
  }

  @tryCatchAsync
  async createScriptTag(scriptTagCreate: CreateScriptTag): TResultAsync<ScriptTag, Error> {
    type rT = { script_tag: ScriptTag };
    const url = `/admin/api/${API_VERSION}/script_tags.json`;
    const payload = {
      script_tag: scriptTagCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.script_tag);
  }

  @tryCatchAsync
  async getScriptTag(id: ScriptTagId): TResultAsync<ScriptTag, Error> {
    type rT = { script_tag: ScriptTag };
    const url = `/admin/api/${API_VERSION}/script_tags/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.script_tag);
  }

  @tryCatchAsync
  async deleteScriptTag(id: ScriptTagId): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/script_tags/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async getWebHooks(): TResultAsync<WebHook[], Error> {
    type rT = { webhooks: WebHook[] };
    const url = `/admin/api/${API_VERSION}/webhooks.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.webhooks);
  }

  @tryCatchAsync
  async createWebHook(webHookCreate: CreateWebHook): TResultAsync<WebHook, Error> {
    type rT = { webhook: WebHook };
    const url = `/admin/api/${API_VERSION}/webhooks.json`;
    const payload = {
      webhook: webHookCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.webhook);
  }

  @tryCatchAsync
  async getWebHook(id: WebHookId): TResultAsync<WebHook, Error> {
    type rT = { webhook: WebHook };
    const url = `/admin/api/${API_VERSION}/webhooks/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.webhook);
  }

  @tryCatchAsync
  async deleteWebHook(id: WebHookId): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/webhooks/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async getOrders(): TResultAsync<Order[], Error> {
    type rT = { orders: Order[] };
    const url = `/admin/api/${API_VERSION}/orders.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.orders);
  }

  @tryCatchAsync
  async getOrder(id: OrderId): TResultAsync<Order, Error> {
    type rT = { order: Order };
    const url = `/admin/api/${API_VERSION}/orders/${id}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.order);
  }

  @tryCatchAsync
  async updateOrder(id: OrderId, updateOrder: UpdateOrder): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/orders/${id}.json`;
    const order = Object.assign({ id }, updateOrder);
    const payload = {
      order
    };
    (await this.instance.put(url, payload)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async deleteOrder(id: OrderId): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/orders/${id}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async getOrderMetafields(id: OrderId): TResultAsync<OrderMetafield[], Error> {
    type rT = { metafields: OrderMetafield[] };
    const url = `/admin/orders/${id}/metafields.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.metafields);
  }

  @tryCatchAsync
  async getOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId): TResultAsync<OrderMetafield, Error> {
    type rT = { metafield: OrderMetafield };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.metafield);
  }

  @tryCatchAsync
  async updateOrderMetafield(
    orderId: OrderId,
    metafieldId: OrderMetafieldId,
    updateOrderMetafield: UpdateOrderMetafield
  ): TResultAsync<OrderMetafield, Error> {
    type rT = { metafield: OrderMetafield };
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    const payload = {
      metafield: Object.assign({ id: metafieldId }, updateOrderMetafield)
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.metafield);
  }

  @tryCatchAsync
  async deleteOrderMetafield(orderId: OrderId, metafieldId: OrderMetafieldId): TResultAsync<null, Error> {
    const url = `/admin/orders/${orderId}/metafields/${metafieldId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async createCheckout(checkoutCreate: CreateCheckout): TResultAsync<Checkout, Error> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/${API_VERSION}/checkouts.json`;
    const payload = {
      checkout: checkoutCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.checkout);
  }

  @tryCatchAsync
  async getCheckout(checkoutToken: CheckoutToken): TResultAsync<Checkout, Error> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/${API_VERSION}/checkouts/${checkoutToken}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.checkout);
  }

  @tryCatchAsync
  async getCheckoutShippingRates(checkoutToken: CheckoutToken): TResultAsync<CheckoutShippingRates[], Error> {
    type rT = { shipping_rates: CheckoutShippingRates[] };
    const url = `/admin/api/${API_VERSION}/checkouts/${checkoutToken}/shipping_rates.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.shipping_rates);
  }

  @tryCatchAsync
  async updateCheckout(checkoutToken: CheckoutToken, checkoutUpdate: UpdateCheckout): TResultAsync<Checkout, Error> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/${API_VERSION}/checkouts/${checkoutToken}.json`;
    const payload = {
      checkout: Object.assign(checkoutUpdate, { token: checkoutToken })
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.checkout);
  }

  @tryCatchAsync
  async completeCheckout(checkoutToken: CheckoutToken): TResultAsync<Checkout, Error> {
    type rT = { checkout: Checkout };
    const url = `/admin/api/${API_VERSION}/checkouts/${checkoutToken}/complete.json`;
    const { data } = (await this.instance.post<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.checkout);
  }

  @tryCatchAsync
  async getProducts(): TResultAsync<Product[], Error> {
    type rT = { products: Product[] };
    const url = `/admin/api/${API_VERSION}/products.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.products);
  }

  @tryCatchAsync
  async getProductsCount(): TResultAsync<number, Error> {
    type rT = { count: number };
    const url = `/admin/api/${API_VERSION}/products/count.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.count);
  }

  @tryCatchAsync
  async getProduct(productId: ProductId): TResultAsync<Product, Error> {
    type rT = { product: Product };
    const url = `/admin/api/${API_VERSION}/products/${productId}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product);
  }

  @tryCatchAsync
  async createProduct(createProduct: CreateProduct): TResultAsync<Product, Error> {
    type rT = { product: Product };
    const url = `/admin/api/${API_VERSION}/products.json`;
    const payload = { product: createProduct };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product);
  }

  @tryCatchAsync
  async updateProduct(productId: ProductId, updateProduct: UpdateProduct): TResultAsync<Product, Error> {
    type rT = { product: Product };
    const url = `/admin/api/${API_VERSION}/products/${productId}.json`;
    const payload = { product: Object.assign({ id: productId }, updateProduct) };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product);
  }

  @tryCatchAsync
  async deleteProduct(productId: ProductId): TResultAsync<null, Error> {
    type rT = Record<string, never>;
    const url = `/admin/api/${API_VERSION}/products/${productId}.json`;
    (await this.instance.delete<rT>(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async getProductListings(): TResultAsync<ProductListing[], Error> {
    type rT = { product_listings: ProductListing[] };
    const url = `/admin/api/${API_VERSION}/product_listings.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product_listings);
  }

  @tryCatchAsync
  async getProductListingIds(): TResultAsync<ProductId[], Error> {
    type rT = { product_ids: ProductId[] };
    const url = `/admin/api/${API_VERSION}/product_listings/product_ids.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product_ids);
  }

  @tryCatchAsync
  async createProductListing(productId: ProductId): TResultAsync<ProductListing, Error> {
    type rT = { product_listing: ProductListing };
    const url = `/admin/api/${API_VERSION}/product_listings/${productId}.json`;
    const payload = {
      product_listing: {
        product_id: productId
      }
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product_listing);
  }

  @tryCatchAsync
  async getProductListing(productId: ProductId): TResultAsync<ProductListing, Error> {
    type rT = { product_listing: ProductListing };
    const url = `/admin/api/${API_VERSION}/product_listings/${productId}.json`;
    const { data } = (await this.instance.get<rT>(url)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product_listing);
  }

  @tryCatchAsync
  async deleteProductListing(productId: ProductId): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/product_listings/${productId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async createProductVariant(
    productId: ProductId,
    createProductVariant: CreateProductVariant
  ): TResultAsync<ProductVariant, Error> {
    type rT = { variant: ProductVariant };
    const payload = {
      variant: createProductVariant
    };
    const url = `/admin/api/${API_VERSION}/products/${productId}/variants.json`;
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.variant);
  }

  @tryCatchAsync
  async deleteProductVariant(productId: ProductId, productVariantId: ProductVariantId): TResultAsync<null, Error> {
    const url = `/admin/api/${API_VERSION}/products/${productId}/variants/${productVariantId}.json`;
    (await this.instance.delete(url)).unwrap();
    return ok(null);
  }

  @tryCatchAsync
  async createProductImage(productId: ProductId, productImageCreate: CreateProductImage): TResultAsync<Product, Error> {
    type rT = { product: Product };
    const url = `/admin/api/${API_VERSION}/products/${productId}/images.json`;
    const payload = {
      image: productImageCreate
    };
    const { data } = (await this.instance.post<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.product);
  }

  @tryCatchAsync
  async updateCustomer(customerId: CustomerId, updateCustomer: UpdateCustomer): TResultAsync<Customer, Error> {
    type rT = { customer: Customer };
    const url = `/admin/api/${API_VERSION}/customers/${customerId}.json`;
    const payload = {
      customer: Object.assign({ id: customerId }, updateCustomer)
    };
    const { data } = (await this.instance.put<rT>(url, payload)).unwrap();
    if (!data) {
      return fail(new Error('Response without data.'));
    }
    return ok(data.customer);
  }
}
