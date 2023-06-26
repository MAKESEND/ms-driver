import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { type UpdateItemProps } from '~/components/common/notification/update-item';
import { NotificationTypes } from '~/constants/notification';
import { newPickupTaskState } from '~/store/task-update';

export const useUpdateHandler = (updates: UpdateItemProps[]) => {
  const updatesRef = useRef<UpdateItemProps[]>([]);
  const { asPath } = useRouter();
  const setPickupUpdate = useSetRecoilState(newPickupTaskState);

  useEffect(() => {
    return () => {
      updatesRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (updatesRef.current !== updates) {
      for (const update of updates) {
        switch (asPath) {
          case '/tasks/pickup':
            if (update.updateType === NotificationTypes.PICKUP_TASK) {
              setPickupUpdate(true);
            }
            break;
          default:
        }
      }

      // this prevents duplicating updates
      updatesRef.current = updates;
    }
  }, [asPath, updates, setPickupUpdate]);
};
