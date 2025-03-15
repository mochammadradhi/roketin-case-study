

type RequestOptions = {
    headers?: HeadersInit;
    params?: Record<string, string>;
}
// create helpers for fecthin an method GET using axios
export const GlobalGet = async < T > (url: string, options: RequestOptions = {}): Promise<T> => {
    try {
      const {headers = {}, params = {}} = options;

    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    const response = await fetch(fullUrl, {
        method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    ...headers,
        },
      });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    throw error;
    }
  };