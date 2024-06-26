import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { _amplitudeFindPwStarted } from '@/amplitude/amplitude.service';
import { VerifyCodeInput } from '@/auth/common/VerifyCodeInput';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import {
  authInitialState,
  eventHandlerByFindAccount,
  isPhoneVerifyPrepared,
} from '@/auth/container';
import { FindAccountTittle, FindPasswordResult } from '@/auth/findAccount/elements';
import { FindAccountBottom } from '@/auth/findAccount/elements/FindAccountBottom';
import { useSendTemporaryPasswordHook } from '@/auth/hooks/account.hook';
import {
  useRequestPhoneAuthHook,
  useVerifyPhoneAuthHook,
} from '@/auth/hooks/phone-auth.hook';
import { FindAccountLayout as Layout } from '@/common/layouts/FindAccountLayout';
import { isFalsy } from '@/utils/isFalsy';
import { isTruthy } from '@/utils/isTruthy';

export const FindPassword = () => {
  const [isVerification, setIsVerification] =
    useState<TVerifyButtonState>(authInitialState);

  const {
    register,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TAuthEssentialProps>({
    mode: 'onChange',
  });

  const { mutate: sendTemporaryPassword } = useSendTemporaryPasswordHook(
    isVerification,
    setIsVerification,
  );

  const { mutate: getVerifyCode } = useRequestPhoneAuthHook(
    isVerification,
    setIsVerification,
    setError,
  );

  useVerifyPhoneAuthHook(isVerification, setIsVerification, setError, getValues('phone'));

  const requestVerifyCodeButton = useMemo(() => {
    return eventHandlerByFindAccount(isVerification);
  }, [isVerification.firstCalled, isVerification.theElseCalled]);

  const { className, disabled, text, phoneNumberInput } = requestVerifyCodeButton.phone;

  const clickVerifyButton = () => {
    const { email, phone } = getValues();

    const isValid = isPhoneVerifyPrepared(
      phone,
      errors,
      isVerification,
      setIsVerification,
      setError,
      email,
    );

    return isValid && getVerifyCode({ phoneNumber: phone });
  };

  useEffect(() => {
    _amplitudeFindPwStarted();
  }, []);

  useEffect(() => {
    const payload = {
      email: getValues('email'),
      phone: getValues('phone'),
      verifyCodeSign: isVerification.verifyCodeSignatureNumber,
    };

    const isValid = Object.values(payload).every((userData) => isTruthy(userData));
    if (
      isVerification.verifyCodeSignatureNumber &&
      isVerification.isExistedAccount === null &&
      isValid
    ) {
      sendTemporaryPassword({
        email: getValues('email'),
        phoneNumber: getValues('phone'),
        verifyCode: isVerification.verifyCodeSignatureNumber,
      });
    }
  }, [isVerification.verifyCodeSignatureNumber]);
  return (
    <Layout>
      {isVerification.isExistedAccount === null ? (
        <div className='space-y-8'>
          <FindAccountTittle
            title='비밀번호를 찾을게요.'
            subTitle='이메일과 회원가입 시 인증한 휴대폰 번호를 입력해주세요.'
          />

          <div className='space-y-2'>
            <input
              className={`inputCustom-textbox w-full xs:text-S/Medium ${
                errors?.email ? 'error' : ''
              }`}
              type='email'
              placeholder='이메일'
              disabled={phoneNumberInput || isVerification.isExceeded}
              {...register('email', {
                required: NOTIFICATION_MESSAGE.emptyEmail,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: NOTIFICATION_MESSAGE.invalidEmail,
                },
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\s/g, '');
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name='email'
              render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
            />
            <div className='flex items-start'>
              <div className='inputCustom-group grow'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    className={`inputCustom-textbox w-full  ${
                      isFalsy(errors.phone) === false && 'error'
                    }`}
                    id='verify'
                    type='text'
                    placeholder='휴대폰번호를 숫자만 입력해주세요.'
                    maxLength={11}
                    disabled={phoneNumberInput || isVerification.isExceeded}
                    {...register('phone', {
                      pattern: {
                        value: /(010)[0-9]{8}$/g,
                        message: NOTIFICATION_MESSAGE.invalidPhone,
                      },
                      onChange: (event) => {
                        event.target.value = event.target.value.replace(/[^0-9]/g, '');
                      },
                    })}
                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (['Enter', 'NumpadEnter'].includes(event.code) === false) return;
                      clickVerifyButton();
                    }}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='phone'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              </div>
              <div className='basis-[102px] xs:basis-0'>
                <button
                  className={className}
                  onClick={() => clickVerifyButton()}
                  disabled={disabled}
                >
                  {text}
                </button>
              </div>
            </div>
            {isVerification.activeVerifyCode && (
              <VerifyCodeInput
                setIsVerification={setIsVerification}
                isVerification={isVerification}
                setError={setError}
                errors={errors}
              />
            )}
          </div>
        </div>
      ) : (
        <FindPasswordResult
          phone={getValues('phone')}
          isExistedAccount={isVerification.isExistedAccount}
          setIsVerification={setIsVerification}
          setValue={setValue}
        />
      )}
      <FindAccountBottom text={'계정이 기억나셨나요?'} />
    </Layout>
  );
};
