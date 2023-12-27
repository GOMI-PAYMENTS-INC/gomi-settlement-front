import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { ApplyRecord } from '@/v2/member/components/apply/DataTable';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getDataTableColumns = (): ColumnsType<ApplyRecord> => {
  return [
    {
      title: '신청 일시',
      width: 160,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => dayjs(value).format('YYYY-MM-DD hh:mm:ss'),
      className: 'text-center',
    },
    {
      title: '상태',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '정산금 조회 금액',
      width: 142,
      dataIndex: 'prefund',
      key: 'prefund',
      className: 'text-right',
      render: (value: number, record: ApplyRecord) =>
        record.isPrefund ? localeValueFormatter(value) : '조회안함',
    },
    {
      title: '상호',
      width: 124,
      dataIndex: 'companyName',
      key: 'companyName',
      className: 'text-center',
    },
    {
      title: '담당자명',
      width: 124,
      dataIndex: 'name',
      key: 'name',
      className: 'text-center',
    },
    {
      title: '연락처',
      width: 148,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      className: 'text-center',
    },
    {
      title: '이메일',
      width: 124,
      dataIndex: 'email',
      key: 'email',
      className: 'text-center',
    },
  ];
};