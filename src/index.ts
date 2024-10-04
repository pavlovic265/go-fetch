import { asError, isError } from "catch-unknown";

type ErrType = { err: Error; originalError: unknown, jsonData: undefined; fetchResponse: undefined }
type DataType<T> = { err: undefined; originalError: unknown, jsonData: T, fetchResponse: Response }
type FetchReturnType<T> = DataType<T> | ErrType;
type FetchParamsType = Parameters<typeof fetch>;

export async function goFetch<T>(...param: FetchParamsType): Promise<FetchReturnType<T>> {
  try {
    const response = await fetch(...param);
    const jsonData: T = await response.json();
    return { jsonData, fetchResponse: response, err: undefined, originalError: undefined };
  } catch (err) {
    if (isError(err)) {
      return { err, originalError: err, jsonData: undefined, fetchResponse: undefined };
    }
    return { err: asError(err), originalError: err, jsonData: undefined, fetchResponse: undefined };
  }
}

