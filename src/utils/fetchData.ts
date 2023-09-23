interface IFetchData<T> {
  endpoint: string;
  body?: T;
  config?: RequestInit;
}

async function fetchData<T = undefined>({
  endpoint,
  body,
  config,
}: IFetchData<T>) {
  const headers = {
    "Content-Type": "application/json",
  };
  const customConfig: RequestInit = {
    credentials: "include",
    method: body ? "POST" : "GET",
    ...config,
    headers: {
      ...headers,
      ...config?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://frontend-take-home-service.fetch.com${endpoint}`,
        customConfig
      );

      if (res.status === 401) {
        window.location.replace("/login");
        throw new Error("Unauthorized");
      }
      if (!res.ok) throw new Error("Unable to retrieve data.");

      return Promise.resolve(res);
    } catch (e) {
      if (e instanceof Error) return Promise.reject(e.message);
      else return Promise.reject(`An error has occurred while retrieving data`);
    }
  };

  return fetchData();
}

export default fetchData;
