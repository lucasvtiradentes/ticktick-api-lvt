import { CookieJar } from 'request';

type TGetRequestOptions = (
  | {
      method: 'GET';
    }
  | {
      method: 'POST';
      payload: unknown;
    }
) & {
  url: string;
};

export const getRequestOptions = (props: TGetRequestOptions) => ({
  method: props.method,
  url: props.url,
  headers: {
    Origin: 'https://ticktick.com',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
    'X-Device': '{"platform":"web","os":"Windows 10","device":"Firefox 117.0","name":"","version":4576,"id":"64fc9b22cbb2c305b2df7ad6","channel":"website","campaign":"","websocket":"6500a8a3bf02224e648ef8bd"}'
  },
  ...(props.method === 'POST' ? { json: props.payload } : {})
});
