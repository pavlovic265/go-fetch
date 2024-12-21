
# Go Error

Wrapper around fetch API to handle data and errors, errors are handled similarly to GoLang as it was used as inspiration


## Usage/Examples

```typescript
type Product = {
  id: number;
  title: string
}

async function example() {
  const {response: fetchProducts, err: fetchProductsErr} = await goFetch(fetch('https://dummyjson.com/products'))
  if(fetchProductsErr!== undefined) {
    // handle err
    return
  }

  const {response: resProducts, err: resProductsErr} = await goFetch<Products[]>(fetchProducts.json())
  if(resProductsErr!== undefined) {
    // handle err
    return;
  }

  // handle products
  console.log("resProducts", resProducts)

  const { response: fetchProduct, err: fetchProductErr }  = await goFetch(fetch(`https://dummyjson.com/products/${jsonData.products[0].id}`);
  if (fetchProductErr != undefined) {
    // handle err
    return
  }

  const {response: resProduct, err: resProductErr} = await goFetch<Products>(fetchProduct.json())
  if(resProductErr !== undefined) {
    // handle err
    return;
  }

  // handle product
  console.log("resProduct", resProduct)
}
```

