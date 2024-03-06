import { ConfigProvider, Table, Tabs } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import { Default } from '@/common/layouts';
import { getApplyColumns } from '@/v2/future-fund/components/ApplyColumns';
import { Header } from '@/v2/future-fund/components/header';
import { PrefundRecord } from '@/v2/prefund/components/DataTable';

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

export const FutureFundApply = () => {
  const [selectedRows, setSelectedRows] = useState<PrefundRecord[]>([]);
  const [tab, setTab] = useState<string>('READY');
  const isLoading = false;
  return (
    <Default useGap>
      <div className='mx-auto w-[1280px]'>
        <Header title='승인 내역' />
        <Tabs
          className='mt-6'
          activeKey={tab}
          onChange={(key) => setTab(key)}
          type='card'
          items={[
            {
              label: `승인 대기`,
              key: 'READY',
            },
            {
              label: `승인 완료`,
              key: 'DONE',
            },
            {
              label: `승인 거절`,
              key: 'REJECT',
            },
          ]}
        />
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
                columns={getApplyColumns()}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys: selectedRows.map((row) => row.key),
                  onChange: (
                    selectedRowKeys: React.Key[],
                    selectedRows: PrefundRecord[],
                  ) => {
                    setSelectedRows(selectedRows);
                  },
                }}
                dataSource={[]}
                scroll={{ x: 'max-content' }}
                pagination={false}
                bordered
              ></Table>
            </ConfigProvider>
          </Wrapper>
        </div>
      </div>
    </Default>
  );
};
