import { Dispatch, Fragment, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { initializeAuthState, maskingPhone } from '@/auth/container';
import { FindAccountTittle } from '@/auth/findAccount/elements';
import { AUTH_RESPONSE_TYPE } from '@/types/enum.code';
import { PATH } from '@/types/enum.code';

interface IFindPasswordResult {
  phone: string;
  isExistedAccount: null | keyof typeof AUTH_RESPONSE_TYPE;
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>;
  setValue: UseFormSetValue<TAuthEssentialProps>;
}

export const FindPasswordResult = (props: IFindPasswordResult) => {
  const { phone, isExistedAccount, setIsVerification, setValue } = props;

  return (
    <Fragment>
      {isExistedAccount === AUTH_RESPONSE_TYPE.FILLED ? (
        <div className='space-y-8'>
          <FindAccountTittle
            title='임시 비밀번호를 발송했어요.'
            subTitle='회원님께서 가입하신 연락처로<br>임시 비밀번호를 발송했어요.'
          />

          <div className='rounded-lg border border-grey-300 px-6 py-5 text-center text-orange-500'>
            {maskingPhone(phone)}
          </div>

          <div>
            <Link to={PATH.SIGN_IN}>
              <button
                type='button'
                className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px]'
              >
                로그인 하기
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='space-y-8'>
          <FindAccountTittle
            title='일치하는 회원정보가 없어요.'
            subTitle='이메일 주소 또는 휴대폰 번호를 다시 한 번 확인해주세요.'
          />
          <div className='space-y-3'>
            <div>
              <Link to={PATH.SIGN_UP}>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px]'
                >
                  회원가입 하기
                </button>
              </Link>
            </div>
            <div>
              <Link to={PATH.FIND_PASSWORD}>
                <button
                  type='button'
                  onClick={() => initializeAuthState(setIsVerification, setValue)}
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px] bg-white text-grey-700'
                >
                  다시 비밀번호 찾기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
