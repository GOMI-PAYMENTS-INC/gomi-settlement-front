import { Default as Layout } from '@/common/layouts';
import { BackforwardButton } from '@/components/BackForwardButton';
import { PATH } from '@/router/routeList';
import { formatNumber } from '@/utils/formatNumber';
import { useEffect, useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { openPaymentWidget, updateSelectedPlan } from '@/subscribe/container';
import { UserAtom } from '@/atom/auth/auth-atom';
import { useRecoilValue } from 'recoil';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { PLANS } from '@/subscribe/constant';

export const UpgradePlan = () => {
  const navigator = useNavigate();
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TPlanType>(PLANS[0]);
  const userEmail = useRecoilValue(UserAtom)?.me.email;
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  useEffect(() => {
    window.scroll(0, 0);
    const clientKey = import.meta.env.VITE_TOSS_KEY;
    const customerKey = 'kBovVXSJLsTahwvFA5tr-';
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      // ------  이용약관 렌더링 ------
      // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
    })();

    if (width === 0) {
      setWidth(document.getElementById('plan_width')?.offsetLeft! - 100);
    }
  }, []);

  return (
    <Layout useGap={true}>
      {isOpen && (
        <Fragment>
          <div id='agreement' />
          <div hidden id='payment-widget' />
        </Fragment>
      )}
      <section className='pb-[164px]'>
        <div className='absolute left-0 top-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
        <div className='absolute right-0 bottom-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
        <BackforwardButton
          style={`top-[146px] sticky`}
          originStyle={{ left: `${width}px` }}
          callback={() => {
            navigator(PATH.SUBSCRIBE);
          }}
        />
        <header className='pt-[22px]'>
          <div className='flex w-full justify-center'>
            <div id='plan_width' className='flex w-[1138px] justify-center'>
              <p className='text-4XL/Bold'>플랜 변경하기</p>
            </div>
          </div>
        </header>
        <main className='pt-[74px]'>
          <div id='subscribe_frame' className='flex justify-center'>
            <div className='flex w-[1148px] justify-between'>
              <div className='flex w-[608px] flex-col justify-around gap-12'>
                <div className='space-y-5 text-2XL/Bold'>
                  <p>결제 플랜</p>
                  <ul id='plan_list' className='flex flex-col gap-5'>
                    {PLANS.map((plan, index) => {
                      const isSelected = plan.name === selectedPlan.name;
                      const selectedBorder = isSelected
                        ? 'border-orange-400 bg-orange-100'
                        : '';
                      return (
                        <li
                          key={`${plan}_${index}`}
                          className={`flex cursor-pointer justify-between rounded-lg border-[1px] px-5 py-[14px] ${selectedBorder}`}
                          onClick={() => updateSelectedPlan(plan, setSelectedPlan)}
                        >
                          <div className='flex'>
                            <div className='flex h-full items-center'>
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border-[2px] ${
                                  isSelected ? 'border-orange-400' : ''
                                }`}
                              >
                                <div
                                  className={`h-3 w-3 rounded-full bg-orange-400 p-1 ${
                                    isSelected ? '' : 'hidden'
                                  }`}
                                />
                              </div>
                            </div>
                            {/* <input type='radio' defaultChecked={isSelected} /> */}
                            <div className='ml-5 flex flex-col gap-1'>
                              <p className='text-2XL/Bold'>{plan.name}</p>
                              <p className='text-M/Medium'>{`키워드 분석 최대 ${plan.count}회`}</p>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <div className='flex h-6 rounded-[100px] bg-gradient-to-b from-[#FF7500] to-[#FC5000]'>
                              <p className='self-center px-2.5 text-S/Bold text-white'>
                                50%
                              </p>
                            </div>
                            <p className='ml-[7px] text-M/Regular text-grey-500 line-through'>
                              {formatNumber(plan.originPrice)}
                            </p>
                            <p className='ml-2.5 text-2XL/Bold'>
                              {formatNumber(plan.price)}
                              <span className='text-M/Medium'> /월</span>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <p className='text-2XL/Bold'>결제정보</p>
                  <div className='mt-[14px] h-[254px] w-[608px] border-y-[1px]'>
                    <div className='mt-[22px] flex justify-between border-grey-200 text-L/Regular'>
                      <div className='flex flex-col gap-5'>
                        <p>구독 서비스명</p>
                        <p>리포트 발행 가능 수</p>
                        <p>자동결제일</p>
                        <p>서비스 금액</p>
                        <p>할인 금액</p>
                      </div>
                      <div className='flex flex-col gap-5 text-end'>
                        <p className='text-L/Bold'>{`키워드 분석 / ${selectedPlan.name}`}</p>
                        <p className='text-L/Bold'>{`${selectedPlan.count}`}회</p>
                        <p className='text-L/Bold'>매월 7일</p>
                        <p>{formatNumber(selectedPlan.originPrice)}</p>
                        <p>{formatNumber(selectedPlan.originPrice / 2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-[18px] flex justify-between'>
                    <p className='text-2XL/Bold text-orange-400'>총 결제 금액</p>
                    <p className='text-2XL/Regular'>{formatNumber(selectedPlan.price)}</p>
                  </div>
                </div>
              </div>
              <div className='w-[444px]'>
                <div className='space-y-5 border-b-[1px] border-grey-200 pb-5 text-2XL/Bold'>
                  <p>결제 수단</p>
                  <button
                    id='registed_card'
                    className='flex w-full justify-center rounded-lg border-[1px] border-grey-300 bg-grey-50'
                  >
                    <div className='flex flex-col items-center justify-center py-[14px]'>
                      <ReactSVG
                        src='/assets/icons/outlined/PlusCircle.svg'
                        className='mb-[6px]'
                      />
                      <p className='text-L/Medium text-grey-500'>신규 카드등록</p>
                    </div>
                  </button>
                </div>
                <div className='mt-8'>
                  <p className='text-L/Regular text-grey-800'>
                    구독 서비스 설명을 확인하였으며, 30일 간격으로 정기 결제에 동의합니다.
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      openPaymentWidget(setIsOpen, selectedPlan, userEmail);
                    }}
                    className='button-filled-normal-large-primary-false-false-true mt-3 w-full'
                  >
                    업그레이드 하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className='pt-[74px]'>
          <div className='flex justify-center'>
            <div className='w-[1148px] rounded-lg bg-grey-100'>
              <div className='py-[30px] pl-[35px]'>
                <ul className='list-inside list-disc space-y-5 text-M/Regular'>
                  <p className='list-none text-L/Bold'>구독 유의사항</p>
                  <li>서비스 구독은 언제든 직접 해지할 수 있어요.</li>
                  <li>
                    서비스 구독료는 매월 정기 결제일 오전 7시 정각에 자동으로 결제되어요.
                  </li>
                  <li>
                    플랜을 업그레이드 할 경우, 기존 플랜에서 남은 서비스 이용량만큼 할인이
                    적용되어요.
                  </li>
                  <li>
                    플랜을 다운그레이드할 경우, 다음 정기 결제일부터 변경된 플랜이
                    적용되어요.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </Layout>
  );
};