# RateLimiter

A rate limiter based on token bucket algorithm using redis

# Usage

```typescript
  let client: RedisClient = ???
  // In every 20000 milliseconds, the resource can be access 100 times
  const policy: RateLimiterPolicy = new SimpleRateLimiterPolicy({
    interval: 20000,
    capacity: 100,
    maxBurstTime: 1000
  });

  const limiter: RateLimiter = new RedisRateLimiter(policy, client);

  async action(userId) {
    try {
        const accessible = await limiter.access(userId);
        if (accessible) {
          // allowed
        } else {
          // limit is exceeded, action is not allowed
        }
    } catch (e) {
        // redis failed or similar
    }
  }
```
