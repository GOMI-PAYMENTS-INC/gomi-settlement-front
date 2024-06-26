import { ErrorMessage } from '@hookform/error-message';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldErrorsImpl, useForm, UseFormSetError } from 'react-hook-form';

import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { clickVerifyBtn } from '@/auth/container';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { useInterval } from '@/components/useInterval';
import { isFalsy } from '@/utils/isFalsy';
interface IVerifyCode {
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>;
  isVerification: TVerifyButtonState;
  setError: UseFormSetError<TAuthEssentialProps>;
  errors: Partial<FieldErrorsImpl<TAuthEssentialProps>>;
  isPassedVerifyCode?: boolean;
}

export const VerifyCodeInput = (props: IVerifyCode) => {
  const initializeTime = { minutes: 1, seconds: 0 };
  const [time, setTime] = useState(initializeTime);
  const { setIsVerification, isVerification, setError, errors, isPassedVerifyCode } =
    props;

  const { register } = useForm<{ verifyCode: string }>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (isPassedVerifyCode === true) {
      setTime(Object.assign({}, time, { minutes: 0, seconds: 0 }));
      setError('verifyCode', { message: undefined });
      return;
    }
    if (isVerification.theElseCalled) {
      setTime(Object.assign({}, time, initializeTime));
      setError('verifyCode', { message: undefined });
    }
    if (isVerification.isExceeded) {
      setTime(Object.assign({}, time, { minutes: 5, seconds: 0 }));
      setError('verifyCode', {
        message: '인증번호 발송 횟수를 초과했어요. 5분간 인증이 불가능해요.',
      });
    }
  }, [isVerification.theElseCalled, isVerification.isExceeded, isPassedVerifyCode]);
  const disable = time.minutes === 0 && time.seconds === 0;

  useInterval(
    //TODO: container에 로직 넣기
    () => {
      if (time.minutes === 0 && time.seconds === 1) {
        clickVerifyBtn(isVerification, setIsVerification);
        //TODO: 조건문 중첩 피하기 # 리펙터링 -> 함수로 분리하기
        if (isVerification.isExceeded) {
          setIsVerification(
            Object.assign({}, isVerification, {
              isExceeded: false,
              theElseCalled: false,
            }),
          );
        } else {
          setError('verifyCode', {
            message: '인증시간이 만료었어요. 다시 인증해주세요.',
          });

          clickVerifyBtn(isVerification, setIsVerification, { theElseCalled: false });
        }
      }
      if (time.minutes > 0 && time.seconds === 0) {
        setTime(Object.assign({}, time, { minutes: time.minutes - 1, seconds: 59 }));
        return;
      }

      if (time.seconds > 0) {
        setTime(Object.assign({}, time, { seconds: time.seconds - 1 }));
        return;
      }
    },
    disable ? null : 1000,
  );

  return (
    <div className='inputCustom-group'>
      <div className='inputCustom-textbox-wrap mb-2'>
        <input
          className={`inputCustom-textbox w-full ${
            errors.verifyCode?.message && 'error'
          }`}
          id='verifyCode'
          type='text'
          disabled={isPassedVerifyCode}
          maxLength={6}
          placeholder='인증번호 6자리를 입력해주세요.'
          readOnly={
            [isFalsy(disable), isVerification.theElseCalled].every(
              (disable) => disable === false,
            ) || isVerification.isExceeded
          }
          {...register('verifyCode', {
            required: NOTIFICATION_MESSAGE.emptyPhoneVerify,
            pattern: {
              value: /[0-9]{6}$/g,
              message: '인증번호 6자리를 입력해주세요.',
            },
            onChange: (event) => {
              event.target.value = event.target.value.replace(/[^0-9]/g, '');

              if (event.target.value?.length === 6) {
                //TODO: container에 로직 넣기
                setIsVerification(
                  Object.assign({}, isVerification, { verifyCode: event.target.value }),
                );
              }
            },
          })}
        />
        {isPassedVerifyCode ? (
          <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
        ) : (
          <InputIcon time={time} />
        )}
      </div>
      {isFalsy(errors.verifyCode) === false && (
        <ErrorMessage
          errors={errors}
          name='verifyCode'
          render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
        />
      )}
      <div className='relative border-[1px] border-grey-300'>
        <p className='px-3 py-3 text-XS/Regular text-grey-900'>
          인증번호가 오지 않는다면 수신차단 메시지 혹은 스팸함을 확인해주세요.
        </p>
      </div>
    </div>
  );
};
