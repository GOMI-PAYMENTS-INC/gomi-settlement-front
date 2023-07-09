import { CTA_LOCATION, CTA_TYPE, PAGE_CATEGORY } from '@/amplitude/amplitude.enum';
import { openBrowser } from '@/utils/openBrowser';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { USER_TARGET_DATA } from '@/home/constant';
import { GlobalEnv } from '@/api/config';

interface IEfficient {
  imagePath: string;
}
export const Efficient = ({ imagePath }: IEfficient) => {
  return (
    <>
      <section className='bg-[#FFFBF8]'>
        <div className='container py-[80px]'>
          <div className='mb-20 md:mb-[61.3px] '>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                고미인사이트와 함께
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>잘 팔릴 상품인지 미리 확인하고</p>
                <p className='mt-2'>
                  <span className='text-orange-400'>상위노출을 통해 </span>매출 선순환
                  구조를 만드세요!
                </p>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <img
              src={`${imagePath}/Section7/Section7.png`}
              alt=''
              className='w-full max-w-[754px] md:max-w-[540px]'
            />
          </div>
        </div>
      </section>
      <section>
        <div className='container pt-[100px] pb-[126px] sm:py-[60px] md:mx-auto  md:pb-[40px] lg:pb-[100px]'>
          <div className='mb-20 sm:mb-[56px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-orange-500 md:text-XL/Bold'>
                누가, 어떻게 활용할 수 있을 까요?
              </div>
              <div className='mt-6 break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold '>
                <p>쇼피에 상품을 판매하는 누구나!</p>
              </div>
            </div>
          </div>
          <div>
            <ul className='flex md:flex-wrap '>
              {USER_TARGET_DATA.map((userTarget, index) => (
                <li
                  key={index}
                  className='w-[calc(100%/4)] p-2.5 sm:mb-5 sm:w-full sm:last:mb-0 md:mb-[50px] md:w-[calc(100%/2)]'
                >
                  <div className='mb-6 lg:mb-4 '>
                    <img
                      src={`${imagePath}/Section8/${userTarget.imgName}`}
                      alt=''
                      className='w-full '
                    />
                  </div>
                  <div className='mb-4 text-2XL/Bold text-grey-900 lg:text-XL/Bold'>
                    {userTarget.name}
                  </div>
                  <div className='text-L/Medium text-grey-700 lg:text-M/Medium'>
                    {userTarget.content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='bg-main xs:bg-[40%] bg-cover bg-center py-[130px] sm:bg-[20%] sm:py-[70px]  lg:py-[105px]'>
        <div className='container'>
          <div className='mx-auto max-w-[1096px]'>
            <div className='flex items-center justify-between sm:flex-wrap'>
              <div className='break-keep text-4XL/Bold text-white sm:w-full lg:text-3XL/Bold'>
                잘 팔릴 상품을 <br />잘 파는 방법
              </div>
              <div className='text-right sm:mt-12  sm:w-full'>
                <button
                  className='w-full max-w-[312px] rounded bg-white py-4 px-4 text-L/Bold text-grey-800 sm:max-w-[306px] md:max-w-[286px] lg:max-w-[306px]'
                  onClick={(event) => {
                    openBrowser(GlobalEnv.serviceUrl);

                    const eventTarget = event.target as HTMLElement;
                    _introPageMovedToSolution(
                      PAGE_CATEGORY.MAIN,
                      CTA_TYPE.BUTTON,
                      CTA_LOCATION.MIDDLE_OF_CONTENT,
                      eventTarget.innerText,
                    );
                  }}
                >
                  고미인사이트 바로 시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};