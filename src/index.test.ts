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
let fetchMock: any = undefined;

beforeEach(() => {
});

afterEach(() => {
  jest.restoreAllMocks();
});


test("goFetch to return json data", async () => {
  fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(assetsFetchMock);

  const { err, jsonData } = await goFetch<Product[]>(baseUrl);
  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);

  expect(err).toBeUndefined()
  expect(jsonData).not.toBeUndefined()
  expect(jsonData).toHaveLength(2)
  expect(jsonData?.[0]).toEqual(products[0])
  expect(jsonData?.[1]).toEqual(products[1])
})

test("goFetch to return valid error", async () => {
  fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(() => {
      throw new Error("fetch faild")
    });

  const { err, jsonData } = await goFetch<Product[]>(baseUrl);
  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);

  expect(jsonData).toBeUndefined()
  expect(err).not.toBeUndefined()
  expect(err?.message).toBe("fetch faild")
})

test("goFetch to return unknown error", async () => {
  fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(() => {
      throw { name: "foo" }
    });

  const { err, jsonData } = await goFetch<Product[]>(baseUrl);
  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);

  expect(jsonData).toBeUndefined()
  expect(err).not.toBeUndefined()
})
