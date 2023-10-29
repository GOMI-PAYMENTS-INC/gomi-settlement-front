/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchDetailItemDto } from '../models/SearchDetailItemDto';
import type { SearchPrefundDto } from '../models/SearchPrefundDto';
import type { TodayPreFundDto } from '../models/TodayPreFundDto';
import type { TodayPreFundSummaryDto } from '../models/TodayPreFundSummaryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PrefundService {
  /**
   * 오늘 선정산금
   * @returns TodayPreFundSummaryDto
   * @throws ApiError
   */
  public static todayPreFund(): CancelablePromise<TodayPreFundSummaryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/prefund/today',
    });
  }

  /**
   * 오늘 선정산금 상세
   * @returns TodayPreFundDto
   * @throws ApiError
   */
  public static todayPreFundDetails(): CancelablePromise<Array<TodayPreFundDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/prefund/today/details',
    });
  }

  /**
   * 선정산금 기간 조회
   * @param startAt
   * @param endAt
   * @returns SearchPrefundDto
   * @throws ApiError
   */
  public static searchPrefund(
    startAt: string,
    endAt: string,
  ): CancelablePromise<SearchPrefundDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/prefund/search',
      query: {
        startAt: startAt,
        endAt: endAt,
      },
    });
  }

  /**
   * 선정산금 기간 상세
   * @param startAt
   * @param endAt
   * @returns SearchDetailItemDto
   * @throws ApiError
   */
  public static searchDetails(
    startAt: string,
    endAt: string,
  ): CancelablePromise<Array<SearchDetailItemDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/prefund/search/details',
      query: {
        startAt: startAt,
        endAt: endAt,
      },
    });
  }
}
