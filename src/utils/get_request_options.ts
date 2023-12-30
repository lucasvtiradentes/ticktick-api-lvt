import { TRequestConfigs } from './configs';

export type TRouteConfigs = (
  | {
      method: 'GET';
    }
  | {
      method: 'POST';
      payload: unknown;
    }
) & {
  route: string;
};

export const getRequestOptions = (requestConfigs: TRequestConfigs, routeConfigs: TRouteConfigs) => ({
  method: routeConfigs.method,
  url: `${requestConfigs.apiUrl}${routeConfigs.route}`,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': requestConfigs.browserAgent,
    'X-Device': requestConfigs.xDevice
  },
  ...(routeConfigs.method === 'POST' ? { json: routeConfigs.payload } : {})
});
