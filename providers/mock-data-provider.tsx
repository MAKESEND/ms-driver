import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

import { envs } from '~/constants/envs';
import type { MockDataSet } from '~/mocks/mockDataSet';

export const MockDataContext = createContext<
  { mockData: MockDataSet; isLoading: boolean } | undefined
>(undefined);

export const MockDataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mockData, setMockData] = useState<MockDataSet>(null);

  const errorMessage = 'something went wrong when loading mock data';

  useEffect(() => {
    if (data?.user?.isDemo || envs.IS_DEMO) {
      import('~/mocks/mockDataSet')
        .then((data: any) => setMockData(data.mockDataset ?? null))
        .catch((err) => console.error(errorMessage, err?.message || err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <MockDataContext.Provider value={{ mockData, isLoading }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const ctx = useContext(MockDataContext);

  if (typeof ctx === 'undefined')
    throw new Error('useMockData can only be used in MockDataProvider');

  return ctx;
};
