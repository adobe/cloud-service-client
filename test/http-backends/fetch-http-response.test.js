/*
Copyright 2022 Adobe. All rights reserved.
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

const FetchHttpResponse = importFile("http-backends/fetch-http-response");

describe("fetch http response tests", function () {
  it("test get headers", function () {
    let response = new FetchHttpResponse({});
    let lookup = response.getHeaders();
    assert.strictEqual(lookup, undefined);

    response = new FetchHttpResponse({
      header: "value",
    });
    lookup = response.getHeaders();
    assert.strictEqual(lookup, undefined);

    response = new FetchHttpResponse({
      headers: {
        keys: () => ["header"],
        get: (toGet) => toGet,
      },
    });
    lookup = response.getHeaders();
    assert.deepStrictEqual(lookup, {
      header: "header",
    });
  });
});
