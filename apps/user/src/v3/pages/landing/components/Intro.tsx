import { monitor, prefund } from '@/v3/pages/landing/assets';

export const Intro = () => {
  return (
    <div className='h-[870px] w-full bg-purple-50 pt-[59px] text-center'>
      <div className='mx-auto w-[1100px]'>
        <div className='text-2XL/Bold text-purple-600'>어제 매출, 오늘 정산 밧는닷!</div>
        <div className='text-[70px] font-black text-purple-600'>크레닷.</div>
        <div className='mt-[20px] text-XL/Light text-grey-700'>
          카드사나 휴일 상관 없이,{' '}
          <span className='font-bold text-purple-600'>가장 빠른 D+1일 정산 서비스</span>
        </div>
        <div className='mt-[50px] flex justify-center'>
          <button className='h-[48px] rounded-[8px] border-[#F5F5F5] bg-white px-[46px] text-M/Bold leading-[48px] text-grey-800 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
            로그인
          </button>
          <div className='ml-[20px]'></div>
          <button className='h-[48px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[48px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
            도입 문의하기
          </button>
        </div>
        <div className='absolute left-[50%] top-[380px] translate-x-[-50%]'>
          <div className='relative mt-[67px]'>
            <img src={prefund} width={651} className='absolute left-[30px] top-[29px]' />
            <img src={monitor} width={710} />
            <div className='absolute left-[270px] bottom-[20px] h-[150px] w-[170px]  bg-gradient-to-b from-transparent to-purple-400/80' />
          </div>
        </div>
      </div>
    </div>
  );
};