
# Go Error

Wrapper around fetch API to handle data and errors, errors are handled similarly to GoLang as it was used as inspiration


## Usage/Examples

```typescript
type Product = {
  id: number;
  title: string
}

async function example() {
  const { err: productsError, jsonData } = await goFetch<{ products: Product[] }>("https://dummyjson.com/products");
  if (productsError !== undefined) {
    // handle products error
    return;
  }
  // handle products
  console.log("products", jsonData.products)
  const { err: productError, jsonData: product } = await goFetch<Product>(`https://dummyjson.com/products/${jsonData.products[0].id}`);
  if (productError != undefined) {
    // handle products error
    return
  }
  // handle product
  console.log("product", product)
}
```

