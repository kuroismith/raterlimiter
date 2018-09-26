// Copyright 2018- GAGO Ltd. All rights reserved.
// Created by wuqinchun at gagogroup.com.

import {
  RateLimiterPolicy,
  RateLimiterPolicyOptions
} from "./rate-limiter-policy";

export class SimpleRateLimiterPolicy extends RateLimiterPolicy {
  static SEP = "_";

  constructor(options: RateLimiterPolicyOptions) {
    super(options);
  }

  bucketKey(identity: string): string {
    return `LIMIT${SimpleRateLimiterPolicy.SEP}${this.interval}${SimpleRateLimiterPolicy.SEP}${this.capacity}${SimpleRateLimiterPolicy.SEP}${identity}`;
  }
}
