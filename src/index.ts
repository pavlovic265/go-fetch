import { asError, isError } from "catch-unknown";


type InferAwaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type InferResponse<T> = T extends (...params: any) => infer R ? InferAwaited<R> : T

type FetchErrType = { err: Error; originalError: unknown, response: undefined }
type FetchDataType<T> = { err: undefined; originalError: unknown, response: T }

type FetchReturnType<T> = FetchDataType<T> | FetchErrType;



export async function goFetch<T>(callbackPromise: Promise<T>): Promise<InferResponse<FetchReturnType<T>>> {
  try {
    const response = await callbackPromise;
    return { response, err: undefined, originalError: undefined };
  } catch (err) {
    if (isError(err)) {
      return { response: undefined, err, originalError: err };
    }
    return { response: undefined, err: asError(err), originalError: err };
  }
}





