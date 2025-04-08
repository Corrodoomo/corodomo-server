import { USER_TOKEN } from '@common/constants/token';

export type TUserTokenType = (typeof USER_TOKEN)[keyof typeof USER_TOKEN];
