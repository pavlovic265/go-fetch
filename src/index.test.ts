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

  const { response, err } = await goFetch(fetch(baseUrl));
  expect(err).toBeUndefined()
  expect(response).not.toBeUndefined()
  expect(fetchMock).toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(baseUrl);

  if (err !== undefined) {
    expect(1).toBe(2)
    return;
  }

  const { response: toJsonResponse, err: toJsonErr } = await goFetch<Product[]>(response.json());
  expect(toJsonErr).toBeUndefined()
  expect(toJsonResponse).not.toBeUndefined()
  expect(toJsonResponse).toHaveLength(2)
  expect(toJsonResponse?.[0]).toEqual(products[0])
  expect(toJsonResponse?.[1]).toEqual(products[1])
})


