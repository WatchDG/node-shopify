# node-shopify

node-shopify

## checkout

### create checkout

```ts
import {Shopify} from 'node-shopify';

(async () => {
    const accessLogin = 'xxx';
    const accessPassword = 'shpat_yyy';
    const url = 'example.myshopify.com'
    const shopify = new Shopify(`https://${accessLogin}:${accessToken}@${url}`, 5000);
    //
    const checkout = (await shopify.createCheckout({
        email: 'user@example.com'
    })).unwrap();
})();
```

## product

### get products

```ts
import {Shopify} from 'node-shopify';

(async () => {
    const accessLogin = 'xxx';
    const accessPassword = 'shpat_yyy';
    const url = 'example.myshopify.com'
    const shopify = new Shopify(`https://${accessLogin}:${accessToken}@${url}`, 5000);
    //
    const products = (await shopify.getProducts()).unwrap();
})();
```

### get products count

```ts
import {Shopify} from 'node-shopify';

(async () => {
    const accessLogin = 'xxx';
    const accessPassword = 'shpat_yyy';
    const url = 'example.myshopify.com'
    const shopify = new Shopify(`https://${accessLogin}:${accessToken}@${url}`, 5000);
    //
    const productsCount = (await shopify.getProductsCount()).unwrap();
})();
```