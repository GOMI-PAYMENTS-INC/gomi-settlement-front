const lineClampPlugin = require('@tailwindcss/line-clamp');
const daisyui = require('daisyui');
const tailwindcssBgSvg = require('tailwindcss-bg-svg');

module.exports = {
  //line-clamp 사용법 : https://postsrc.com/code-snippets/how-to-multi-line-trucate-text-in-tailwindcss
  plugins: [
    lineClampPlugin,
    daisyui,
    tailwindcssBgSvg,
    ({ addComponents }) => {
      addComponents({
        '.textButton-primary-default-large-none': {
          '@apply py-3 px-[14px] text-orange-500 text-M/Bold': {},
        },
        '.textButton-secondary-default-small-none': {
          '@apply py-2 px-1 text-grey-800 text-XS/Medium': {},
        },
        '.button-text-normal-small-grey-false-false-true': {
          '@apply rounded bg-none p-2 text-grey-800 text-XS/Bold': {},
        },
        '.button-filled-normal-medium-grey-false-false-true': {
          '@apply rounded bg-grey-200 p-2.5 text-grey-800 text-S/Bold disabled:text-grey-500': {},
        },
        '.button-filled-normal-large-primary-false-false-true': {
          '@apply rounded bg-orange-500 px-2.5 py-3 text-white text-M/Bold': {},
        },
        '.button-filled-normal-xLarge-primary-false-false-true': {
          '@apply rounded bg-orange-500 px-2.5 py-4 text-white text-L/Bold': {},
        },
        '.button-filled-disabled-xLarge-primary-false-false-true': {
          '@apply rounded bg-grey-300 py-4 text-L/Bold text-grey-500': {},
        },
        '.button-outlined-normal-large-primary-false-false-true': {
          '@apply rounded bg-white py-3 text-M/Bold text-primary-red-orange border border-orange-300 min-w-[160px]':
              {},
        },
        '.button-outlined-normal-xLarge-grey-true-false-true': {
          '@apply grid gap-x-1 justify-center grid-cols-[24px_auto] rounded bg-white py-4 text-L/Bold text-grey-800 border border-grey-400':
            {},
        },
        '.button-outlined-normal-xLarge-primary-false-false-true': {
          '@apply rounded bg-white py-4 border-orange-300 text-L/Bold text-primary-red-orange border':
            {},
        },
      });
    },
  ],
  daisyui: { themes: false },
  theme: {
    bgSvg: {
      'Filled/CheckSquare':
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM16.3008 8.57109L11.3648 15.4148C11.2959 15.5111 11.2049 15.5896 11.0995 15.6437C10.9942 15.6978 10.8774 15.7261 10.759 15.7261C10.6405 15.7261 10.5238 15.6978 10.4184 15.6437C10.3131 15.5896 10.2221 15.5111 10.1531 15.4148L7.23047 11.3648C7.14141 11.2406 7.23047 11.0672 7.38281 11.0672H8.48203C8.72109 11.0672 8.94844 11.182 9.08906 11.3789L10.7578 13.6945L14.4422 8.58516C14.5828 8.39062 14.8078 8.27344 15.0492 8.27344H16.1484C16.3008 8.27344 16.3898 8.44688 16.3008 8.57109Z" fill="svgcolor"/></svg>',
      'Filled/CheckSquareUnchecked':
        '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1875 2.1875H2.8125C2.4668 2.1875 2.1875 2.4668 2.1875 2.8125V17.1875C2.1875 17.5332 2.4668 17.8125 2.8125 17.8125H17.1875C17.5332 17.8125 17.8125 17.5332 17.8125 17.1875V2.8125C17.8125 2.4668 17.5332 2.1875 17.1875 2.1875ZM16.4062 16.4062H3.59375V3.59375H16.4062V16.4062Z" fill="svgcolor"/></svg>',
      'Outlined/Check':
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.3754 4.45312H19.7371C19.5074 4.45312 19.2894 4.55859 19.1488 4.73906L9.48554 16.9805L4.85194 11.1094C4.78185 11.0204 4.6925 10.9484 4.59061 10.8989C4.48873 10.8494 4.37695 10.8236 4.26366 10.8234H2.62538C2.46835 10.8234 2.38163 11.0039 2.47772 11.1258L8.89725 19.2586C9.19725 19.6383 9.77382 19.6383 10.0762 19.2586L21.523 4.75313C21.6191 4.63359 21.5324 4.45312 21.3754 4.45312V4.45312Z" fill="svgcolor"/></svg>',
    },
    extend: {
      //색상
      colors: {
        primary: {
          'red-orange': '#FF5100',
        },

        orange: {
          900: '#9E2F00',
          800: '#B83A00',
          700: '#D54400',
          600: '#E64900',
          500: '#FF5100',
          400: '#FF6C28',
          300: '#FFA378',
          200: '#FFDAC8',
          100: '#FFF5F0',
          60: '#FFF8F5',
        },

        grey: {
          50: '#FCFCFC',
          100: '#F8F8F8',
          200: '#F5F5F5',
          300: '#EBEBEB',
          400: '#D9D9D9',
          500: '#BFBFBF',
          600: '#A8A8A8',
          700: '#8C8C8C',
          800: '#595959',
          900: '#262626',
        },
        //text-functional-success, text-orange-500
        functional: {
          link: '#4090F7',
          success: '#72C040',
          warning: '#EFAF41',
        },
      },

      //폰트 설정
      fontSize: {
        '4XL/Bold': [' 48px', { fontWeight: 700, lineHeight: '60px' }],
        '4XL/Medium': ['48px', { fontWeight: 500, lineHeight: '60px' }],
        '4XL/Regular': ['48px', { fontWeight: 400, lineHeight: '60px' }],
        '4XL/Light': ['48px', { fontWeight: 400, lineHeight: '60px' }],

        '3XL/Bold': ['32px', { fontWeight: 700, lineHeight: '40px' }],
        '3XL/medium': ['32px', { fontWeight: 500, lineHeight: '40px' }],
        '3XL/Regular': ['32px', { fontWeight: 400, lineHeight: '40px' }],
        '3XL/Light': ['32px', { fontWeight: 400, lineHeight: '40px' }],

        '2XL/Bold': ['24px', { fontWeight: 700, lineHeight: '32px' }],
        '2XL/Medium': ['24px', { fontWeight: 500, lineHeight: '32px' }],
        '2XL/Regular': ['24px', { fontWeight: 400, lineHeight: '32px' }],
        '2XL/Light': ['24px', { fontWeight: 400, lineHeight: '32px' }],

        'XL/Bold': ['20px', { fontWeight: 700, lineHeight: '28px' }],
        'XL/Medium': ['20px', { fontWeight: 500, lineHeight: '28px' }],
        'XL/Regular': ['20px', { fontWeight: 400, lineHeight: '28px' }],
        'XL/Light': ['20px', { fontWeight: 300, lineHeight: '28px' }],

        'L/Bold': ['18px', { fontWeight: 700, lineHeight: '26px' }],
        'L/Medium': ['18px', { fontWeight: 500, lineHeight: '26px' }],
        'L/Regular': ['18px', { fontWeight: 400, lineHeight: '26px' }],
        'L/Light': ['18px', { fontWeight: 300, lineHeight: '26px' }],

        'M/Bold': ['16px', { fontWeight: 700, lineHeight: '24px' }],
        'M/Medium': ['16px', { fontWeight: 500, lineHeight: '24px' }],
        'M/Regular': ['16px', { fontWeight: 400, lineHeight: '24px' }],
        'M/Light': ['16px', { fontWeight: 300, lineHeight: '24px' }],

        'S/Bold': ['14px', { fontWeight: 700, lineHeight: '20px' }],
        'S/Medium': ['14px', { fontWeight: 500, lineHeight: '20px' }],
        'S/Regular': ['14px', { fontWeight: 400, lineHeight: '20px' }],
        'S/Light': ['14px', { fontWeight: 300, lineHeight: '20px' }],

        'XS/Bold': ['12px', { fontWeight: 700, lineHeight: '16px' }],
        'XS/Medium': ['12px', { fontWeight: 500, lineHeight: '16px' }],
        'XS/Regular': ['12px', { fontWeight: 400, lineHeight: '16px' }],
        'XS/Light': ['12px', { fontWeight: 300, lineHeight: '16px' }],

        '2XS/Bold': ['10px', { fontWeight: 700, lineHeight: '12px' }],
        '2XS/Medium': ['10px', { fontWeight: 500, lineHeight: '12px' }],
        '2XS/Regular': ['10px', { fontWeight: 400, lineHeight: '12px' }],
        '2XS/Light': ['10px', { fontWeight: 300, lineHeight: '12px' }],
      },

      boxShadow: {
        inputHover: '0px 0px 4px rgba(255, 163, 120, 0.5)',
      },
    },
  },
};
