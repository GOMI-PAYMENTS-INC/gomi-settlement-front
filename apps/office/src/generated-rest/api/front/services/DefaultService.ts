/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {
  /**
   * @returns string
   * @throws ApiError
   */
  public static clientControllerGetHello(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/',
    });
  }

  /**
   * @returns boolean
   * @throws ApiError
   */
  public static prefundControllerCreateDaily(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/prefund/create/daily',
    });
  }

  /**
   * @returns boolean
   * @throws ApiError
   */
  public static prefundControllerCreateNew(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/prefund/create',
    });
  }
}