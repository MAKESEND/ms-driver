import { useEffect, useRef, useState } from 'react';
import SocketIOClient, { type Socket } from 'socket.io-client';

import { Notification } from './notification';
import { type UpdateItemProps } from './notification/update-item';
import { useSession } from 'next-auth/react';

export const NotificationController: React.FC = () => {
  const session = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const [updates, setUpdates] = useState<UpdateItemProps[]>([]);

  useEffect(() => {
    if (isSocketConnected) {
      socketRef.current?.emit('register', {
        userId: session.data?.user.id,
        socketId: socketRef.current.id,
      });
    }
  }, [isSocketConnected, session]);

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
        setUpdates((prev) => [...prev, ...data]);
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

  return <Notification updates={updates} />;
};
