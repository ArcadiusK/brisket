"use strict";

var OpenGraphTag = require("lib/metatags/OpenGraphTag");

describe("OpenGraphTag", function() {

    describe("creating OpenGraphTag", function() {

        describe("when property is not passed", function() {

            it("throws", function() {
                var instantiatingOpenGraphTagWithoutProperty = function() {
                    new OpenGraphTag();
                };

                expect(instantiatingOpenGraphTagWithoutProperty).toThrow();
            });

        });

    });

    describe("#toTag", function() {

        var tag;

        describe("when normal property and content are present", function() {

            beforeEach(function() {
                tag = new OpenGraphTag("og:url", "https://example.com").toTag();
            });

            it("returns the metatag in html", function() {
                expect(tag).toBe(
                    '<meta property="og:url" content="https://example.com">'
                );
            });

        });

        describe("when content have characters that could break html", function() {

            beforeEach(function() {
                tag = new OpenGraphTag("og:url", "'-/value><'").toTag();
            });

            it("returns the metatag in html", function() {
                expect(tag).toBe(
                    '<meta property="og:url" content="&#x27;-/value&gt;&lt;&#x27;">'
                );
            });

        });

    });

    describe("#selector", function() {

        var selector;

        beforeEach(function() {
            selector = new OpenGraphTag("og:url").selector();
        });

        it("returns the jQuery selector", function() {
            expect(selector).toBe(
                'meta[property="og:url"]'
            );
        });

    });

    describe("#valueProp", function() {

        it("returns the value property", function() {
            expect(new OpenGraphTag("og:url").valueProp()).toBe("content");
        });

    });

});

// ----------------------------------------------------------------------------
// Copyright (C) 2014 Bloomberg Finance L.P.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ----------------------------- END-OF-FILE ----------------------------------
