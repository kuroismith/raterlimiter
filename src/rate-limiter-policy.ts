// Copyright 2018- GAGO Ltd. All rights reserved.
// Created by wuqinchun at gagogroup.com.

export abstract class RateLimiterPolicy {
  interval: number;

  // Capacity of the token bucket
  capacity: number;

  // Max tokens saved if user don't use the bucket for a while, equals to intervalPerPermit * maxBurstTime
  maxBurstTokens: number;

  intervalPerPermit: number;

  protected constructor(interval: number, capacity: number, maxBurstTime: number) {
    this.interval = interval;
    this.capacity = capacity;
    this.intervalPerPermit = interval / capacity;
    this.maxBurstTokens = Math.min(maxBurstTime / this.intervalPerPermit, capacity);
  }

  abstract bucketKey(identity: string): string;
}
