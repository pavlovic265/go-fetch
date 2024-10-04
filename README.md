
# Go Errro

Wrapper around fetch API to handle errors similar like go lang go lang way


## Usage/Examples

```typescript
type Product = {
  id: number;
  title: string
}

async function example() {
  const { err: productsError, jsonData: products } = await goFetch<Product[]>("https://dummyjson.com/products");
  if (productsError !== undefined) {
    // handle products error
    return;
  }
  // handle products

  const { err: productsError, jsonData: product } = await goFetch<Product>(`https://dummyjson.com/products/${jsonData[0].id}`);
  if (productsError != undefined) {
    // handle products error
    return
  }
  // handle product

}
```

