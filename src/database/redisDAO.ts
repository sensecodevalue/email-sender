import redis from 'redis';

const port = parseInt(process.env.REDIS_PORT) || 6379;
const host = process.env.REDIS_URL || '127.0.0.1';

const redisClient = redis.createClient({socket: {port, host }});


export default redisClient;