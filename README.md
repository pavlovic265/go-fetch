
# Go Error

Wrapper around fetch API to handle data and errors, errors are handled similar to go lang as it was used for inspiration


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

