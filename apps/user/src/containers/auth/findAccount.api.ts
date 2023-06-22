import { Dispatch, SetStateAction } from 'react';
import {
  CountryType,
  FindPasswordInput,
  SmsVerifyType,
  useFindAccountQuery,
  useSendSmsVerificationCodeMutation,
  useSendTemporaryPasswordMutation,
  useSmsVerifyCodeConfirmQuery,
} from '@/generated/graphql';
import { STATUS_CODE } from '@/types/enum.code';

import { graphQLClient } from '@/utils/graphqlCient';
import { isTruthy } from '@/utils/isTruthy';
import {
  activateVerifyCode,
  clickVerifyBtn,
  duplicationVerifyTry,
  exceptedVerifyTry,
  getVerifyCodeSignatureNumber,
  isAccountExisted,
} from '@/containers/auth/auth.container';
import { UseFormSetError } from 'react-hook-form';

import {
  _amplitudeFindIdFailed,
  _amplitudeFindIdSucceeded,
  _amplitudeFindPwFailed,
  _amplitudeFindPwSucceeded,
  _amplitudeMobileVerified,
} from '@/amplitude/amplitude.service';

export const useVerifyCode = (
  type: SmsVerifyType,
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TAuthEssentialProps>,
) => {
  const { mutate: mutateRequestVerify } = useSendSmsVerificationCodeMutation(
    graphQLClient().config,
    {
      onSuccess: () => {
        activateVerifyCode(isVerification, setIsVerification);
      },
      onError: (err) => {
        const [error] = err.response.errors;
        setError('phone', { message: error.message });

        if (String(error.extensions.code) === STATUS_CODE.NOT_RETRY_VERIFY_CODE) {
          exceptedVerifyTry(isVerification, setIsVerification);

          return;
        }

        if (String(error.extensions.code) === STATUS_CODE.DUPLICATE_VERIFY_CODE) {
          duplicationVerifyTry(isVerification, setIsVerification);

          return;
        }
        clickVerifyBtn(isVerification, setIsVerification, { firstCalled: false });
      },
    },
  );

  const _getVerifyCode = (phone: string = '') => {
    if (phone?.length !== 11) return;

    const payload = {
      phone: phone,
      country: CountryType.Kr,
      type: type,
    };

    mutateRequestVerify(payload);
  };

  const _checkSmsVerifyCode = (phone: string = '') => {
    const { verifyCode } = isVerification;

    const { isSuccess } = useSmsVerifyCodeConfirmQuery(
      graphQLClient().config,
      { phone, verifyCode },
      {
        enabled: phone?.length === 11 && verifyCode?.length === 6,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          setError('verifyCode', { message: undefined });
          const { signature } = res.smsVerifyCodeConfirm;
          if (signature) {
            getVerifyCodeSignatureNumber(signature, isVerification, setIsVerification);

            //앰플리튜드 전화번호 인증 완료 이벤트
            _amplitudeMobileVerified(phone);
          }
        },
        onError: (err) => {
          const [error] = err.response.errors;

          setError('verifyCode', { message: error.message });
          return;
        },
      },
    );
    return [isSuccess];
  };

  const _getUserAccount = (user: { phone: string; verifyCodeSign: string }) => {
    // "상태에 따라 아이디가 없습니다."  | "아이디 출력"
    const { data } = useFindAccountQuery(
      graphQLClient().config,
      {
        user,
        country: CountryType.Kr,
      },
      {
        enabled: isTruthy(user.verifyCodeSign),
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          isAccountExisted(
            res.findAccount.accounts?.length,
            isVerification,
            setIsVerification,
          );

          if (res.findAccount.accounts.length > 0) {
            _amplitudeFindIdSucceeded();
          } else {
            _amplitudeFindIdFailed();
          }
        },
        onError: (err) => {
          // 계정 없음
        },
      },
    );

    return [data];
  };

  const { mutate: sendTemporaryPassword } = useSendTemporaryPasswordMutation(
    graphQLClient().config,
    {
      onSuccess: (res) => {
        if (res.sendTemporaryPassword.accounts) {
          isAccountExisted(
            res.sendTemporaryPassword.accounts.length,
            isVerification,
            setIsVerification,
          );

          _amplitudeFindPwSucceeded();
        }
      },
      onError: (err) => {
        isAccountExisted(undefined, isVerification, setIsVerification);
        _amplitudeFindPwFailed();
      },
    },
  );

  const _sendTemporaryPassword = (user: FindPasswordInput) => {
    const isValid = Object.values(user).every((userData) => isTruthy(userData));

    if (isValid) {
      const payload = {
        user,
        country: CountryType.Kr,
      };
      sendTemporaryPassword(payload);
    }
  };

  return { _getVerifyCode, _checkSmsVerifyCode, _getUserAccount, _sendTemporaryPassword };
};
