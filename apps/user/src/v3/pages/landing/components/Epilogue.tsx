import { useNavigate } from 'react-router-dom';

import { PATH } from '@/common/constants';
import { mobile } from '@/v3/pages/landing/assets';

export const Epilogue = () => {
  const navigation = useNavigate();
  return (
    <div className='bg-[#FDFBFF] py-[100px]'>
      <div className='mx-auto flex w-[1100px] justify-center'>
        <div>
          <img src={mobile} />
        </div>
        <div className='ml-[100px] mt-[120px]'>
          <div className='text-3XL/Bold leading-[50px] text-purple-600'>
            매출 및 정산 내역은 <br /> 관리자 페이지로 한 눈에!
          </div>
          <div className='mt-[30px] text-XL/Medium leading-[34px] text-grey-700'>
            서비스 이용 내역은 가맹점용 페이지를 통해 <br /> 매일 상세하게 제공해드려요.
          </div>
          <div className='mt-[50px] flex'>
            <button
              onClick={() => navigation(PATH.SIGN_IN)}
              className='h-[48px] rounded-[8px] border  border-grey-300 border-[#F5F5F5] bg-white px-[46px] text-M/Bold leading-[48px] text-grey-800 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
            >
              로그인
            </button>
            <div className='ml-[20px]'></div>
            <button className='h-[48px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[48px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
              도입 문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
