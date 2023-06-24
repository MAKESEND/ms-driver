import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import server from '~/mocks/server';
import { mockFn, mockDeep } from 'jest-mock-extended';

import { type NextRouter } from 'next/router';
import { type useSession } from 'next-auth/react';
import { type serverSideTranslations } from 'next-i18next/serverSideTranslations';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: mockFn().mockReturnValue(mockDeep<NextRouter>()),
}));

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: mockFn().mockReturnValue(
    mockDeep<ReturnType<typeof useSession>>()
  ),
}));

jest.mock('next-i18next/serverSideTranslations', () => ({
  ...jest.requireActual('next-i18next/serverSideTranslations'),
  serverSideTranslations: mockFn<typeof serverSideTranslations>(),
}));

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
