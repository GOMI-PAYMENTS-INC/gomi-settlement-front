import React, { Dispatch } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { CountryType } from '@/generated/graphql';
import DetailReportSectionHeader from '@/pages/report/DetailReportSectionHeader';
import { TITLE } from '@/types/enum.code';
import { BrandAnalysisProductTable } from '@/pages/report/BrandAnalysisTable';
import { isFalsy } from '@/utils/isFalsy';
import { selectBrandIndex } from '@/containers/report';
import { TReportAction } from '@/containers/report/report.reducer';
import { formatNumber } from '@/utils/formatNumber';

const dummyProduct: TBrandAnalysisProduct[] = [
  {
    id: 100,
    itemName: '상품 명',
    itemUrl: '',
    itemImage: '상품 이미지url',
    itemPriceMin: 100,
    itemPriceMax: 100,
    item30daySales: 100,
    item30daysSold: 100,
    rank: 1,
  },
];

const dummyBrand: TBrandAnalysisBrand[] = [
  {
    rank: 1,
    name: 'nn',
    productCount: 100,
    totalSalesAmount: 100,
    totalSalesCount: 100,
    avgSalesAmount: 100,
    avgSalesCount: 100,
    avgPrice: 100,
    products: dummyProduct,
  },
];

const dummy: TBrandAnalysis = {
  text: '메인 키워드',
  country: CountryType.Kr,
  channel: 'SHOPEE',
  sorted: 'R',
  currencyUnit: 10,
  basePrice: 10,
  brands: dummyBrand,
};

interface IBrandAnalysis {
  brandAnalysis: {
    focus: number;
    data: TBrandAnalysis | null;
  };
  forceBrandIndex: number;
  _dispatch: Dispatch<TReportAction>;
  currencyUnit: number;
  basePrice: number;
  amplitudeData: TAmplitudeDetailData;
}

const BrandAnalysis = (props: IBrandAnalysis) => {
  const {
    brandAnalysis,
    forceBrandIndex,
    _dispatch,
    basePrice,
    amplitudeData,
    currencyUnit,
  } = props;
  const { focus, data: brandAnalysisData } = brandAnalysis;
  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={TITLE.BRAND_ANALYSIS} />
      {/*브랜드 리스트*/}
      <div className='mt-4 bg-grey-100 px-5 py-3'>
        <ul className='flex flex-wrap gap-x-[14px] gap-y-3'>
          {brandAnalysisData?.brands.map((value, index, array) => {
            return (
              <li key={index}>
                <button
                  className={`${
                    focus === index
                      ? 'bg-orange-500 text-L/Bold text-white'
                      : 'border border-[#dddddd] bg-white text-L/Medium text-[#848484]'
                  } rounded-sm px-[19px] py-[6px] shadow-[0px_4px_6px_rgba(0,0,0,0.06)]`}
                  onClick={() => {
                    selectBrandIndex(index, _dispatch);
                    // scollerRef.current?.scroll(0, 0);
                  }}
                >
                  <span className=''>{value.name || 'No brand'}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/*브랜드 정보*/}
      <div className='pt-4'>
        <div className='border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='bg-grey-100'>
            <div className='py-2.5 pl-5 '>
              <span className='text-S/Medium text-grey-900'>브랜드 정보</span>
            </div>
          </div>

          <div className='flex items-center divide-x-[1px] divide-dotted'>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>순위</span>
                </div>
                <div className='mt-2 flex items-center justify-center'>
                  <div className='relative h-[46px] w-[38px]'>
                    <ReactSVG
                      src='/assets/icons/filled/RateLabel.svg'
                      className='absolute top-0 left-0'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', 'fill-grey-300');
                      }}
                    />

                    <div className='absolute w-full text-center text-M/Regular leading-[40px] text-white'>
                      {brandAnalysisData!.brands[forceBrandIndex].rank}위
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>상품 수</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(
                      brandAnalysisData!.brands[forceBrandIndex].productCount,
                    )}
                    개
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>매출 합계</span>
                  <div className='tooltip-container'>
                    <a
                      data-tooltip-id='anchor-brand-sale'
                      data-tooltip-content='선택된 브랜드 상품들의 최근 30일간 매출 합계에요.'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/QuestionCircle.svg'
                        className='fill-grey-500'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                        }}
                      />
                    </a>
                    <Tooltip
                      id='anchor-brand-sale'
                      place='right'
                      variant='light'
                    ></Tooltip>
                  </div>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-orange-400'>
                    {formatNumber(
                      brandAnalysisData!.brands[forceBrandIndex].totalSalesAmount,
                    )}
                    원
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>판매량 합계</span>
                  <div className='tooltip-container'>
                    <a
                      data-tooltip-id='anchor-brand-sales-rate'
                      data-tooltip-content='선택된 브랜드 상품들의 최근 30일간 판매량 합계에요.'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/QuestionCircle.svg'
                        className='fill-grey-500'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                        }}
                      />
                    </a>
                    <Tooltip
                      id='anchor-brand-sales-rate'
                      place='right'
                      variant='light'
                    ></Tooltip>
                  </div>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(
                      brandAnalysisData!.brands[forceBrandIndex].totalSalesCount,
                    )}
                    개
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>평균 매출</span>
                  <div className='tooltip-container'>
                    <a
                      data-tooltip-id='anchor-brand-average-sales'
                      data-tooltip-content='선택된 브랜드 상품들이 최근 30일간 판매된 평균 매출이에요.'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/QuestionCircle.svg'
                        className='fill-grey-500'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                        }}
                      />
                    </a>
                    <Tooltip
                      id='anchor-brand-average-sales'
                      place='right'
                      variant='light'
                    ></Tooltip>
                  </div>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(
                      brandAnalysisData!.brands[forceBrandIndex].avgSalesAmount,
                    )}
                    원
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>평균 판매량</span>
                  <div className='tooltip-container'>
                    <a
                      data-tooltip-id='anchor-brand-average-sales'
                      data-tooltip-content='선택된 브랜드 상품들이 최근 30일간 판매된 평균 판매량이에요.'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/QuestionCircle.svg'
                        className='fill-grey-500'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                        }}
                      />
                    </a>
                    <Tooltip
                      id='anchor-brand-average-sales'
                      place='right'
                      variant='light'
                    ></Tooltip>
                  </div>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(
                      brandAnalysisData!.brands[forceBrandIndex].avgSalesCount,
                    )}
                    원
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-M/Regular text-grey-800'>평균 판매가</span>
                  <div className='tooltip-container'>
                    <a
                      data-tooltip-id='anchor-brand-average-selling-price'
                      data-tooltip-content='선택된 브랜드 상품들이 판매되고 있는 평균 가격이에요.'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/QuestionCircle.svg'
                        className='fill-grey-500'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                        }}
                      />
                    </a>
                    <Tooltip
                      id='anchor-brand-average-selling-price'
                      place='right'
                      variant='light'
                    ></Tooltip>
                  </div>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(brandAnalysisData!.brands[forceBrandIndex].avgPrice)}원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*브랜드 상품 리스트*/}
      {isFalsy(brandAnalysis) === false && (
        <BrandAnalysisProductTable
          brandAnalysisProduct={brandAnalysisData!.brands[forceBrandIndex].products}
          basePrice={basePrice}
          currencyUnit={brandAnalysisData!.currencyUnit}
          amplitudeData={amplitudeData}
        />
      )}
    </section>
  );
};
export default BrandAnalysis;
