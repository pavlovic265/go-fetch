
# Go Error

Wrapper around fetch API to handle data and errors, errors are handled similarly to GoLang as it was used as inspiration


## Usage/Examples

```typescript
type Product = {
  id: number;
  title: string
}

async function example() {
  const { err: productsErr, toJson: productsToJson  } = await goFetch<{ products: Product[] }>("https://dummyjson.com/products");
  if (productsErr !== undefined) {
    // handle products error
    return;
  }
  const { err: productsJsonErr, josnData: productsData } = await productsToJson()
  if (productsJsonErr !== undefined) {
    // handle products json error
    return;
  }

  // handle products
  console.log("products", jsonData.products)

  const { err: productErr, toJson: productToJson } = await goFetch<Product>(`https://dummyjson.com/products/${jsonData.products[0].id}`);
  if (productErr != undefined) {
    // handle product error
    return
  }

  const { err: productsJsonErr, josnData: productData } = await productToJson()
  if (productJsonErr != undefined) {
    // handle product json error
    return
  }

  // handle product
  console.log("productData", productData)
}
```

