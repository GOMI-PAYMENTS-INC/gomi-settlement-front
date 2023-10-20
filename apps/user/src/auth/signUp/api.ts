import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AMPLITUDE_ACCOUNT_TYPE } from '@/amplitude/amplitude.enum';
import { _setUserProperties } from '@/amplitude/amplitude.service';
import { _amplitudeSignupCompleted } from '@/amplitude/amplitude.service';
import { AUTH_ESSENTIAL } from '@/auth/constants';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { setWelcomeModalClosingTime } from '@/auth/container';
import {
  GoogleSignupMutation,
  MutationSignupArgs,
  Role,
  SignupMutation,
  useExistsUserEmailQuery,
  useGoogleSignupMutation,
  useSignupMutation,
} from '@/generated/graphql';
import { TERM_TYPE } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';

export const useSignUp = () => {
  const { mutate: signUpMutate } = useSignupMutation({
    onError: () => {
      toast.error('회원가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const _applyAccount = (
    value: TAuthEssentialProps,
    verifyCodeSignatureNumber: string,
    signUpEvent: TTermsCheckState,
    setSignupEvent: Dispatch<SetStateAction<TTermsCheckState>>,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    if (/^\s+|\s+$/g.test(value.password) === true)
      return setError('password', { message: NOTIFICATION_MESSAGE.whiteSpace });
    const _value = Object.assign(value, { verifyCode: verifyCodeSignatureNumber });

    const isValid = Object.keys(_value).filter((item) => {
      const key = item as keyof TAuthEssentialProps;
      if (isFalsy(_value[key])) {
        setError(key, { message: AUTH_ESSENTIAL[key] });
        return false;
      }
      return true;
    });
    //FIXME: validation 로직은 비즈니스로 옮기기
    const checkedTerms = [TERM_TYPE.PERSONAL_AGREE, TERM_TYPE.USE_AGREE].every((term) =>
      signUpEvent.checkedTerms.includes(term),
    );
    const isAgreeMarketing = signUpEvent.checkedTerms.includes(TERM_TYPE.MARKETING_AGREE);
    const isValidVerifyCodeSign = isFalsy(verifyCodeSignatureNumber);
    const isValidTerms = isFalsy(checkedTerms);

    if (isValid.length !== 5 || isValidVerifyCodeSign || isValidTerms) return;

    const { email, password, phone } = value;

    const payload = {
      email: email,
      password: password,
      name: '',
      phone: phone,
      verifyCodeSign: verifyCodeSignatureNumber,
      makettingAgree: isAgreeMarketing,
    };

    const signupFormValue: MutationSignupArgs = {
      user: { ...payload },
    };

    signUpMutate(signupFormValue, {
      onSuccess: async (res: SignupMutation) => {
        //로그인 처리
        authTokenStorage.setToken(res.signup.token);

        //모달이 켜지고 화면 이동
        setWelcomeModalClosingTime(1500, signUpEvent, setSignupEvent);

        await _amplitudeSignupCompleted(
          AMPLITUDE_ACCOUNT_TYPE.LOCAL,
          email,
          phone,
          isAgreeMarketing,
          () => {
            _setUserProperties(email, isAgreeMarketing, phone, Role.User);
          },
        );
      },
    });
  };

  const _isExistedAccount = (
    email: string,
    triggerConfirmEmail: boolean,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    const regex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return useExistsUserEmailQuery(
      { email },
      {
        enabled: regex.test(email) === true && triggerConfirmEmail,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          if (res.existsUserEmail) {
            setError('email', {
              type: 'custom',
              message: '이미 가입된 이메일 주소입니다.',
            });
          }
        },
        onError: () => {
          setError('email', { type: 'custom', message: undefined });
        },
      },
    );
  };

  const { mutate: signUpSocialMutate } = useGoogleSignupMutation({
    onError: () => {
      toast.error('회원 가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const _applySocialAccount = (
    value: {
      phone: string;
      verifyCode: string;
      requiredAgreeTerm: TTermsType[] | string[];
    },
    token: string,
    signUpEvent: TTermsCheckState,
    setSignupEvent: Dispatch<SetStateAction<TTermsCheckState>>,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    const { phone, verifyCode, requiredAgreeTerm } = value;

    const isCheckedTerms = [TERM_TYPE.PERSONAL_AGREE, TERM_TYPE.USE_AGREE].every((term) =>
      requiredAgreeTerm.includes(term),
    );
    const isAgreeMarketing = signUpEvent.checkedTerms.includes(TERM_TYPE.MARKETING_AGREE);
    const isValidVerifyCodeSign = isFalsy(verifyCode);
    const isValidTerms = isFalsy(isCheckedTerms);

    const isValid = Object.keys(value).filter((item) => {
      const key = item as 'phone' | 'requiredAgreeTerm' | 'verifyCode';
      if (isFalsy(value[key])) {
        setError(key, { message: AUTH_ESSENTIAL[key] });
        return false;
      }
      return true;
    });

    if (isValid.length !== 3 || isValidVerifyCodeSign || isValidTerms) return;

    const payload = {
      idToken: token,
      phone: phone,
      verifyCodeSign: verifyCode,
      makettingAgree: isAgreeMarketing,
    };

    signUpSocialMutate(
      { socialSignUpDto: payload },
      {
        onSuccess: async (res: GoogleSignupMutation) => {
          if (res.googleSignUp.token) {
            setWelcomeModalClosingTime(1500, signUpEvent, setSignupEvent);
            authTokenStorage.setToken(res.googleSignUp.token);
          }
          await _amplitudeSignupCompleted(
            AMPLITUDE_ACCOUNT_TYPE.GOOGLE,
            token,
            phone,
            isAgreeMarketing,
            () => {},
          );
        },
      },
    );
  };

  return { _applyAccount, _isExistedAccount, _applySocialAccount };
};
