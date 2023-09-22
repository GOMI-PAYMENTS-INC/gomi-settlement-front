import { Fragment, KeyboardEvent, useEffect, useState, useRef } from 'react';
import { Default as Layout } from '@/common/layouts';
import {
  SearchResult,
  NoneKeyword,
  SearchResultDetail,
  ReportGeneratorModal,
  SearchTooltips,
  ExccededAlertModal,
} from '@/search/elements';
import { Selector } from '@/report/keyword/elements/Selector';
import {
  convertSortByIconPath,
  convertCountryIconPath,
  convertSortedType,
} from '@/utils/convertEnum';
import {
  convertSearchPlaceholder,
  updateSearchPayload,
  searchRequestHandler,
} from '@/search/container';

import { convertCountry } from '@/utils/convertEnum';
import UseTooltip from '@/components/UseTooltip';
import { ReactSVG } from 'react-svg';

import { getQueryResult } from '@/search/api';
import { useForm } from 'react-hook-form';
import {
  CountryType,
  SORTING_TYPE,
  COUNTRY,
  SEARCH_STATE_INIT_VALUE,
  SEARCH_MODAL_INIT_VALUE,
} from '@/search/constants';

import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { useRecoilState, useRecoilValue } from 'recoil';
import { SubscriptionAtom, PlansAtom, SwitchAtom } from '@/atom';
import { BackforwardButton } from '@/components/BackForwardButton';
import MSearchKeyword from '@/search/MSearchKeyword';

export const SearchKeywords = () => {
  const { Search, Monthly, RelativeKeyword } = SearchTooltips();
  const [modal, setModal] = useState<TNSearchModalStatus>(SEARCH_MODAL_INIT_VALUE);
  const [searchState, setSearchState] = useState<TSearchProps>(SEARCH_STATE_INIT_VALUE);
  const [isExceeded, setIsExceeded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useRecoilState(SwitchAtom);

  const hotKeywordRef = useRef<HTMLDivElement>(null);

  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);
  const plans = useRecoilValue(PlansAtom);

  const { register, getValues, setValue } = useForm<{ keyword: string }>({
    mode: 'onChange',
    defaultValues: { keyword: '' },
  });

  const { response, isLoading } = getQueryResult(searchState, setSearchState);

  useEffect(() => {
    const cachingData = useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD);
    if (isFalsy(searchState.keyword) && cachingData) {
      return setSearchState(cachingData);
    }

    if (searchState.keyword) {
      setValue('keyword', searchState.keyword || cachingData.keyword);
    }
  }, [searchState.keyword]);

  useEffect(() => {
    if (modal.isOpen === false) return;

    searchRequestHandler({
      _modalState: modal,
      _state: searchState,
      _modalDispatch: setModal,
      parameter: {
        reportInvokeId: response?.reportInvokeId,
        count: response?.main.count,
      },
      setSubscription,
    });
  }, [modal.isOpen]);

  const searchCss = searchState.keyword
    ? 'flex-col items-start border-b-[1px] w-full pb-[30px] border-grey-300 py-[30px] px-[41px] shadow-[0_2px_20px_0_rgba(0,0,0,0.04)]'
    : 'items-center';

  if (window.innerWidth < 432) {
    return (
      <Fragment>
        <MSearchKeyword />
      </Fragment>
    );
  }

  return (
    <Layout>
      {isExceeded && (
        <ExccededAlertModal
          isExceeded={isExceeded}
          setIsExceeded={setIsExceeded}
          subscription={subscription!}
          plans={plans}
        />
      )}

      <ReportGeneratorModal
        parameter={{
          reportInvokeId: response?.reportInvokeId,
          count: response?.main.count,
        }}
        _modalState={modal}
        _modalDispatch={setModal}
        _state={searchState}
      />

      <div
        className='flex h-full flex-col items-center bg-grey-50 px-[41px]'
        onClick={(event) => {
          if (hotKeywordRef.current?.contains(event.target as Node) === false && isOpen)
            setIsOpen(false);
        }}
      >
        <div className='absolute right-0 bottom-0 block'>
          <img src='/assets/images/NBackground.png' />
        </div>
        <section
          className={`w-[1075px] pt-[102px] ${
            searchState.keyword
              ? 'mx-[192px] flex  gap-[58px] border-grey-300'
              : 'mx-[180px] h-full'
          }`}
        >
          <div
            id='searchBox'
            className={`flex h-auto flex-col rounded-[20px] border-[1px] bg-white ${
              searchState.keyword
                ? 'relative h-full w-[507px] items-center'
                : 'py-4 px-[30px]'
            }`}
          >
            <BackforwardButton
              style='left-[-90px] top-0'
              hidden={false}
              callback={() => {
                useSessionStorage.removeItem(CACHING_KEY.STORED_KEYWORD);
                setValue('keyword', '');
                updateSearchPayload({
                  _state: searchState,
                  _dispatch: setSearchState,
                  key: 'keyword',
                  params: '',
                });
              }}
            />
            <div className={`flex w-full justify-between ${searchCss}`}>
              <div
                className={`${searchState.keyword ? 'mb-5' : ''} flex items-center gap-4`}
              >
                <Selector
                  minWidth={133}
                  value={convertCountry(searchState.country)}
                  isUseIcon={true}
                  iconPath={convertCountryIconPath(searchState.country)}
                  options={COUNTRY}
                  onClickOption={(value) => {
                    return updateSearchPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'country',
                      params: value as TSearchCountry,
                      calledByEvent: true,
                    });
                  }}
                />
                <Selector
                  minWidth={133}
                  value={convertSortedType(searchState.sortBy)}
                  isUseIcon={true}
                  iconPath={convertSortByIconPath(searchState.sortBy)}
                  options={SORTING_TYPE}
                  onClickOption={(value) => {
                    console.log(value, value);
                    return updateSearchPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'sortBy',
                      params: value as TSortBy,
                      calledByEvent: true,
                    });
                  }}
                />

                <UseTooltip content={Search} />
              </div>

              <div
                id='keywordSearchInput'
                className={`${searchState.keyword ? 'w-[425px]' : 'w-[476px]'}`}
              >
                <div className='form-control'>
                  <div className='input-group'>
                    <div className='w-full rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                      <input
                        type='text'
                        placeholder={convertSearchPlaceholder(CountryType.MY)}
                        {...register('keyword')}
                        onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                          if (event.key === 'Enter') {
                            const keyword = getValues('keyword');
                            return updateSearchPayload({
                              _state: searchState,
                              _dispatch: setSearchState,
                              key: 'keyword',
                              params: keyword,
                              calledByEvent: true,
                            });
                          }
                        }}
                        className='input-bordered input h-full w-full rounded-r-none border-0 bg-white'
                      />
                    </div>
                    <button
                      onClick={() => {
                        const keyword = getValues('keyword');
                        return updateSearchPayload({
                          _state: searchState,
                          _dispatch: setSearchState,
                          key: 'keyword',
                          params: keyword,
                          calledByEvent: true,
                        });
                      }}
                      className='btn-square btn border-none bg-gradient-to-r from-orange-500 to-[#FF7500]'
                    >
                      <ReactSVG
                        src='/assets/icons/outlined/Search.svg'
                        beforeInjection={(svg) =>
                          svg.setAttribute('class', 'h-6 w-6 fill-white')
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {searchState.keyword && (
              <SearchResultDetail
                isLoading={isLoading}
                _state={searchState}
                _dispatch={setSearchState}
                tooltips={{ monthly: Monthly, relativeKeywords: RelativeKeyword }}
                images={searchState.images}
                response={response}
              />
            )}
          </div>

          <div
            id='result'
            className={`${searchState.keyword ? 'self-start' : 'mt-[30px]'} flex w-full`}
          >
            {searchState.keyword ? (
              <SearchResult
                setIsExceeded={setIsExceeded}
                hotKeywordRef={hotKeywordRef}
                count={response?.main.count}
                _dispatch={setSearchState}
                setModal={setModal}
                modal={modal}
                _state={searchState}
              />
            ) : (
              <NoneKeyword _state={searchState} _dispatch={setSearchState} />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};
