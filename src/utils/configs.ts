import { RequestAPI } from 'request';

export const INITIAL_CONFIGS = {
  origin: 'https://ticktick.com',
  api_url: 'https://api.ticktick.com/api/v2',
  browser_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0'
} as const;

export type TTicktickConfigs = {
  username: string;
  password: string;
  apiUrl?: string;
  validateSchema?: boolean;
};

export type TExtendedConfigs = {
  request: RequestAPI<any, any, any>;
  apiUrl: string;
  validateSchema: boolean;
};
