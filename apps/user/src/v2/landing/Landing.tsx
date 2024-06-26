import { Collapse, ConfigProvider, Divider } from 'antd';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

import { PATH } from '@/common/constants';
import img24h from '@/v2/landing/assets/24h.png';
import commerce from '@/v2/landing/assets/ecommerce.png';
import icon1 from '@/v2/landing/assets/icon1.png';
import landingImage4 from '@/v2/landing/assets/landing4.png';
import landing7 from '@/v2/landing/assets/landing7.png';
import landingImage1 from '@/v2/landing/assets/landingImage1.png';
import landingImage2 from '@/v2/landing/assets/landingImage2.png';
import mCommerce from '@/v2/landing/assets/m_commerce.png';
import mpg from '@/v2/landing/assets/m_pg.png';
import mVan from '@/v2/landing/assets/m_van.png';
import mainImage from '@/v2/landing/assets/main_image_1.png';
import mFooter from '@/v2/landing/assets/mFooter.png';
import MLandingImage4 from '@/v2/landing/assets/mLanding4.png';
import MLandingImage2 from '@/v2/landing/assets/MlandingImage2.png';
import partnerships from '@/v2/landing/assets/partnership.png';
import partnershipsM1 from '@/v2/landing/assets/partnership_m1.png';
import partnershipsM2 from '@/v2/landing/assets/partnership_m2.png';
import partnershipsM3 from '@/v2/landing/assets/partnership_m3.png';
import partnershipsShadow from '@/v2/landing/assets/partnership_shadow.png';
import van from '@/v2/landing/assets/pg.png';
import pg from '@/v2/landing/assets/van.png';
import { FloatingButton } from '@/v2/landing/components/FloatingButton';

const CustomFAQWrapper = styled.div`
  .ant-collapse-item {
    border: none;
  }

  .ant-collapse-expand-icon {
    padding-right: ${isMobile ? '12px !important' : '36px !important'};
  }

  .ant-collapse {
    padding-top: ${isMobile ? '24px' : '56px'};
    padding-bottom: ${isMobile ? '24px' : '56px'};
  }
`;

const FAQContents = [
  {
    key: '1',
    label: '고미세틀먼트는 어떤 서비스인가요?',
    children:
      '고미세틀먼트는 온/오프라인 사장님들께서 PG, 쇼핑몰, VAN사로부터 정산 받으실 금액을 기반으로 빠른 현금 유동성 재무관리를 위해 일정의 수수료를 취하고 선지급을 대신 내드리는 서비스에요. ',
  },
  {
    key: '2',
    label: '선정산을 받을 수 있는 한도는 어떤 기준으로 계산되나요?',
    children:
      '사업장의 최근 매출, 선정산 서비스 이용 금액, 업력 등 다양한 내부적인 평가 요소들을 기준으로 한도율을 계산하고 있어요. 이후 선정산 가능 금액은 {묶여 있는 정산금 x 한도율(%)}로 계산되어요.',
  },
  {
    key: '3',
    label: '어떤 장점이 있고 언제 도움을 받을 수 있나요?',
    children:
      '선정산 서비스는 자금 회전이 잘 되지 않아 발생할 수 있는 흑자도산을 예방하거나 시세변동이 있는 재고(기름, 주류 등)를 다루는 업종에서 저렴한 매입 시기에 많은 재고를 확보할 수 있도록 도움을 드려요.',
  },
  {
    key: '4',
    label: '선정산에 대한 수수료는 얼마인가요?',
    children: (
      <div>
        선정산 서비스는 자금 회전이 잘 되지 않아 발생할 수 있는 흑자도산을 예방하거나
        시세변동이 있는 재고(기름, 주류 등)를 다루는 업종에서 저렴한 매입 시기에 많은
        재고를 확보할 수 있도록 도움을 드려요. <br />
        <small className='mt-[16px] text-orange-500'>
          ex) 3일 후 정산될 예정금 10,000원을 금일 선정산 받을 시 10,000*0.001*3= 30원
        </small>
      </div>
    ),
  },
  {
    key: '5',
    label: '선정산금은 어떻게 납부하나요?',
    children:
      '선정산을 받은 정산금 납부는 카드사 정산일에 자동으로 이체되어요. 따라서 정산일에는 카드사로부터 들어온 정산금을 사용 또는 출금하지 마시고 그대로 잔액을 유지해 주세요.',
  },
  {
    key: '5',
    label: '그 외 추가적인 문의가 있어요!',
    children:
      '그 외 추가적인 문의가 있으신 경우 support@gomisettlement.com으로 문의주시면 최대한 빠른 답변드릴께요.',
  },
];

export const Tab = ({
  selected,
  onClick,
  className,
  title,
}: {
  selected: boolean;
  className?: string;
  onClick(): void;
  title: string;
}) => {
  return (
    <div
      className={`${className} w-[168px] cursor-pointer self-center rounded-[30px] py-[16px] text-center font-bold ${
        selected ? 'bg-orange-400 text-white' : 'border border-grey-300 text-grey-800'
      } ${isMobile ? 'w-[90px] py-[9px]' : ''}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export const Box = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className='my-[10px] mx-[5px] inline-block'>
      <div className='flex w-max rounded-[10px] bg-white px-[14px] py-[10px] text-[17px] text-grey-900 shadow-sm'>
        <div className='mr-[10px] self-center'>
          <img src={icon} />
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
};

export const Landing = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);

  return (
    <div>
      <FloatingButton />
      <div
        className={`flex justify-between ${
          isMobile ? 'px-[20px] py-[12px]' : 'px-[40px] py-[16px]'
        }`}
      >
        <Link to={PATH.LANDING} className='self-center'>
          <ReactSVG
            src='/assets/icons/Logo.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[138px] h-[27px]');
            }}
          />
        </Link>
        {!isMobile && (
          <div
            className={`w-[117px] cursor-pointer rounded-[8px] border-[1px] border-grey-400 py-[10px] text-center text-S/Medium text-grey-800`}
            onClick={() => navigate(PATH.SIGN_IN)}
          >
            가맹점 관리자
          </div>
        )}
        {isMobile && (
          <div
            className={`w-[97px] cursor-pointer rounded-[8px] border-[1px] border-grey-400 py-[10px] text-center text-S/Medium text-grey-800`}
            onClick={() => navigate(PATH.SIGN_IN)}
          >
            가맹점 관리자
          </div>
        )}
      </div>
      <div
        className={`${
          isMobile ? 'py-[60px]' : ''
        } flex min-h-[565px] items-center justify-center bg-gradient-to-r from-dark-orange-900 to-orange-400`}
      >
        <div
          className={`${
            isMobile ? 'flex-col-reverse' : ' w-[1131px]'
          } flex justify-between`}
        >
          <div>
            <div
              className={`font-bold text-white ${
                isMobile
                  ? 'mt-[52px] text-center text-[28px] leading-[40px]'
                  : 'text-[40px] leading-[56.5px]'
              }`}
            >
              모든 사장님들을 위한 <br />
              당일 지급 선정산 서비스
            </div>

            <div
              className={`mt-[20px] mb-[32px] text-white ${
                isMobile
                  ? 'mt-[26px] text-center text-[20px] leading-[28px]'
                  : 'leading-[60px]'
              }`}
            >
              묶여 있는 정산금, 더이상 {isMobile ? <br /> : ''} 기다리지 말고 지금 바로
              받아가세요.
            </div>

            <div
              className={`${
                isMobile ? 'w-full' : 'w-[264px]'
              } cursor-pointer rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-center text-xl font-bold leading-[56px] text-white`}
              onClick={() => navigate(PATH.APPLY)}
            >
              서비스 신청하기
            </div>
          </div>
          <div>
            <img
              src={mainImage}
              width={isMobile ? 186 : 328}
              className={isMobile ? 'mx-auto' : ''}
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          isMobile ? 'py-[60px] text-[26px]' : 'py-[101px] text-[32px]'
        } flex items-center justify-center bg-grey-100`}
      >
        <div
          className={`${
            isMobile ? 'flex-col text-center' : 'w-[1131px]'
          } flex justify-between`}
        >
          <div>
            <div className='font-bold leading-[46px]'>
              <span className='text-orange-400'>온라인 오프라인 구분없이,</span> <br />
              대한민국 사업자라면 누구든!
            </div>
            <div className={isMobile ? 'mt-[38px]' : 'mt-[98px]'}>
              <img src={landingImage1} width={isMobile ? 288 : 370} className='mx-auto' />
            </div>
          </div>
          <div className={isMobile ? 'mt-[50px]' : 'w-[480px] pt-[150px]'}>
            <Box title='온라인 서비스 운영' icon={icon1} />
            <Box title='식당 사장님' icon={icon1} />
            <Box title='스타트업' icon={icon1} />
            <Box title='병원 원장님' icon={icon1} />
            <Box title='카페 사장님' icon={icon1} />
            <Box title='오픈마켓 판매자' icon={icon1} />
            <Box title='헬스장' icon={icon1} />
            <Box title='주유소 사장님' icon={icon1} />
            <Box title='학원 원장님' icon={icon1} />
            <Box title='휴대폰 대리점' icon={icon1} />
            <Box title='자체 쇼피몰 운영' icon={icon1} />
          </div>
        </div>
      </div>

      <div
        className={`${
          isMobile ? 'py-[60px] text-[26px]' : 'py-[101px] text-[32px]'
        } flex flex-col items-center justify-center bg-[#FFF0E8]`}
      >
        <div
          className={`${
            isMobile ? 'text-[26px] leading-[40px]' : 'text-[32px] leading-[50px]'
          } relative text-center font-bold`}
        >
          {!isMobile && (
            <img
              src={img24h}
              width={115}
              className='absolute right-[-50px] top-[-40px]'
            />
          )}
          <span className='text-[#FF8851]'>서비스 신청은 단 1분!</span> <br />
          <span className='text-[#B85F36]'>
            모든 정산은 {isMobile ? <br /> : ''} 매출 발생 24시간 이내
          </span>
        </div>
        <div className={isMobile ? 'mt-[40px]' : 'mt-[46px]'}>
          {isMobile ? (
            <img src={MLandingImage2} />
          ) : (
            <img src={landingImage2} width={957} />
          )}
        </div>
      </div>

      <div className={isMobile ? 'py-[50px]' : 'py-[80px]'}>
        <div
          className={`text-center font-bold text-grey-800 ${
            isMobile ? 'text-[26px] leading-[40px]' : 'text-[32px] leading-[70px]'
          }`}
        >
          총 82개 {isMobile ? <br /> : ''} 정산 시스템 연동 완료!
        </div>

        <div
          className={`mt-[20px] text-center font-medium text-[#797979] ${
            isMobile ? 'leading[36px] text-[18px]' : 'text-[20px] leading-[33px]'
          }`}
        >
          더 많은 사장님들이 {isMobile ? <br /> : ''} 더 많은 정산을 받을 수 있도록 <br />
          정산 시스템은 더욱 다양해질꺼에요!
        </div>

        <div className='mt-[60px] flex justify-center'>
          <div className='flex'>
            <Tab
              className='mr-[25px]'
              onClick={() => setIndex(0)}
              selected={index === 0}
              title={'쇼핑몰'}
            />
            <Tab
              className='mr-[25px]'
              onClick={() => setIndex(1)}
              selected={index === 1}
              title={'PG사'}
            />
            <Tab onClick={() => setIndex(2)} selected={index === 2} title={'VAN사'} />
          </div>
        </div>
        {index === 0 && <img src={isMobile ? mCommerce : commerce} className='mx-auto' />}
        {index === 1 && <img src={isMobile ? mpg : pg} className='mx-auto' />}
        {index === 2 && <img src={isMobile ? mVan : van} className='mx-auto' />}
      </div>

      <div className={`${isMobile ? 'py-[50px]' : 'pt-[80px]'} bg-[#624334]`}>
        <div
          className={`text-center font-bold text-grey-800 ${
            isMobile ? 'text-[26px] leading-[40px]' : 'text-[32px] leading-[70px]'
          } text-white`}
        >
          누적 정산금 지급액 {isMobile ? <br /> : ''}{' '}
          <span className='text-orange-400'>2,487억원</span>
        </div>

        <div
          className={`mt-[20px] text-center text-white ${
            isMobile ? 'leading[36px] text-[18px]' : 'text-[20px] leading-[33px]'
          }`}
        >
          이미 많은 사장님들께서 {isMobile ? <br /> : ''} 선정산 서비스를 통해 <br />
          유동성 있는 현금관리를 하고 있어요.
        </div>

        {!isMobile && (
          <div className='relative'>
            <img
              src={partnershipsShadow}
              className='absolute bottom-0 left-[50%] mx-auto translate-x-[-50%]'
            />
            <img src={partnerships} className='mx-auto' />
          </div>
        )}

        {isMobile && (
          <>
            <div className='relative mt-[24px] h-[90px] w-full overflow-hidden'>
              <div className='absolute mb-10 flex animate-slider flex-row'>
                <img
                  className='mx-w-auto w-[auto] max-w-[none]'
                  src={partnershipsM1}
                  alt=''
                />
                <img
                  className='mx-w-auto ml-[18px] w-[auto] max-w-[none]'
                  src={partnershipsM1}
                  alt=''
                />
              </div>
            </div>
            <div className='relative mt-[24px] h-[90px] w-full overflow-hidden'>
              <div className='absolute mb-10 flex animate-slider2 flex-row'>
                <img
                  className='mx-w-auto w-[auto] max-w-[none]'
                  src={partnershipsM2}
                  alt=''
                />
                <img
                  className='mx-w-auto ml-[18px] w-[auto] max-w-[none]'
                  src={partnershipsM2}
                  alt=''
                />
              </div>
            </div>
            <div className='relative mt-[24px] h-[90px] w-full overflow-hidden'>
              <div className='absolute mb-10 flex animate-slider flex-row'>
                <img
                  className='mx-w-auto w-[auto] max-w-[none]'
                  src={partnershipsM3}
                  alt=''
                />
                <img
                  className='mx-w-auto ml-[18px] w-[auto] max-w-[none]'
                  src={partnershipsM3}
                  alt=''
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`${isMobile ? 'py-[90px]' : 'py-[96px]'} bg-[#FFF5F0]`}>
        <div
          className={`text-center font-bold text-grey-800 ${
            isMobile ? 'text-[26px] leading-[40px]' : 'text-[32px] leading-[70px]'
          } text-grey-800`}
        >
          <span className='text-orange-400'>
            대출이 아니니깐, {isMobile ? <br /> : ''} 신용등급도 그대로!
          </span>
        </div>

        <div
          className={`mt-[20px] text-center text-grey-800 ${
            isMobile ? 'leading[36px] text-[18px]' : 'text-[20px] leading-[33px]'
          }`}
        >
          선정산 서비스는 정산 예정인 금액을 {isMobile ? <br /> : ''} 미리 지급 받고{' '}
          {isMobile ? '' : <br />}
          추후 정산금이 입금되면 {isMobile ? <br /> : ''} 저희가 다시 받아가는 개념이에요.
        </div>

        <div>
          {isMobile ? (
            <img src={MLandingImage4} className='mx-auto' />
          ) : (
            <img src={landingImage4} className='mx-auto mt-[40px]' />
          )}
        </div>
      </div>
      <div
        className={`flex flex-col items-center bg-grey-50 ${
          isMobile ? 'py-[60px]' : 'py-[94px]'
        }`}
      >
        <div className={`${isMobile ? 'text-XL/Bold' : 'text-2XL/Bold '}`}>
          <span className='text-orange-500'>자주 묻는 질문을 모았어요.</span>
        </div>
        <div
          className={`mt-[30px] ${
            isMobile ? 'mt-[10px] text-[28px] font-bold leading-[40px]' : 'text-3XL/Bold'
          }`}
        >
          <span className='text-grey-900'>FAQ</span>
        </div>
        <CustomFAQWrapper
          className={isMobile ? 'mt-[30px] px-[24px]' : 'mt-[40px] w-[880px]'}
        >
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  headerBg: 'white',
                },
              },
            }}
          >
            <Collapse
              className='shadow-sm'
              bordered={false}
              expandIconPosition='end'
              defaultActiveKey={FAQContents.map((item) => item.key)}
              items={FAQContents.map((item, index) => ({
                key: item.key,
                label: (
                  <div
                    className={`${
                      isMobile ? 'pl-[12px] text-L/Bold' : 'text-XL/Bold'
                    } px-[36px] text-grey-900`}
                  >
                    {item.label}
                  </div>
                ),
                children: (
                  <>
                    <div
                      className={`${
                        isMobile ? 'pl-[12px] text-S/Regular' : 'text-M/Medium'
                      } px-[36px] text-grey-700`}
                    >
                      {item.children}
                    </div>
                    {FAQContents.length - 1 !== index && <Divider className='mb-0' />}
                  </>
                ),
              }))}
            />
          </ConfigProvider>
        </CustomFAQWrapper>
      </div>
      <div className=''>{isMobile && <img src={mFooter} className='mx-auto' />}</div>
      <div className=''>{!isMobile && <img src={landing7} className='mx-auto' />}</div>
    </div>
  );
};
