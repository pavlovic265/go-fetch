type ErrType = { err: Error; originalError: unknown, jsonData: undefined; fetchResponse: undefined }
type DataType<T> = { err: undefined; originalError: unknown, jsonData: T, fetchResponse: Response }
type FetchReturnType<T> = DataType<T> | ErrType;
type FetchParamsType = Parameters<typeof fetch>;

export async function goFetch<T>(...param: FetchParamsType): Promise<FetchReturnType<T>> {
  try {
    const response = await fetch(...param);
    response
    const jsonData: T = await response.json();
    return { jsonData, fetchResponse: response, err: undefined, originalError: undefined };
  } catch (err) {
    if (isError(err)) {
      return { err, originalError: err, jsonData: undefined, fetchResponse: undefined };
    }
    return { err: asError(err), originalError: err, jsonData: undefined, fetchResponse: undefined };
  }
}



type Product = {
  id: number;
  title: string
}


async function test() {
  const { err, jsonData } = await goFetch<{ products: Product[] }>("https://dummyjson.com/products");
  err
  jsonData
  if (err !== undefined) {
    // handle error
    return;
  }
  err
  jsonData.products
}

async function test1() {
  const { err, jsonData } = await goFetch<{ products: Product[] }>("https://dummyjson.com/products");
  err
  jsonData
  if (err !== undefined) {
    return;
  }
  err
  jsonData.products
}


function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null;
}

function getObjectMessage(obj: Record<string, unknown>): string {
  if (typeof obj.message === 'string') {
    return obj.message;
  }
  if (obj.toString !== Object.prototype.toString) {
    return obj.toString();
  }
  try {
    return JSON.stringify(obj);
  } catch {
    return String(obj);
  }
}

export function isError(err: unknown): err is Error {
  return (
    isObject(err) &&
    typeof err.name === 'string' &&
    typeof err.message === 'string' &&
    (!('stack' in err) || typeof err.stack === 'string')
  );
}

export function asError(err: unknown): Error {
  if (isError(err)) return err;
  const error = new Error(isObject(err) ? getObjectMessage(err) : String(err));
  error.name = (isObject(err) && err.constructor.name) || typeof err;
  return error;
}
