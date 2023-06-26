import { createContext, useContext } from 'react';
import type { UpdateItemProps } from '~/components/common/notification/update-item';

export const UpdatesContext = createContext<
  | [UpdateItemProps[], React.Dispatch<React.SetStateAction<UpdateItemProps[]>>]
  | null
>(null);

export const useUpdates = () => {
  const ctx = useContext(UpdatesContext);

  if (!ctx) throw new Error('useUpdates can only be used in UpdatesContext');

  return ctx;
};
