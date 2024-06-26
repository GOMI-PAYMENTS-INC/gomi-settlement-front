import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  PrefundService,
  TodayPreFundDto,
  TodayPreFundSummaryDto,
} from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';

export const useTodayPrefundHook = () => {
  return useQuery<TodayPreFundSummaryDto, ApiError>({
    queryKey: ['today-prefund'],
    queryFn: () => PrefundService.todayPreFund(),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('오늘의 선정산금을 가져오기 실패했어요!');
      return;
    },
  });
};

export const useTodayPrefundDetailHook = () => {
  return useQuery<TodayPreFundDto[], ApiError>({
    queryKey: ['today-prefund-details'],
    queryFn: () => PrefundService.todayPreFundDetails(),
    onError: (err: ApiError) => {
      console.error(err.message);
      toast.error('오늘의 선정산금 상세 내역을 가져오기 실패했어요!');
      return;
    },
  });
};
