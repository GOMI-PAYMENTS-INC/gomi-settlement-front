import { useState } from 'react';

import {
  CountryType,
  FindAccountQueryVariables,
  useVerifyCodeQuery,
} from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';

export const FindUserContainer = () => {
  // 아이디 찾기 변수 값
  const [findAccount, setFindAccount] = useState<FindAccountQueryVariables>();
  const [responseStatus, setResponseStatus] = useState<number>(0);

  const { data: findAccountQuery } = useVerifyCodeQuery(
    graphQLClient,
    {
      user: !findAccount?.user
        ? {
            phone: '',
            verifyCodeSign: '',
          }
        : findAccount.user,
      country: findAccount?.country ? findAccount.country : CountryType.Vn,
    },
    {
      enabled: !!findAccount,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log('useVerifyCodeQuery success', res);
      },
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
        setResponseStatus(error.response.errors[0].extensions.exception.status);
      },
    },
  );

  return {
    setFindAccount,
    findAccountQuery,
    responseStatus,
  };
};
