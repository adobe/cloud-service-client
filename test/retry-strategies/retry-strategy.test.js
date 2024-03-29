/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const assert = require("assert");
const { importFile } = require("../test-utils");

const RetryStrategy = importFile("retry-strategies/retry-strategy");

describe("retry strategy tests", function () {
  it("test retry strategy methods", async function () {
    const retryStrategy = new RetryStrategy();
    assert(
      !(await retryStrategy.shouldRetry({
        attempts: 1,
        maxAttempts: 2,
      }))
    );
    assert(
      !(await retryStrategy.shouldRetry({
        attempts: 2,
        maxAttempts: 2,
      }))
    );
  });

  it("test retry strategy delay default", async function () {
    const retryStrategy = new RetryStrategy();
    const retryDelay = await retryStrategy.getRetryDelay({ delay: 1000 });
    assert.strictEqual(retryDelay, 1000);
  });

  it("test retry strategy delay specified", async function () {
    const retryStrategy = new RetryStrategy({
      getDelay: () => 500,
    });
    const retryDelay = await retryStrategy.getRetryDelay({ delay: 1000 });
    assert.strictEqual(retryDelay, 500);
  });

  it("test retry strategy request options default", async function () {
    const retryStrategy = new RetryStrategy();
    const requestOptions = await retryStrategy.getRetryRequestOptions();
    assert.deepStrictEqual(requestOptions, {});
  });
});
