export const PLANS = [
  {
    type: 'PLAN',
    createdAt: '2023-09-08T12:44:39.000+00:00',
    updatedAt: '2023-09-08T12:44:33.000+00:00',
    id: 2,
    priority: 2,
    name: 'Starter',
    description: '키워드 분석 최대 50개',
    originPrice: 20000,
    price: 10000,
    count: 50,
    isSubscribe: true,
    subscribeCycle: 30,
    isUse: true,
    uniqueKey: 'PRODUCT_PLAN_STARTER',
  },
  {
    type: 'PLAN',
    createdAt: '2023-09-08T12:44:37.000+00:00',
    updatedAt: '2023-09-08T12:44:30.000+00:00',
    id: 1,
    priority: 1,
    name: 'Free',
    description: '키워드 분석 최대 5개',
    originPrice: 0,
    price: 0,
    count: 5,
    isSubscribe: true,
    subscribeCycle: 30,
    isUse: true,
    uniqueKey: 'PRODUCT_PLAN_FREE',
  },
  {
    type: 'PLAN',
    createdAt: '2023-09-08T12:44:41.000+00:00',
    updatedAt: '2023-09-08T12:44:35.000+00:00',
    id: 3,
    priority: 3,
    name: 'Pro',
    description: '키워드 분석 최대 120개',
    originPrice: 32000,
    price: 16000,
    count: 120,
    isSubscribe: true,
    subscribeCycle: 30,
    isUse: true,
    uniqueKey: 'PRODUCT_PLAN_PRO',
  },
];