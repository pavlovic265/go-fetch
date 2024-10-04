
# Go Errro

Wrapper around fetch API to handle errors similar like go lang go lang way


## Usage/Examples

```typescript
type Product = {
  id: number;
  title: string
}

async function test() {
  const { err, jsonData } = await goFetch<Product[]>("https://dummyjson.com/products");
  if (err !== undefined) {
    // handle error
    return;
  }

  const { err: err1, jsonData: jsonData1 } = await goFetch<Product>(`https://dummyjson.com/products/${jsonData[0].id}`);
  if (err1 != undefined) {
    // handle error
    return
  }
  console.log(jsonData1)
  
}
```

