import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { PrefundStatusEnum } from '@/generated-rest/api/front';
import { usePrefundList, useUpdatePrefundStatus } from '@/hooks/prefund.hook';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { getDataTableColumns } from '@/v2/prefund/components/DataTableColumns';
import { TableFilter } from '@/v2/prefund/components/TableFilter';

const Wrapper = styled.div`
  .ant-table-thead .ant-table-cell,
  .ant-table-row .ant-table-cell {
    height: 40px;
    padding: 10px 16px;
  }

  .ant-table-thead > tr > th {
    text-align: center;
  }
`;

export type PrefundRecord = {
  key: number;
  prefundGroupAt: string;
  name: string;
  cardCompanyName: string;
  status: string;
  prefund: number;
  bankName: string;
  bankAccountHolder: string;
  bankAccount: string;
  salesPrice: number;
  cardCommission: number;
  cardSettlementPrice: number;
  setoff: number;
  serviceCommission: number;
  id: number;
  email: string;
  phoneNumber: string;
  cardSettlementGroupAt: string;
  prefundAt: string;
};

export const DataTable = ({ status }: { status: PrefundStatusEnum }) => {
  const [filter] = useRecoilState(PrefundFilterAtom);
  const [selectedRows, setSelectedRows] = useState<PrefundRecord[]>([]);
  const listColumn: ColumnsType<PrefundRecord> = getDataTableColumns();

  const { mutateAsync: updatePrefundStatus } = useUpdatePrefundStatus();
  const { refetch, data, isLoading } = usePrefundList({
    status,
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });

  /*** 선정산 상태 변경 ***/
  const handleUpdateStatus = async (updateStatus: PrefundStatusEnum) => {
    const prefundIds = selectedRows.map((i) => i.id);
    if (!prefundIds.length) {
      toast.error('변경할 선정산을 선택해주세요.');
      return;
    }

    await updatePrefundStatus({
      status: updateStatus,
      prefundIds,
    });
    await refetch();
  };

  const prefundAmount = selectedRows.reduce((acc, cur) => acc + cur.prefund, 0);
  return (
    <>
      <TableFilter amount={prefundAmount} onUpdate={handleUpdateStatus} />
      <div className='mx-auto w-[1280px]'>
        <Wrapper className='gm-h-full mt-[10px]'>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: '#F5F5F5',
                  headerColor: '#595959',
                  headerBorderRadius: 0,
                  colorText: '#595959',
                },
              },
            }}
          >
            <Table
              loading={isLoading}
              columns={listColumn}
              rowSelection={{
                type: 'checkbox',
                onChange: (
                  selectedRowKeys: React.Key[],
                  selectedRows: PrefundRecord[],
                ) => {
                  setSelectedRows(selectedRows);
                },
              }}
              dataSource={(data || []).map((item) => ({
                ...item,
                key: item.id,
                prefund: item.salesPrice + item.cardCommission + item.setoff,
                cardSettlementPrice: item.salesPrice + item.cardCommission,
              }))}
              scroll={{ x: 'max-content' }}
              pagination={false}
              bordered
            ></Table>
          </ConfigProvider>
        </Wrapper>
      </div>
    </>
  );
};
