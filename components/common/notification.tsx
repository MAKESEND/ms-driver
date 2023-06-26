import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import SocketIOClient, { type Socket } from 'socket.io-client';

import { useUpdateHandler } from '~/hooks/use-update-handler';
import { UpdatesContext } from '~/providers/updates-provider';

import { NotificationView } from './notification/notification-view';
import { type UpdateItemProps } from './notification/update-item';

export const Notification: React.FC = () => {
  const session = useSession();

  // socket states
  const socketRef = useRef<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

  // incoming updates
  const [updates, setUpdates] = useState<UpdateItemProps[]>([]);
  const [allUpdates, setAllUpdates] = useState<UpdateItemProps[]>([]);

  // TODO: handle updates with queue to prevent racing
  useUpdateHandler(updates);

  useEffect(() => {
    const initSocketConnection = () => {
      const socket = SocketIOClient('/', {
        path: '/api/notification/socket',
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        setIsSocketConnected(true);
      });

      socket.on('new_update', (data: UpdateItemProps[]) => {
        // TODO: handle updates with queue to prevent racing
        setUpdates(data);

        // insert new data in higher order
        setAllUpdates((prev) => [...data, ...prev]);
      });

      socket.on('disconnect', () => {
        setIsSocketConnected(false);
      });
    };

    if (session.status === 'authenticated') {
      initSocketConnection();

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [session]);

  if (!isSocketConnected) return null;

  return (
    <UpdatesContext.Provider value={[allUpdates, setAllUpdates]}>
      <NotificationView updates={allUpdates} />
    </UpdatesContext.Provider>
  );
};
