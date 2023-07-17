import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { routeList } from '@/router/routeList';
import { isIncluded } from '@/utils/isIncluded';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { PATH } from '@/types/enum.code';
import { menuData } from '@/common/layouts/sidebar/constants';
import { TSidebarAction } from '@/common/layouts/sidebar/reducer';
import {
  onClickUserMenu,
  toggleDepth2Menu,
  toggleSidebar,
} from '@/common/layouts/sidebar/container';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';
import { MeQuery } from '@/generated/graphql';
import { UserAtom } from '@/atom/auth/auth-atom';
import { useRecoilValue } from 'recoil';
import { signInApi } from '@/auth/signIn/api';
import { openBrowser } from '@/utils/openBrowser';

interface TSideBarProps {
  openWidth: number;
  closeWidth: number;
  _state: TSidebarState;
  _dispatch: Dispatch<TSidebarAction>;
}
const SideBar = (props: TSideBarProps) => {
  const { openWidth, closeWidth, _state, _dispatch } = props;
  const { onLogout } = signInApi();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [{ route }] = matchRoutes(routeList, pathname) || [];
  const { path } = route;
  const modalEl = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<MeQuery | undefined>(undefined);

  useEffect(() => {
    const clickOutside = (event: any) => {
      if (
        _state.openedUserMenu &&
        modalEl.current &&
        !modalEl.current?.contains(event.target)
      ) {
        onClickUserMenu(_dispatch);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [_state.openedUserMenu]);

  const userAtom = useRecoilValue(UserAtom);
  useEffect(() => {
    if (userAtom) {
      setUserInfo(userAtom);
    }
  }, [userAtom]);

  return (
    <aside className='fixed left-0 z-50 h-full'>
      {_state.openedSidebar ? (
        <div
          className={`flex h-full w-[${openWidth}px] flex-[0_0_${openWidth}px] flex-col justify-between border-r-[1px] border-r-grey-200 bg-white`}
        >
          <div className='px-2.5'>
            <div className='flex h-20 items-center'>
              <button
                onClick={() => toggleSidebar(_dispatch)}
                className='iconButton-large-normal-ghost-grey'
              >
                <ReactSVG
                  src='/assets/icons/outlined/MenuFold.svg'
                  className='cursor-pointer'
                />
              </button>

              <Link to={PATH.SEARCH_PRODUCTS}>
                <ReactSVG
                  src='/assets/icons/Logo.svg'
                  className='cursor-pointer'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'w-[124.5px] ml-3');
                  }}
                />
              </Link>
            </div>
            <ul>
              {menuData.map((menu, menuIndex) => {
                //FIXME 리듀서 상태관리로 수정할 것 casey 23.02.28
                //상위 메뉴가 켜진 상태
                let isCollapsedActive = false;
                //상위 메뉴가 접힌 상태
                let isCollapsed = _state.openedDepthList.includes(menu.key);
                //접혔을 때
                if (isCollapsed === false) {
                  isCollapsedActive = isIncluded(path, ...menu.path);
                }

                return (
                  <li className='' key={menuIndex}>
                    <button
                      className={`flex w-full cursor-pointer justify-between rounded-lg p-3 text-S/Medium text-grey-800 ${
                        isCollapsedActive && 'bg-orange-100 text-orange-600'
                      }`}
                      onClick={() => toggleDepth2Menu(_state, _dispatch, menu.key)}
                    >
                      <div className='flex items-center'>
                        <ReactSVG
                          src={menu.iconPath}
                          className='cursor-pointer '
                          beforeInjection={(svg) => {
                            svg.setAttribute(
                              'class',
                              `w-5 ${
                                isCollapsedActive ? 'fill-orange-500' : `fill-grey-800 `
                              }`,
                            );
                          }}
                        />
                        <span className='ml-2'>{menu.title}</span>
                      </div>
                      <ReactSVG
                        src='/assets/icons/outlined/Chevronup.svg'
                        className={`cursor-pointer ${isCollapsed ? `` : `rotate-180`}`}
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'w-3 fill-grey-800');
                        }}
                      />
                    </button>
                    {isCollapsed && menu.children.length ? (
                      <ul className='mx-4'>
                        {menu.children.map((child, childIndex) => {
                          let isActive: boolean = false;
                          if (child.activePath.length) {
                            isActive = isIncluded(path, ...child.activePath);
                          } else {
                            isActive = isIncluded(path, child.path);
                          }
                          return (
                            <li key={childIndex}>
                              <button
                                className={`flex  w-full cursor-pointer items-center rounded-lg py-2 pl-5 text-S/Medium ${
                                  isActive && 'bg-orange-100 text-orange-500'
                                }`}
                                onClick={() => navigation(child.path)}
                              >
                                <ReactSVG
                                  src={child.iconPath}
                                  className='cursor-pointer'
                                  beforeInjection={(svg) => {
                                    svg.setAttribute(
                                      'class',
                                      `w-4 ${
                                        isActive ? 'fill-orange-500' : `fill-grey-800 `
                                      }`,
                                    );
                                  }}
                                />
                                <span className='ml-2'>{child.title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='divide-y divide-grey-300'>
            <ul className='flex flex-col items-center gap-y-4 py-6 px-2.5'>
              <li>
                <a href='http://starterclub.kr' target='_blank'>
                  <ReactSVG
                    src='/assets/icons/sideBanner-2.svg'
                    className='cursor-pointer '
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', `w-[180px]`);
                      svg.setAttribute('alt', `해외수출 셀러 카페 스타터 클럽`);
                    }}
                  />
                </a>
              </li>
              <li>
                <a href='https://open.kakao.com/o/g0ONQdRb' target='_blank'>
                  <ReactSVG
                    src='/assets/icons/sideBanner-3.svg'
                    className='cursor-pointer '
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', `w-[180px]`);
                      svg.setAttribute('alt', `쇼피 셀러모임 오픈카톡 입장`);
                    }}
                  />
                </a>
              </li>
            </ul>
            <div className='px-2.5 '>
              <div className='flex justify-between rounded-lg p-3 text-S/Medium text-grey-800'>
                <button
                  className='flex items-center'
                  onClick={() => {
                    openBrowser(
                      'https://gomicorp.notion.site/611d950ad238426ba16a96eb0631f739',
                    );
                    _amplitudeMovedToUserGuide('lnb');
                  }}
                >
                  <ReactSVG
                    src='/assets/icons/outlined/QuestionCircle.svg'
                    className='cursor-pointer '
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', `w-5 fill-grey-800`);
                    }}
                  />
                  <span className='ml-2 cursor-pointer'>사용자 가이드</span>
                </button>
              </div>
            </div>
            <div className='space-y-3 py-6 px-4'>
              <div className='inline-block rounded-sm bg-grey-700 px-[7px] py-0.5 leading-none'>
                <span className='text-XS/Medium text-grey-100'>무료체험</span>
              </div>
              <div className='h-[6px] w-full rounded-[28px] bg-gradient-to-r from-orange-500 to-orange-300'></div>
              <div className='flex items-center justify-between'>
                <div className='text-XS/Medium'>리포트 발행 수</div>
                <ReactSVG
                  src='/assets/icons/outlined/Infinity.svg'
                  // className='cursor-pointer '
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `w-5 fill-grey-800`);
                  }}
                />
              </div>
            </div>
            <div>
              <a href='#' onClick={() => onClickUserMenu(_dispatch)}>
                <div className='flex cursor-pointer items-center justify-between px-4 py-[18px]'>
                  <p className='text-S/Medium text-grey-800'>
                    {userInfo ? replaceOverLength(userInfo.me.email, 17) : ''}
                  </p>
                  <ReactSVG
                    src='/assets/icons/outlined/ArrowRight-Small.svg'
                    className='cursor-pointer'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', `w-6 fill-grey-800`);
                    }}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex h-full w-[${closeWidth}px] flex-[0_0_${closeWidth}px] flex-col justify-between border-r-[1px] border-r-grey-200 bg-white px-2.5`}
        >
          <div>
            <div className='flex h-20 items-center justify-center'>
              <button
                className='iconButton-large-normal-ghost-grey'
                onClick={() => toggleSidebar(_dispatch)}
              >
                <ReactSVG
                  src='/assets/icons/outlined/MenuOpen.svg'
                  className='cursor-pointer'
                />
              </button>
            </div>
            <ul>
              {menuData.map((menu, menuIndex) => {
                const isActive = isIncluded(path, ...menu.path);
                return (
                  <li
                    className='cursor-pointer text-S/Medium text-grey-800'
                    key={menuIndex}
                  >
                    <button
                      className={`${
                        isActive ? `bg-orange-100` : `bg-white`
                      } flex justify-between rounded-lg p-3`}
                      onClick={() => toggleDepth2Menu(_state, _dispatch, menu.key)}
                    >
                      <div className='flex items-center'>
                        <ReactSVG
                          src={menu.iconPath}
                          className='cursor-pointer'
                          beforeInjection={(svg) => {
                            svg.setAttribute(
                              'class',
                              `h-5 w-5 ${isActive ? 'fill-orange-500' : 'text-grey-900'}`,
                            );
                          }}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className='mb-6 space-y-6 leading-none'>
            <li className='text-center'>
              <button
                className='iconButton-medium-normal-ghost-grey'
                onClick={() => {
                  openBrowser(
                    'https://gomicorp.notion.site/611d950ad238426ba16a96eb0631f739',
                  );
                  _amplitudeMovedToUserGuide('lnb');
                }}
              >
                <ReactSVG
                  src='/assets/icons/outlined/QuestionCircle.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'h-4 w-4 ');
                  }}
                />
              </button>
            </li>
            <li className='text-center'>
              <button
                className='iconButton-medium-normal-ghost-grey'
                onClick={() => onClickUserMenu(_dispatch)}
              >
                <ReactSVG
                  src='/assets/icons/outlined/User.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'h-4 w-4 ');
                  }}
                />
              </button>
            </li>
          </ul>
        </div>
      )}
      {_state.openedUserMenu ? (
        <div
          className='absolute bottom-4 right-[-10px] z-10 w-[216px] translate-x-full rounded-lg bg-white shadow-[0px_2px_41px_rgba(0,0,0,0.1)]'
          ref={modalEl}
        >
          <ul className=''>
            <li className='px-4 py-3'>
              <a
                href='#'
                onClick={() => void onLogout()}
                className='text-S/Regular text-red-700'
              >
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </aside>
  );
};

export default SideBar;