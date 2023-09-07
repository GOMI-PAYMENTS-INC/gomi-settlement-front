export const SUBSCRIBE_QNA = [
  {
    subject: '월간 결제와 연간 결제는 어떻게 다른가요?',
    content:
      '월간 결제는 매월 정기 결제일에 월 사용료를 계정에 등록한 카드로 자동 결제하는 방식이에요. 정기 결제일은 처음 결제를 진행한 날짜를 기준으로 결정되며, 만약 5월 25일에 첫 결제를 했다면 정기 결제일은 매월 25일이에요. 연간 결제는 1년치 이용 요금을 한 번에 결제해서 사용하는 방식으로 월간 결제에 비해 20% 할인된 가격으로 이용할 수 있어요.',
  },
  {
    subject: '결제 전에 무료로 체험해볼 수 있나요?',
    content:
      '회원가입만 해도 키워드 리포트를 매월 최대 10회까지 무료로 생성할 수 있어요. 리포트 발행 수의 제한은 있지만, 유료 회원과 동일한 리포트 생성이 가능하기 때문에 고미인사이트를 미리 체험하실 수 있어요',
  },

  {
    subject: '환불 정책은 어떻게 되나요?',
    content:
      '구독하신 플랜과 해당 월에 발행하신 리포트의 수에 따라 환불 여부와 금액은 달라져요. 환불은 고미인사이트 서비스 내 채팅 문의를 통해 신청할 수 있어요.',
    link: 'https://capable-soy-f58.notion.site/cd55e2b331d74068be7b40eb542be3e5?pvs=4',
    linkName: '환불 정책 자세히 보기',
  },

  {
    subject: '상위 플랜에서 하위 플랜으로 변경하고 싶어요.',
    content:
      '상위 플랜에서 하위 플랜으로 변경하시는 경우, 기존 플랜을 구독 취소 후 하위 플랜으로 재결제 할 수 있어요. 구독 취소 및 환불은 고미인사이트 서비스 내 채팅 문의를 통해 신청할 수 있어요.',
  },
];

export const PLANS = [
  {
    name: 'Starter',
    originPrice: 20000,
    price: 10000,
    count: 50,
  },
  {
    name: 'Pro',
    originPrice: 32000,
    price: 16000,
    count: 150,
  },
];

export const RESULT_OF_PAY_REQUEST = {
  accepted: {
    title: '결제가 정상적으로 처리되었어요.',
    text: 'Accepted',
    buttonText: '확인',
    billText: '결제정보',
  },
  rejected: {
    title: '결제를 실패했습니다.',
    text: 'Rejected',
    buttonText: '결제 재시도',
    billText: '요청정보',
  },
};
