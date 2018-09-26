// Copyright 2018- GAGO Ltd. All rights reserved.
// Created by wuqinchun at gagogroup.com.

export abstract class RateLimiterPolicy {
  interval: number;

  // Capacity of the token bucket
  capacity: number;

  // Max tokens saved if user don't use the bucket for a while, equals to intervalPerPermit * maxBurstTime
  maxBurstTokens: number;

  intervalPerPermit: number;

  protected constructor(options: RateLimiterPolicyOptions) {
    this.interval = options.interval;
    this.capacity = options.capacity;
    this.intervalPerPermit = options.interval / options.capacity;
    this.maxBurstTokens = Math.min(options.maxBurstTime / this.intervalPerPermit, options.capacity);
  }

  abstract bucketKey(identity: string): string;
}

export interface RateLimiterPolicyOptions {
  interval: number;
  capacity: number;
  maxBurstTime: number;
}
