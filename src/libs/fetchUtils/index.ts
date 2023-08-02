type MethodExcludedRequest = Omit<RequestInit, "method">;
type RequestInitWithoutMHB = Omit<MethodExcludedRequest, "headers" | "body">;
type HeadersRecord = Record<string, string>;
type HeadersInitWithoutContentType = Omit<HeadersRecord, "Content-Type">;

export async function typedFetch<T>(
  url: string,
  options: MethodExcludedRequest
): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    ...options,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
}

export async function typedPost<T>(
  url: string,
  data: T,
  headerOptions?: HeadersInitWithoutContentType,
  options?: RequestInitWithoutMHB
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headerOptions,
    },
    body: JSON.stringify(data),
    ...options,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
}

export async function typedPatch<T>(
  url: string,
  data: T,
  headerOptions?: HeadersInitWithoutContentType,
  options?: RequestInitWithoutMHB
) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...headerOptions,
    },
    body: JSON.stringify(data),
    ...options,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
}

export async function typedDelete<T>(
  url: string,
  options?: MethodExcludedRequest
) {
  const response = await fetch(url, {
    method: "DELETE",
    ...options,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
}
