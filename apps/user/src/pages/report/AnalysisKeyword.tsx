import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

export const AnalysisKeyword = () => {
  return (
    <section className='col-span-full h-[376px] w-[980px]'>
      <h1 className='text-XL/Bold text-black'>키워드 정보</h1>
      <div className='pt-6'>
        <div className='flex divide-x-[1px]  divide-grey-300 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='basis-[390px]'>
            <div className='flex h-10 items-center bg-grey-100 pl-5 text-left'>
              <span className='text-S/Medium text-grey-900'>종합 평가</span>
              <span>
                <ReactSVG
                  id='anchor-market-evaluation'
                  src='/assets/icons/outlined/QuestionCircle.svg'
                  className='pl-[7px]'
                />
                <Tooltip
                  anchorId='anchor-market-evaluation'
                  html='채워넣어라'
                  place='right'
                  className='text-XS/Regular text-grey-800'
                />
              </span>
            </div>
            <div className='flex h-[163px] items-center  text-center'>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted'>
                <div className='flex h-[123px] flex-1 flex-col items-center justify-center '>
                  <p className='text-2XL/Bold text-blue-600'>매우좋음</p>
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>검색량</p>
                  </div>
                </div>
                <div className='flex h-[123px] flex-1 flex-col items-center justify-center border-dashed'>
                  <div className=''>
                    <p className='text-2XL/Bold text-green-600'>좋음</p>
                    <div className='pt-2'>
                      <p className='text-XS/Regular text-grey-800'>노출 경쟁</p>
                    </div>
                  </div>
                </div>
                <div className='flex h-[123px] flex-1 flex-col items-center justify-center'>
                  <p className='text-2XL/Bold text-yellow-500'>나쁨</p>
                  <div className='pt-2'>
                    <p className='text-XS/Regular text-grey-800'>CPC 경쟁</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex h-10 w-full items-center bg-grey-100 pl-5 text-left '>
              <span className=' text-S/Medium text-grey-900'>상세 데이터</span>
              <span>
                <ReactSVG
                  id='anchor-market-detail'
                  src='/assets/icons/outlined/QuestionCircle.svg'
                  className='pl-[7px]'
                />
                <Tooltip
                  anchorId='anchor-market-detail'
                  html='채워넣어라'
                  place='right'
                  className='text-XS/Regular text-grey-800'
                />
              </span>
            </div>
            <div className='flex divide-x-[1px] divide-dotted'>
              <div className='flex flex-col'>
                <div className='flex h-[96px] w-[295px] items-center justify-center'>
                  <div className='flex h-[72px] w-[252px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px]  flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>1 : 7.8</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>노출 경쟁률</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>73,200</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>검색량</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px] '>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>13,200</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>건</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>경쟁상품 수</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex h-[96px] w-[295px] items-center justify-center'>
                  <div className='flex h-[72px] w-[252px] items-center justify-center rounded-[7px] bg-grey-100'>
                    <div className='flex h-12 w-[236px]  flex-col items-center justify-center text-center'>
                      <p className='text-XL/Bold text-grey-900'>10%</p>
                      <div className='pt-1'>
                        <p className='text-XS/Medium text-grey-800 '>CPC 비율</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-[72px] items-center border-t-[1px] border-dashed'>
                  <div className='flex w-1/2 flex-col items-center'>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>1,200</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>원</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>CPC</div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center border-l-[1px] '>
                    <div className='flex items-center '>
                      <span className='text-L/Regular text-grey-900'>173,200</span>
                      <span className='pl-1 text-S/Bold text-grey-800'>원</span>
                    </div>
                    <div className='pt-2 text-XS/Medium text-grey-800'>평균 판매가</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-6'>
        <div className='bordered flex h-[92px] border-[1px]  border-grey-300 '>
          <div className='flex pl-3 pr-3 pb-3 pt-3'>
            <ReactSVG
              className='pt-[5px] pl-px'
              src='/assets/icons/filled/ExclamationCircle.14px.svg'
            />

            <div className='pl-[11px]'>
              <h1 className='text-M/Bold text-grey-900'>요약</h1>
              <div className='pt-1'>
                <p className='break-all text-S/Regular text-gray-800'>
                  수요가 많으면서 검색량 대비 경쟁상품 수가 적은 키워드로서, 상품 등록 시
                  적극적으로 활용하기 좋은 키워드에요.
                </p>
                <p className='break-all text-S/Regular text-gray-800'>
                  CPC 입찰 경쟁이 심한 키워드로서, 판매 전략이 이익보다는 초기 시장 진입을
                  위한 공격적인 마케팅일 때 CPC광고가 적합해요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
