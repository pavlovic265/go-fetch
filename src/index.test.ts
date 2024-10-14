import { goFetch } from "./index"


type Product = {
  id: number;
  title: string
}
const products: Product[] = [
  {
    id: 1,
    title: "Title 1"
  },
  {
    id: 2,
    title: "Title 2"
  }
]

const assetsFetchMock = () => Promise.resolve({
  ok: true,
  status: 200,
  json: async () => products,
} as Response);
const baseUrl = "https://dummy-url.com"


afterEach(() => {
  jest.restoreAllMocks();
});


test("goFetch to return json data", async () => {
  const fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(assetsFetchMock);

  const { err, toJson } = await goFetch<Product[]>(baseUrl);
  expect(err).toBeUndefined()
  expect(toJson).not.toBeUndefined()
  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);

  if (err !== undefined) {
    expect(1).toBe(2)
    return;
  }

  const { err: toJsonErr, jsonData } = await toJson();
  expect(toJsonErr).toBeUndefined()
  expect(jsonData).not.toBeUndefined()
  expect(jsonData).toHaveLength(2)
  expect(jsonData?.[0]).toEqual(products[0])
  expect(jsonData?.[1]).toEqual(products[1])
})

test("goFetch to return valid error", async () => {
  const fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(() => {
      throw new Error("fetch faild")
    });

  const { err, toJson } = await goFetch<Product[]>(baseUrl);

  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);
  expect(err).not.toBeUndefined();
  expect(toJson).toBeUndefined()
  expect(err).not.toBeUndefined()
  expect(err?.message).toBe("fetch faild")
})

test("goFetch to return unknown error", async () => {
  const fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(() => {
      throw { name: "foo" }
    });

  const { err, toJson } = await goFetch<Product[]>(baseUrl);
  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);
  expect(toJson).toBeUndefined()
  expect(err).not.toBeUndefined()
})



