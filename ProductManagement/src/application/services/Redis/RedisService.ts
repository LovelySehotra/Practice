import redisClient from "@/infrastructure/redis.config";

export class RedisService {
    async getCachedData(query: string) {

        const cacheResult = await redisClient.get(query);
        return JSON.parse(cacheResult);
    }
    async setCachedData(query, data) {
        await redisClient.set(query, JSON.stringify(data), {
            EX: 30,
            NX: true,
        });
        return;
    }
}