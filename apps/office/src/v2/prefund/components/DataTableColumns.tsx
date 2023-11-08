import { ColumnsType } from 'antd/es/table';

import { PrefundRecord } from '@/v2/prefund/components/DataTable';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getDataTableColumns = (): ColumnsType<PrefundRecord> => {
  return [
    {
      title: '데이터 생성일',
      width: 140,
      dataIndex: 'prefundGroupAt',
      key: 'prefundGroupAt',
      className: 'text-center',
    },
    {
      title: '업체명',
      width: 186,
      dataIndex: 'cardCompanyName',
      key: 'cardCompanyName',
      className: 'text-center',
    },
    {
      title: '카드사',
      width: 142,
      dataIndex: 'cardCompanyName',
      key: 'cardCompanyName',
      className: 'text-center',
    },
    {
      title: '처리 상태',
      width: 124,
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '선정산 금액',
      width: 148,
      dataIndex: 'prefund',
      key: 'prefund',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '은행명',
      width: 124,
      dataIndex: 'bankName',
      key: 'bankName',
      className: 'text-center',
    },
    {
      title: '예금주',
      width: 124,
      dataIndex: 'bankAccountHolder',
      key: 'bankAccountHolder',
      className: 'text-center',
    },
    {
      title: '계좌번호',
      width: 168,
      dataIndex: 'bankAccount',
      key: 'bankAccount',
      className: 'text-center',
    },
    {
      title: 'D-1 매출',
      width: 124,
      dataIndex: 'salesPrice',
      key: 'preSalesPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: 'D-1 카드사 수수료',
      width: 160,
      dataIndex: 'cardCommission',
      key: 'preCardCommission',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '카드사 정산금',
      width: 148,
      dataIndex: 'cardSettlementPrice',
      key: 'cardSettlementPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: 'D-1 과정산금',
      width: 124,
      dataIndex: 'setoff',
      key: 'setoff',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '고미 수수료',
      width: 124,
      dataIndex: 'serviceCommission',
      key: 'serviceCommission',
      className: 'text-right ',
      render: localeValueFormatter,
    },
    {
      title: '거래 ID',
      width: 124,
      dataIndex: 'id',
      key: 'id',
      className: 'text-center',
    },
    {
      title: '이메일',
      width: 176,
      dataIndex: 'email',
      key: 'email',
      className: 'text-center',
    },
    {
      title: '휴대폰 번호',
      width: 170,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      className: 'text-center',
    },
    {
      title: '카드사 정산 예정일',
      width: 153,
      dataIndex: 'cardSettlementGroupAt',
      key: 'cardSettlementGroupAt',
      className: 'text-center',
    },
    {
      title: '선정산 일시',
      width: 176,
      dataIndex: 'prefundAt',
      key: 'prefundAt',
      className: 'text-center',
    },
  ];
};