
import { createClient } from 'redis';
import { config } from './env';

export const redisClient = createClient({
    username: 'default',
    password: config.REDIS_PASSWORD,
    socket: {
        host: config.REDIS_PUBLIC_ENDPOINT,
        port: config.REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));



