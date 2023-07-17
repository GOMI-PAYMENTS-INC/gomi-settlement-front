import { Fragment, useEffect, useReducer, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { _getReportInfo } from '@/report/container';
import { reportInitialState, reportReducer } from '@/report/reducer';
import { DetailReportRightQuickBar } from '@/report/elements/DetailReportRightQuickBar';
import { isFalsy } from '@/utils/isFalsy';
import { BrandAnalysis } from '@/report/brand/BrandAnalysis';
import { CategoryAnalysis } from '@/report/category/CategoryAnalysis';
import { KeywordInfo } from '@/report/keyword/KeywordInfo';
import { MarketSize } from '@/report/market/MarketSize';
import { AnalysisKeyword } from '@/report/keyword/AnalysisKeyword';
import { SalePrice } from '@/report/price/SalePrice';
import { AnalysisOverseaProduct } from '@/report/oversea/AnalysisOverseaProduct';
import { DetailReportHeader, DetailReportBody } from '@/report/elements';

import { Default } from '@/common/layouts';
import { _amplitudeKeywordReportViewed } from '@/amplitude/amplitude.service';

import { camelize } from 'casing';

const DetailReportPage = () => {
  const params = useParams();

  const scrollEventState: scrollEventState = {
    scrollY: 0,
    title: 'Report',
    isOpen: true,
    current: 'Report',
  };
  const [_state, _dispatch] = useReducer(reportReducer, reportInitialState);
  const [scrollEvent, setScrollEvent] = useState(scrollEventState);

  const { main, relation, oversea, salePrice, brand, category } = _state;

  const contentSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id && _state.main === null) _getReportInfo(params.id, _dispatch);
    if (main) {
      _amplitudeKeywordReportViewed(
        main.id,
        main.country,
        main.channel,
        main.sorted,
        main.text,
      );
    }
  }, [main?.id]);

  const amplitudeData: TAmplitudeDetailData = {
    param: params.id ? params.id : '',
    keyword: main?.text ? main.text : '',
  };

  const ReportComponents = useMemo(() => {
    return isFalsy(main) ? (
      <Fragment />
    ) : (
      <div className='col-span-10'>
        <div className='space-y-[72px]'>
          <KeywordInfo
            _dispatch={_dispatch}
            keywordInfo={main!}
            amplitudeData={amplitudeData}
          />
          <MarketSize marketSize={main!} />
          <AnalysisKeyword
            _dispatch={_dispatch}
            _state={_state}
            analysisInfo={main!}
            relations={relation.relations}
            amplitudeData={amplitudeData}
          />

          <BrandAnalysis
            _dispatch={_dispatch}
            basePrice={main!.basePrice}
            currencyUnit={main!.currencyUnit}
            brandAnalysis={brand}
            forceBrandIndex={brand.focus}
            amplitudeData={amplitudeData}
          />
          <SalePrice
            _dispatch={_dispatch}
            currencyUnit={main!.currencyUnit}
            salePriceInfo={salePrice?.data!}
            list={salePrice.list}
            focus={salePrice.focus}
            amplitudeData={amplitudeData}
          />
          <AnalysisOverseaProduct
            currencyUnit={main!.currencyUnit}
            basePrice={main!.basePrice}
            overseaProduct={oversea}
            amplitudeData={amplitudeData}
          />
          <CategoryAnalysis itemCount={main!.itemCount} categoryAnalysis={category} />
        </div>
      </div>
    );
  }, [main?.id, brand, salePrice]);

  return (
    <Default>
      {isFalsy(main) ? (
        <div className='flex h-screen flex-col items-center justify-center self-center'>
          <div className='scale-[0.3]'>
            <div id='loader' />
          </div>
        </div>
      ) : (
        <Fragment>
          <DetailReportHeader main={main} params={params} scrollEvent={scrollEvent} />
          <DetailReportBody
            contentSection={contentSection}
            setScrollEvent={setScrollEvent}
            scrollEvent={scrollEvent}
          >
            {ReportComponents}
            <DetailReportRightQuickBar
              isUser={true}
              title={main?.text}
              scrollEvent={scrollEvent}
              contentSection={contentSection}
              setScrollEvent={setScrollEvent}
            />
          </DetailReportBody>
        </Fragment>
      )}
    </Default>
  );
};

export default DetailReportPage;