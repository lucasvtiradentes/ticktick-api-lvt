import { RequestAPI } from 'request';

type TConfigs = {
  apiUrl: string;
  browserAgent: string;
  validateSchema: boolean;
  xDevice: string;
};

export type TAuthData = {
  username: string;
  password: string;
};

export type TTicktickConfigs = TAuthData & {
  customConfigs?: Partial<TConfigs>;
};

export type TRequestConfigs = {
  request: RequestAPI<any, any, any>;
} & TConfigs;

export const INITIAL_CONFIGS: TConfigs = {
  apiUrl: 'https://api.ticktick.com/api/v2',
  browserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
  xDevice: '{"platform":"web","os":"Windows 10","device":"Firefox 117.0","name":"","version":4576,"id":"64fc9b22cbb2c305b2df7ad6","channel":"website","campaign":"","websocket":"6500a8a3bf02224e648ef8bd"}',
  validateSchema: false
};
