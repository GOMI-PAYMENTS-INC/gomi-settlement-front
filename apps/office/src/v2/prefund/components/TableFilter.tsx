import { Button, Select } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { PrefundStatusEnum } from '@/generated-rest/api/front';

export const TableFilter = ({
  amount,
  onUpdate,
}: {
  amount: number;
  onUpdate(status: PrefundStatusEnum): void;
}) => {
  const [status, setStatus] = useState<PrefundStatusEnum | null>(null);
  const handleChange = (value: PrefundStatusEnum) => {
    setStatus(value);
  };

  const handleUpdate = () => {
    if (!status) {
      toast.error('변경할 상태를 선택해주세요.');
      return;
    }

    onUpdate(status);
    setStatus(null);
  };

  return (
    <div className='mx-auto mt-[24px] flex w-[1280px] justify-between'>
      <div className='flex items-center'>
        <div className='mr-[20px] text-S/Regular text-grey-700'>선정산 금액 합계</div>
        <div className='text-XL/Bold text-orange-500'>{amount.toLocaleString()}원</div>
      </div>
      <div className='flex items-center'>
        <div className='mr-[11px] text-S/Regular text-grey-700'>선택 건 상태</div>
        <Select
          placeholder='변경할 상태를 선택해주세요.'
          className='mr-[40px]'
          value={status}
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: PrefundStatusEnum.READY, label: '출금 준비' },
            { value: PrefundStatusEnum.DEPOSIT_DONE, label: '출금 완료' },
            { value: PrefundStatusEnum.DONE, label: '거래 완료' },
          ]}
        />
        <Button onClick={handleUpdate} type='primary'>
          변경
        </Button>
      </div>
    </div>
  );
};