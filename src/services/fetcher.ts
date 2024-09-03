type ErrorResponse = { success: false; error: string };

type SuccessResponse<T> = { code: number; message: string; data: T };

type FetcherResponse<T> =
  | {
      data?: never;
      error: ErrorResponse;
    }
  | {
      data: T;
      error?: never;
    };

type Options = {
  body?: string | FormData;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
};

const fetcher = async <T = unknown>(url: string, options: Options): Promise<FetcherResponse<T>> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as SuccessResponse<T>;

    return { data: data.data };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    return { error: { success: false, error: errorMessage } };
  }
};

export { fetcher };
