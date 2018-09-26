// Copyright 2018- GAGO Ltd. All rights reserved.
// Created by wuqinchun at gagogroup.com.

import * as microtime from "microtime"
import * as fs from "fs";
import sha1 = require("sha1");

import { RateLimiter } from "./rate-limiter";
import { RedisClient } from "redis";
import { RateLimiterPolicy } from "./rate-limiter-policy";

export class RedisRateLimiter extends RateLimiter {
  static SCRIPT: string = fs.readFileSync("src/rate-limiter.lua").toString();
  static SCRIPT_SHA: string = sha1(RedisRateLimiter.SCRIPT).toString();
  private client: RedisClient;

  constructor(policy: RateLimiterPolicy, client: RedisClient) {
    super(policy);
    this.client = client;
  }

  async access(identity: string): Promise<boolean> {
    const now = microtime.now();
    const key = this.policy.bucketKey(identity);

    const redisKeysAndArgs = [
      1,
      key,                                 // KEYS[1]
      this.policy.intervalPerPermit,       // ARGV[1]
      now,                                 // ARGV[2]
      this.policy.maxBurstTokens,          // ARGV[3]
      this.policy.capacity,                // ARGV[4]
      this.policy.interval                 // ARGV[5]
    ];

    return new Promise<boolean>((resolve, reject) => {
      this.client.evalsha(RedisRateLimiter.SCRIPT_SHA, ...redisKeysAndArgs, (e1: Error, r1) => {
        if (e1) {
          if (e1.message.includes('NOSCRIPT')) {
            this.client.evalsha(RedisRateLimiter.SCRIPT_SHA, ...redisKeysAndArgs, (e2: Error, r2) => {
              if (e2) reject(e2);
              resolve(Boolean(r2));
            });
          } else {
            reject(e1);
          }
        }
        resolve(Boolean(r1));
      });
    })
  }
}
