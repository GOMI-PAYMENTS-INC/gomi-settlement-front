import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { hyundaeCard } from '@/v3/pages/home/assets';
import { useTodayPrefundDetailHook } from '@/v3/pages/home/hooks/prefund.hook';
import { localeString, number } from '@/v3/util';

type PrefundCard = {
  date: string;
  cardCompanyName: string;
  shorteningDate: number;
  price: number;
  status: string;
};

export const FoldablePrefundCard = ({
  date,
  shorteningDate,
  price,
  status,
}: PrefundCard) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Row
        className={`mx-[20px] mt-[14px]  border border-grey-200 bg-white py-[16px] ${
          open ? 'rounded-tl-[8px] rounded-tr-[8px] bg-grey-200' : 'rounded-[8px]'
        } overflow-hidden transition-all delay-150 duration-300`}
      >
        <Col span={10}>
          <img src={hyundaeCard} alt='현대카드' className='mx-auto' />
        </Col>
        <Col span={10} className='text-center text-M/Medium'>
          {localeString(number(price))}원
        </Col>
        <Col span={4} className='text-center text-grey-500'>
          {!open ? (
            <DownOutlined className='cursor-pointer' onClick={() => setOpen(true)} />
          ) : (
            <UpOutlined className='cursor-pointer' onClick={() => setOpen(false)} />
          )}
        </Col>
      </Row>
      <div
        className={`mx-[20px] mt-[-1px] rounded-bl-[8px] rounded-br-[8px] border-grey-200 px-[16px] ${
          open ? 'h-[156px] border-l border-r border-b py-[16px]' : 'h-0 border-0'
        } overflow-hidden transition-all delay-150 duration-300`}
      >
        <div className='flex justify-between'>
          <div className='text-left text-S/Medium text-[#787884]'>매출 발생일</div>
          <div className='text-right text-S/Medium text-grey-900'>
            {dayjs(date).format('YYYY.MM.DD')}
          </div>
        </div>
        <Divider className='my-[16px]' />
        <div className='flex justify-between'>
          <div className='text-left text-S/Medium text-[#787884]'>정산 단축일</div>
          <div className='text-right text-S/Medium text-grey-900'>
            +{shorteningDate}일
          </div>
        </div>
        <Divider className='my-[16px]' />
        <div className='flex justify-between'>
          <div className='text-left text-S/Medium text-[#787884]'>상태</div>
          <div className='text-right text-S/Medium text-purple-600'>{status}</div>
        </div>
      </div>
    </>
  );
};

function cardImage(cardCompanyName: string): string {
  const BC_CARD_ALIAS_LIST = ['비씨카드'];
  const KB_CARD_ALIAS_LIST = ['KB국민카드', 'KB카드'];
  const HANA_CARD_ALIAS_LIST = ['하나구외환', '하나카드'];
  const HYUNDAE_CARD_ALIAS_LIST = ['현대카드'];
  const SHINHAN_CARD_ALIAS_LIST = ['신한카드'];
  const SAMSUNG_CARD_ALIAS_LIST = ['삼성카드'];
  const NH_CARD_ALIAS_LIST = ['NH카드', '농협NH카드'];
  const LOTTE_CARD_ALIAS_LIST = ['롯데카드'];
  const HDO_CARD_ALIAS_LIST = ['디지털상품권(HDO)'];

  if (BC_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (KB_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (HANA_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (SHINHAN_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (HYUNDAE_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (SAMSUNG_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (NH_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (LOTTE_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  if (HDO_CARD_ALIAS_LIST.includes(cardCompanyName)) {
    return hyundaeCard;
  }

  return '';
}

export const PrefundCard = ({
  cardCompanyName,
  date,
  shorteningDate,
  price,
  status,
}: PrefundCard) => {
  return (
    <Row className='mt-[14px] rounded-[8px] border border-grey-200 py-[16px]'>
      <Col span={6}>
        <img src={cardImage(cardCompanyName)} alt='현대카드' className='mx-auto' />
      </Col>
      <Col span={4} className='text-center text-grey-800'>
        {dayjs(date).format('YYYY.MM.DD')}
      </Col>
      <Col span={4} className='text-center text-grey-800'>
        +{shorteningDate}일
      </Col>
      <Col span={6} className='text-center text-L/Medium'>
        {localeString(number(price))}원
      </Col>
      <Col span={4} className='text-center text-purple-600'>
        {status}
      </Col>
    </Row>
  );
};

export const PrefundTable = () => {
  const { data } = useTodayPrefundDetailHook();

  if (!data?.length) {
    return (
      <>
        <Row className='mx-[20px]  mt-[14px] rounded-[8px] border border-grey-200 py-[16px] text-center'>
          <Col span={24}>선정산이 가능한 카드 매출 데이터가 존재하지 않아요.</Col>
        </Row>
      </>
    );
  }

  return (
    <>
      {!isMobile && (
        <Row className='rounded-[8px] bg-[#F2F2FF] py-[16px]'>
          <Col span={6}></Col>
          <Col span={4} className='text-center'>
            매출 발생일
          </Col>
          <Col span={4} className='text-center'>
            정산 단축일
          </Col>
          <Col span={6} className='text-center'>
            선정산 금액
          </Col>
          <Col span={4} className='text-center'>
            상태
          </Col>
        </Row>
      )}
      {data.map((prefund, index) =>
        isMobile ? (
          <FoldablePrefundCard
            key={index}
            cardCompanyName={prefund.cardCompanyName}
            date={prefund.salesGroupAt}
            shorteningDate={prefund.prefundAvgDate}
            status={prefund.status}
            price={prefund.preFundPrice}
          />
        ) : (
          <PrefundCard
            key={index}
            cardCompanyName={prefund.cardCompanyName}
            date={prefund.salesGroupAt}
            shorteningDate={prefund.prefundAvgDate}
            status={prefund.status}
            price={prefund.preFundPrice}
          />
        ),
      )}
    </>
  );
};