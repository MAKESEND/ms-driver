import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { MockDataSet } from '~/mocks/mockDataSet';

export const MockDataContext = createContext<MockDataSet | undefined>(
  undefined
);

export const MockDataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data } = useSession();
  const [dataSet, setDataSet] = useState<MockDataSet>(null);

  useEffect(() => {
    if (data?.user?.isDemo) {
      import('~/mocks/mockDataSet')
        .then((data: any) => {
          setDataSet(data.mockDataset ?? null);
        })
        .catch((err) => {
          console.warn('something went wrong when loading mock data');
          console.error(err?.message || err);
        });
    }
  }, [data]);

  return (
    <MockDataContext.Provider value={dataSet}>
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
