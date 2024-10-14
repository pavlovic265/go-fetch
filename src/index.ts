import { asError, isError } from "catch-unknown";

type ToJsonErrType = { err: Error; originalError: unknown, jsonData: undefined; fetchResponse: undefined }
type ToJsonDataType<T> = { err: undefined; originalError: unknown, jsonData: T, fetchResponse: Response }
type ToJsonReturnType<T> = ToJsonDataType<T> | ToJsonErrType;

type FetchErrType = { err: Error; originalError: unknown, toJson: undefined; response: undefined }
type FetchDataType<T> = { err: undefined; originalError: unknown, toJson: () => Promise<ToJsonReturnType<T>>, response: Response }

type FetchReturnType<T> = FetchDataType<T> | FetchErrType;
type FetchParamsType = Parameters<typeof fetch>;


export async function goFetch<T>(...param: FetchParamsType): Promise<FetchReturnType<T>> {
  try {
    const response = await fetch(...param);
    const toJson1 = toJson<T>(response);
    return { toJson: toJson1, response, err: undefined, originalError: undefined };
  } catch (err) {
    if (isError(err)) {
      return { err, originalError: err, toJson: undefined, response: undefined };
    }
    return { err: asError(err), originalError: err, toJson: undefined, response: undefined };
  }
}


function toJson<T>(response: Response) {
  return async (): Promise<ToJsonReturnType<T>> => {
    try {
      const jsonData: T = await response.json();
      return { jsonData, fetchResponse: response, err: undefined, originalError: undefined };
    } catch (err) {
      if (isError(err)) {
        return { err, originalError: err, jsonData: undefined, fetchResponse: undefined };
      }
      return { err: asError(err), originalError: err, jsonData: undefined, fetchResponse: undefined };
    }
  }
}

