export enum SEND_TEMPORARY_PASSWORD_RESULT {
  MEMBER = 200,
  // TODO : 오류 코드 find-id와 통일 시켜야 합니다. - 소진
  STRANGER = 1004,
  NOTMATCHCODE = 1001,
}

export enum FIND_ACCOUNT_RESULT {
  MEMBER = 200,
  STRANGER = 1002,
  NOTMATCHCODE = 1001,
}

export enum STATUS_CODE {
  DEFAULT = '',
  SUCCESS = '0000',

  USER_NOT_FOUND = '1000',
  SMS_INVALID_CODE = '1001',
  INVALID_PHONE = '1002"',
  INVALID_PASSWORD = '1003',
  USER_NOT_EXIST = '1004',
  NOT_VERIFY_CONFIRM = '1005',
  USER_ALREADY_EXISTS = '1006',
  INVALID_USER = '1000',
  WRONG_PHONE = '1007',
  NOT_RETRY_VERIFY_CODE = '1008',
  DUPLICATE_VERIFY_CODE = '1009',
  NOT_EXIST_PASSWORD = '1010',

  NOT_EXIST_SEARCH_KEYWORD = '1101',

  INVALID_PATH = '9400',
  INVALID_PARAMETERS = '9400',
  INVALID_TOKEN = '9401',
  SMS_SEND_FAILED = '9400',
  INVALID_GRAPHQL_QUERY = '9400',
  IS_SHOPEE_SYSTEM_FAILED = '9500',
  ERROR = '9999',
}

export enum COUNTRY_TYPE {
  /** 싱가포르 */
  SG = 'SG',
  /** 말레이시아 */
  MY = 'MY',
  /** 대만 */
  TW = 'TW',
  /** 베트남 */
  VN = 'VN',
  /** 태국 */
  TH = 'TH',
}

export enum LANGUAGE_TYPE {
  /** 영어 */
  US = 'US',
  /** 중국어 (번체) */
  CN = 'CN',
  /** 베트남어 */
  VN = 'VN',
  /** 태국어 */
  TH = 'TH',
}

export enum CHANNEL_TYPE {
  SHOPEE = 'SHOPEE',
  NONE = 'NONE',
}
export enum SORT_BY_TYPE {
  R = 'R',
  S = 'S',
}

export enum TITLE {
  REPORT = 'Report',
  MARKET_SIZE = 'MarketSize',
  KEYWORD_INFO = 'KeywordInfo',
  BRAND_ANALYSIS = 'BrandAnalysis',
  SALE_PRICE = 'SalePrice',
  OVERSEA_PRODUCT = 'overseaProduct',
  CATEGORY_ANALYSIS = 'CategoryAnalysis',
}

export enum TAG_SENTIMENT_STATUS {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  ATTENTIVE = 'attentive',
  INFORMATIVE = 'informative',
  NEUTRAL = 'neutral',
}

export enum BATCH_STATUS {
  WAIT = 'WAIT', //대기
  RUN = 'RUN', //실행중
  DONE = 'DONE', //종료
  REPLICATE = 'REPLICATE', //재실행
  NONE = 'NONE',
}

export enum MODAL_SIZE_ENUM {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export enum REPORT_DETAIL_TYPE {
  MAIN = 'main',
  PRICE = 'price',
  OVERSEA = 'oversea',
  RELATION = 'relation',
  BRAND = 'brand',
  CATEGORY = 'category',
}

export enum GRADE_ITEMS {
  LOW = 'low',
}

export enum PATH {
  HOME = '/',
  SIGN_IN = '/signin',
  FIND_PASSWORD = '/find/password',
  FIND_ID = '/find/id',
  REAPPLY_PASSWORD = '/signin/password',
  REPORT_DETAIL = '/report/:id',
  REPORT_DETAIL_BY_SHARE = '/share/:id',
}

export enum AUTH_RESPONSE_TYPE {
  FILLED = 'FILLED',
  EMPTY = 'EMPTY',
}

export enum TERM_TYPE {
  USE_AGREE = 'useAgree',
  PERSONAL_AGREE = 'personalAgree',
  PERSONAL_AGREE_2 = 'personalAgree2',
  MARKETING_AGREE = 'marketingAgree',
}

export enum MODAL_TYPE_ENUM {
  MakeReportSuccesses = 'MakeReportSuccesses',
  MakeDuplicateReportSuccesses = 'MakeDuplicateReportSuccesses',
  SameKeywordReportExisted = 'SameKeywordReportExisted',
  LessMonthlyKeywordVolume = 'LessMonthlyKeywordVolume',
  NotBeOverDayReport = 'NotBeOverDayReport',
}

export enum CACHING_KEY {
  RETURN_URL = 'return_url',
  TEMPORARY_PASSWORD_LOGIN = 'temporary_password_login',
  STORED_KEYWORD = 'keyword',
  STORED_TRANSLATION = 'translation_keyword',
  HACKLE = 'hackle',
  IS_OPEN = 'isOpen',
  HOT_KEYWORDS = 'hot_keywords',
  PLANS = 'plan',
  USER_PLAN = 'user_plan',
  USER_CARDS = 'user_cards',
  CATEGORY = 'categories',
  CURRENCY = 'currency',
  CATEGORY_PRODUCTS = 'category_products',
}

export enum STYLE_ENUM {
  REPORT_DETAIL_HEADER_HEIGHT = 85,
  REPORT_DETAIL_BODY_PADDING_TOP = 32,
}
