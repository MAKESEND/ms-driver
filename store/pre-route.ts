import { atom } from 'recoil';
import type { NextRouter } from 'next/router';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const preRouteState = atom<
  Pick<NextRouter, 'asPath' | 'query' | 'pathname'>
>({
  key: 'previous_route',
  default: {
    asPath: '',
    pathname: '',
    query: {},
  },
  effects_UNSTABLE: [persistAtom],
});
