/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplyFutureFundDto } from '../models/ApplyFutureFundDto';
import type { FutureFundApplyDto } from '../models/FutureFundApplyDto';
import type { FutureFundDto } from '../models/FutureFundDto';
import type { RepaymentFutureFundDto } from '../models/RepaymentFutureFundDto';
import type { TodayFutureFundDto } from '../models/TodayFutureFundDto';
import type { UpdateFutureFundDto } from '../models/UpdateFutureFundDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FutureFundService {
  /**
   * 미래정산 요약
   * @param userId
   * @returns TodayFutureFundDto
   * @throws ApiError
   */
  public static today(userId: number): CancelablePromise<TodayFutureFundDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/future-fund/today',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 미래정산 목록
   * @param startAt
   * @param endAt
   * @param userId
   * @returns FutureFundDto
   * @throws ApiError
   */
  public static list(
    startAt: string,
    endAt: string,
    userId: number,
  ): CancelablePromise<Array<FutureFundDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/future-fund/list',
      query: {
        startAt: startAt,
        endAt: endAt,
        userId: userId,
      },
    });
  }

  /**
   * 미래정산 목록
   * @param status
   * @returns FutureFundApplyDto
   * @throws ApiError
   */
  public static applyList(status: string): CancelablePromise<Array<FutureFundApplyDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/future-fund/list/apply',
      query: {
        status: status,
      },
    });
  }

  /**
   * 미래 정산 신청
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static updateApplyStatus(
    requestBody: UpdateFutureFundDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/future-fund/apply/update',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 미래 정산 신청
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static apply(requestBody: ApplyFutureFundDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/future-fund/apply',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 미래 정산 상환
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static repayment(
    requestBody: RepaymentFutureFundDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/future-fund/repayment',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
