import { PATH } from '@/types/enum.code';
import { StatusTag } from '@/components/statusTag';
import { convertTime } from '@/utils/parsingTimezone';
import { ReactSVG } from 'react-svg';
import { Link, useNavigate } from 'react-router-dom';
import { onCheckReportList, reportListConverter } from '@/report/container';
import { Dispatch, Fragment } from 'react';

type TReportListColumn = {
  _state: TReportListState;
  _dispatch: Dispatch<TReportListAction>;
};
export const ReportListColumn = ({ _state, _dispatch }: TReportListColumn) => {
  const navigate = useNavigate();

  const addLink = (
    report: TReportItem,
    content: JSX.Element | string | number,
    useNoPrint?: boolean,
  ) => {
    if (report.status !== 'DONE') {
      return useNoPrint ? '-' : <div className='block w-full py-4'>{content}</div>;
    } else {
      return (
        <Link
          to={`${PATH.REPORT_LIST}/${report.id}?limit=${_state.limit}&page=${_state.page}`}
          className='block w-full py-4'
        >
          {content}
        </Link>
      );
    }
  };

  const ListColumn = () => {
    return (
      <Fragment>
        {_state.data.reports.length > 0 ? (
          _state.data.reports.map((report: TReportItem, idx) => {
            const reportConverterData = reportListConverter(report);
            let isChecked = false;
            isChecked = _state.checkedItems.find((value) => value.id === report.id)
              ? true
              : false;

            return (
              <tr
                className={`border border-l-0 border-r-0 border-t-0 border-grey-200 last:border-b-0 hover:bg-grey-200 ${
                  report.status !== 'DONE' ? 'bg-grey-100 opacity-50' : 'text-grey-800 '
                }`}
                key={`table_row_${idx}`}
              >
                <td className='text-center '>
                  <input
                    type='checkbox'
                    name='reports[]'
                    id={`Check-${report.id}`}
                    className='checkboxCustom peer'
                    disabled={report.status !== 'DONE'}
                    onChange={(event) =>
                      onCheckReportList(
                        _dispatch,
                        _state.data,
                        _state.checkedItems,
                        report,
                        event.target.checked,
                      )
                    }
                    checked={isChecked}
                  />
                  <label
                    htmlFor={`Check-${report.id}`}
                    className='checkboxCustom-label  bg-[length:20px_20px] bg-[left_50%_top_50%] text-transparent'
                  >
                    선택
                  </label>
                </td>
                <td className='text-M/Regular'>{addLink(report, report.keyword)}</td>
                <td>
                  {addLink(
                    report,
                    <StatusTag
                      text={reportConverterData.status.text}
                      sentiment={reportConverterData.status.sentiment}
                    ></StatusTag>,
                  )}
                </td>
                <td>
                  {addLink(
                    report,
                    <div className='flex items-center'>
                      <ReactSVG
                        src={reportConverterData.countryCode.iconPath}
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'w-4 h-4');
                        }}
                      ></ReactSVG>
                      <p className='ml-2 text-S/Regular'>
                        {reportConverterData.countryCode.text}
                      </p>
                    </div>,
                  )}
                </td>
                <td>
                  {addLink(
                    report,
                    <div className='flex items-center'>
                      <ReactSVG
                        src={reportConverterData.sortBy.iconPath}
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'w-4 h-4');
                        }}
                      ></ReactSVG>
                      <p className='ml-2 text-S/Regular'>
                        {reportConverterData.sortBy.text}
                      </p>
                    </div>,
                  )}
                </td>
                <td>
                  <p className='text-S/Regular'>
                    {addLink(
                      report,
                      convertTime(report.createdAt.toString(), 'YYYY.MM.DD'),
                      true,
                    )}
                  </p>
                </td>
                <td>
                  {addLink(
                    report,
                    <ReactSVG
                      src='/assets/icons/outlined/ChevronRight2.svg'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', `w-6 fill-grey-600`);
                      }}
                    />,
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={8}>
              <div className='grid justify-items-center pt-[104px] text-center'>
                <img src={`/assets/images/EmptyBox.png`} alt='검색 결과 없음 아이콘' />
                <div className='mt-4 text-L/Medium'>
                  <p>조회 가능한 리포트가 없어요.</p>
                  <p>키워드를 검색하여 리포트를 생성해보세요.</p>
                </div>
                <div className='mt-10'>
                  <button
                    onClick={() => navigate(PATH.SEARCH_PRODUCTS)}
                    className='button-outlined-normal-large-primary-false-false-true min-w-[160px]'
                  >
                    키워드 검색하기
                  </button>
                </div>
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {_state.spinnerEvent === false ? (
        <tr>
          <td colSpan={8}>
            <div className='grid justify-items-center pt-[255px] text-center'>
              <div className='scale-[0.3]'>
                <div id='loader' />
              </div>
            </div>
          </td>
        </tr>
      ) : (
        <ListColumn />
      )}
    </Fragment>
  );
};