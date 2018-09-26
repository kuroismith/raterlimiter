// Copyright 2018- GAGO Ltd. All rights reserved.
// Created by wuqinchun at gagogroup.com.

import { RateLimiterPolicy } from "./rate-limiter-policy";

export class SimpleRateLimiterPolicy extends RateLimiterPolicy {
  static SEP = "_";

  constructor(interval: number, capacity: number, maxBurstTime: number) {
    super(interval, capacity, maxBurstTime);
  }

  bucketKey(identity: string): string {
    return `LIMIT${SimpleRateLimiterPolicy.SEP}${this.interval}${SimpleRateLimiterPolicy.SEP}${this.capacity}${SimpleRateLimiterPolicy.SEP}${identity}`;
  }
}
