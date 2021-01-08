# node-shopify
module for creating Shopify API calls

## install dependencies
```shell
yarn install
# or
npm install 
```

## build
```shell
yarn run build
# or
npm run build
```

## example

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
