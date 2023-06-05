import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';
import {
  convertCountry,
  convertExchangeRate,
  convertShopeeSiteUrl,
  convertSortedType,
} from '@/utils/convertEnum';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { openBrowser } from '@/containers/report';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useMatch } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
interface IKeywordInfoProps {
  keywordInfo: TKeywordInfo;
  itemCount: number;
  amplitudeData: TAmplitudeDetailData;
}

export const KeywordInfo = (props: IKeywordInfoProps) => {
  const { text, country, createdAt, basePrice, currencyUnit, sorted } = props.keywordInfo;
  const { param } = props.amplitudeData;
  const isMatchSharePath = useMatch('/share/:id');

  const makeShareLink = () => {
    const domain = window.location.origin;
    const pathname = window.location.pathname;
    //초대코드 생성 API 추가 ~ api실행 ~ 리턴으로 받은 token
    let shareToken = '';
    if (isMatchSharePath) {
      shareToken = param;
    } else {
      shareToken = '***'; //api를 통해 생성된 것
    }
    const utmLink =
      'utm_source=gomiinsight&utm_medium=share&utm_campaign=keywordreport&utm_content=' +
      param;
    return `${domain}${PATH._REPORT_DETAIL_BY_SHARE}/${shareToken}?${utmLink}`;
  };

  return (
    <section>
      <div className='flex justify-between border-t-2 border-b-2 border-grey-200'>
        <div className='basis-full py-8 pl-2'>
          <h1 className='break-all text-3XL/Bold text-grey-900'>{text}</h1>
          <div>
            <div className='pt-4 text-S/Medium odd:space-x-2'>
              <span className='text-grey-600'>국가</span>
              <span className='text-grey-800'>{convertCountry(country)}</span>
              <span className='text-grey-600'>플랫폼</span>
              <span className='text-grey-800'>Shopee</span>
              <span className='text-grey-600'>생성일</span>
              <span className='text-grey-800'>
                {convertTime(createdAt!, 'YYYY.MM.DD')}
              </span>
            </div>
            <div className='pt-2 text-S/Medium even:space-x-2'>
              <span className='text-grey-600'>수집 기준</span>
              <span className='text-grey-800'>
                {convertSortedType(sorted)} 상위 {props.itemCount}개
              </span>
              <span className='text-grey-600'>적용 환율</span>
              <span className='text-grey-800'>{`${currencyUnit} ${convertExchangeRate(
                country,
              )} = ${basePrice} KRW`}</span>
            </div>
          </div>
        </div>
        <div className='py-[30px]'>
          <div className='flex grow-0 flex-col items-end gap-y-4'>
            <button
              onClick={() => {
                openBrowser(`${convertShopeeSiteUrl(country)}/search?keyword=${text}`);
                _amplitudeMovedToSERP(param, text, null);
              }}
              className='button-filled-normal-medium-grey-false-true-true flex min-w-[205px] items-center justify-center gap-1 p-2.5'
            >
              <span>키워드 검색결과</span>
              <ReactSVG src='/assets/icons/outlined/Linkout.svg' />
            </button>
            <button
              className='button-filled-normal-medium-grey-false-true-true flex  gap-1 bg-orange-400 px-4 py-2.5 text-white'
              onClick={() =>
                copyToClipboard(
                  '주소가 복사되었습니다.원하는 곳에 붙여넣기(Ctrl+V)해주세요.',
                  makeShareLink(),
                )
              }
            >
              <span>공유하기</span>
              <ReactSVG src='/assets/icons/outlined/ShareAlt.svg' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
