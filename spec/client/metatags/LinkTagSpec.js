"use strict";

var LinkTag = require("lib/metatags/LinkTag");

describe("LinkTag", function() {

    describe("creating LinkTag", function() {

        describe("when rel is not passed", function() {

            it("throws", function() {
                var instantiatingLinkTagWithoutRel = function() {
                    new LinkTag();
                };

                expect(instantiatingLinkTagWithoutRel).toThrow();
            });

        });

    });

    describe("#toTag", function() {

        var tag;

        describe("when normal rel and href are present", function() {

            beforeEach(function() {
                tag = new LinkTag("canonical", "https://example.com").toTag();
            });

            it("returns the metatag in html", function() {
                expect(tag).toBe(
                    '<link rel="canonical" href="https://example.com">'
                );
            });

        });

        describe("when href have characters that could break html", function() {

            beforeEach(function() {
                tag = new LinkTag("canonical", "'-/value><'").toTag();
            });

            it("returns the metatag in html", function() {
                expect(tag).toBe(
                    '<link rel="canonical" href="&#x27;-/value&gt;&lt;&#x27;">'
                );
            });

        });

    });

    describe("#selector", function() {

        var selector;

        beforeEach(function() {
            selector = new LinkTag("canonical").selector();
        });

        it("returns the jQuery selector", function() {
            expect(selector).toBe(
                'link[rel="canonical"]'
            );
        });

    });

    describe("#valueProp", function() {

        it("returns the value property", function() {
            expect(new LinkTag("link").valueProp()).toBe("href");
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
