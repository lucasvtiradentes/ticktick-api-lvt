import { TRequestConfigs } from '../configs';

export type TRouteConfigs =
  | {
      method: 'GET';
    }
  | {
      method: 'POST';
      payload: unknown;
    };

// prettier-ignore
export const parseRequestOptions = (requestConfigs: TRequestConfigs, routeConfigs: TRouteConfigs & { route: string; }) => ({
  method: routeConfigs.method,
  url: `${requestConfigs.apiUrl}${routeConfigs.route}`,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': requestConfigs.browserAgent,
    'X-Device': requestConfigs.xDevice
  },
  ...(routeConfigs.method === 'POST' ? { json: routeConfigs.payload } : {})
});
