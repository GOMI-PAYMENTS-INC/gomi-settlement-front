import { getSubscription } from '@/common/api';
import type { SetterOrUpdater } from 'recoil';

import { getPlans } from '@/subscribe/api';
import { CACHING_KEY } from '@/types/enum.code';
import { isTruthy } from '@/utils/isTruthy';
import { useSessionStorage } from '@/utils/useSessionStorage';

export const _getSubscription = async (
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>,
) => {
  const response = await getSubscription();
  if (response.productUniqueKey) [setSubscription(response)];
};

export const storePlansIntoSession = async (setPlans: SetterOrUpdater<TPlans[]>) => {
  const item = useSessionStorage.getItem(CACHING_KEY.PLANS);
  if (isTruthy(item)) {
    return setPlans(item);
  }
  try {
    const response = await getPlans();
    if (response) {
      sessionStorage.setItem(CACHING_KEY.PLANS, JSON.stringify(response));
      setPlans(response);
    }
  } catch (error) {
    throw new Error('플랜 저장 과정에서 에러가 발생했습니다.');
  }
};

export const convertPlan = (plan: TPlanUniqueKey): string => {
  const plans = useSessionStorage.getItem(CACHING_KEY.PLANS);

  return `${plans.find((pl: TPlans) => pl.uniqueKey === plan).name} 플랜`;
};
