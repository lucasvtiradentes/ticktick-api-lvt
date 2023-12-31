import { CoreOptions } from 'request';
import { ZodTypeAny, z } from 'zod';
import { TRequestConfigs } from '../configs';
import { GenericError } from '../errors/GenericError';
import { TicktickError, ticktickResponseErrorSchema } from '../errors/TicktickError';

export type TApiMethod = {
  route: string;
  method: (...args: any[]) => Promise<any>;
};

type THandleRequestProps = {
  requestOptions: CoreOptions;
  requestConfigs: TRequestConfigs;
};

type THandleRequestWithSchemaProps<TZodSchema> = {
  responseSchema?: TZodSchema;
} & THandleRequestProps;

async function handlePostRequest<TZodSchema extends ZodTypeAny>({ requestOptions, responseSchema, requestConfigs }: THandleRequestWithSchemaProps<TZodSchema>): Promise<z.infer<TZodSchema>> {
  return new Promise((resolve, reject) => {
    requestConfigs.request(requestOptions, async (error, response) => {
      const responseData = response.body;

      if (error) {
        reject(new GenericError(error));
      }

      const errorResponse = ticktickResponseErrorSchema.safeParse(responseData);
      if (errorResponse.success) {
        reject(new TicktickError(errorResponse.data.errorCode));
      }

      if (requestConfigs.validateSchema && responseSchema) {
        const parsedData = responseSchema.parse(responseData);
        resolve(parsedData);
      } else {
        resolve(responseData as z.infer<TZodSchema>);
      }
    });
  });
}

async function handleGetRequest<TZodSchema extends ZodTypeAny>({ requestOptions, responseSchema, requestConfigs }: THandleRequestWithSchemaProps<TZodSchema>): Promise<z.infer<TZodSchema>> {
  return new Promise((resolve, reject) => {
    requestConfigs.request(requestOptions, (error, response) => {
      const responseData = JSON.parse(response.body);

      if (error) {
        reject(new GenericError(error));
      }

      const errorResponse = ticktickResponseErrorSchema.safeParse(responseData);
      if (errorResponse.success) {
        reject(new TicktickError(errorResponse.data.errorCode));
      }

      if (requestConfigs.validateSchema && responseSchema) {
        const parsedData = responseSchema.parse(responseData);
        resolve(parsedData);
      } else {
        resolve(responseData as z.infer<TZodSchema>);
      }
    });
  });
}

export async function handleRequest({ requestOptions, requestConfigs }: THandleRequestProps) {
  if (requestOptions.method === 'POST') {
    return handlePostRequest({ requestConfigs, requestOptions });
  } else if (requestOptions.method === 'GET') {
    return handleGetRequest({ requestConfigs, requestOptions });
  }
}

export async function handleRequestWithSchema<TZodSchema extends ZodTypeAny>({ requestOptions, responseSchema, requestConfigs }: THandleRequestWithSchemaProps<TZodSchema>): Promise<z.infer<TZodSchema>> {
  if (requestOptions.method === 'POST') {
    return handlePostRequest({ requestConfigs, requestOptions, responseSchema });
  } else if (requestOptions.method === 'GET') {
    return handleGetRequest({ requestConfigs, requestOptions, responseSchema });
  }

  return {} as z.infer<TZodSchema>;
}
