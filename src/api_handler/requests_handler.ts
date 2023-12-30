import { CoreOptions } from 'request';
import { ZodTypeAny, z } from 'zod';
import { TRequestConfigs } from '../configs';
import { GenericError } from '../errors/GenericError';
import { TicktickError, ticktickResponseErrorSchema } from '../errors/TicktickError';

type THandleRequestProps<TZodSchema> = {
  requestOptions: CoreOptions;
  responseSchema: TZodSchema;
  requestConfigs: TRequestConfigs;
};

export async function handlePostRequest<TZodSchema extends ZodTypeAny>({ requestOptions, responseSchema, requestConfigs }: THandleRequestProps<TZodSchema>): Promise<z.infer<TZodSchema>> {
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

      if (requestConfigs.validateSchema) {
        const parsedData = responseSchema.parse(responseData);
        resolve(parsedData);
      } else {
        resolve(responseData as z.infer<TZodSchema>);
      }
    });
  });
}

export async function handleGetRequest<TZodSchema extends ZodTypeAny>({ requestOptions, responseSchema, requestConfigs }: THandleRequestProps<TZodSchema>): Promise<z.infer<TZodSchema>> {
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

      if (requestConfigs.validateSchema) {
        const parsedData = responseSchema.parse(responseData);
        resolve(parsedData);
      } else {
        resolve(responseData as z.infer<TZodSchema>);
      }
    });
  });
}
