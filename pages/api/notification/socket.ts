import type { NextApiRequest, NextApiResponse } from 'next';
import { type JWT, getToken } from 'next-auth/jwt';
import getConfig from 'next/config';

/**
 * a mock connection store
 * demo user ID1: 634e959f7a14ca00190abb08
 * demo user ID2: 1a2417a758ea29e6022d7531
 * !!!IMPORTANT!!! Next.js proceed api service as serverless
 * state and variable may not persist
 */
type UserId = string;
type SocketId = string;
const store = new Map<UserId, SocketId>();
const connectionMap = new Map<SocketId, UserId>();
const updateEvent = 'new_update';

const {
  serverRuntimeConfig: { NEXTAUTH_SECRET, NOTIFICATION_SECRET },
} = getConfig();

/**
 * this is only for testing and demo purpose
 * a dedicated notification system is preferable
 *
 * Features
 * 1. setup socket connection between client and server
 * 2. receive updates and update to certain user
 * 3. broadcast to all users
 *
 * Improvements
 * 1. Service, repository, IoC pattern can be introduced for message store
 * 2. Use Redis or the other session management storage
 * 3. POST for pushing message to specific user shall apply further security
 * 4. PUT for broadcasting shall apply further security
 * 5. Notification service can be an individual one and work with FCM and APNs for push notification
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await updateHandler(req, res as NextApiResponseServerIO);
  }

  if (req.method === 'PUT') {
    return await broadcastToAllUsers(req, res as NextApiResponseServerIO);
  }

  if (req.method === 'DELETE') {
    // request when user logs out
    return await disconnectByUserId(req, res as NextApiResponseServerIO);
  }

  return await socketHandler(req, res as NextApiResponseServerIO);
}

// TODO: require more detailed validation process
// should match UpdateItemProps
function validatePayload(payload: any): boolean {
  let isValid = false;
  isValid = Array.isArray(payload);
  isValid = payload.every((item: any) => !!item.id && !!item.message);
  return isValid;
}

async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // TODO: rotate secret token or use credentials management service
  if (req.headers['x-notification-token'] !== NOTIFICATION_SECRET) {
    return res.status(403).end();
  }

  const payload = req.body.payload;
  const isValid = validatePayload(payload);
  if (!isValid) return res.status(400).end();

  const socketId = store.get(req.body.userId);
  if (!socketId) return res.status(404).end();

  res.socket.server.io.to(socketId).emit(updateEvent, payload);

  return res.status(201).end();
}

import { type Socket } from 'net';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { DriverBasicInfo } from '~/constants/driver-data';

type JWTData = JWT & { user: DriverBasicInfo };

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

async function socketHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: '/api/notification/socket',
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
    io.on('connection', async (socket) => {
      const token = (await getToken({
        req,
        secret: NEXTAUTH_SECRET,
      })) as JWTData;

      if (token) {
        store.set(token.user.id, socket.id);
      }

      socket.on('disconnect', () => {
        const userId = connectionMap.get(socket.id);
        if (userId) {
          connectionMap.delete(socket.id);
          store.delete(userId);
        }
      });
    });
  }

  res.status(200).end();
}

// prevent map store memory overflow
async function disconnectByUserId(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const token = (await getToken({ req, secret: NEXTAUTH_SECRET })) as JWTData;

  if (!token) {
    return res.status(401).end();
  }

  const userId = token.user.id;
  const socketId = store.get(userId);
  const deleted = store.delete(userId);
  if (deleted) {
    connectionMap.delete(socketId!);
  }

  if (deleted) return res.status(204).end();

  return res.status(404).end();
}

async function broadcastToAllUsers(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // TODO: require further validation on authentication and authorization
  res.socket.server.io.emit(updateEvent, req.body.payload);

  res.status(201).end();
}
