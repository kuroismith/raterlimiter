// Copyright 2018- GAGO Ltd. All rights reserved.
// Created by wuqinchun at gagogroup.com.


import { RateLimiterPolicy } from "./rate-limiter-policy";

export abstract class RateLimiter {
  policy: RateLimiterPolicy;

  protected constructor(policy: RateLimiterPolicy) {
    this.policy = policy;
  }

  // return true if the identity is accessible
  abstract access(identity: string): Promise<boolean>;
}
