"use strict";

var StandardTag = require("lib/metatags/StandardTag");

describe("StandardTag", function() {

    describe("creating StandardTag", function() {

        describe("when name is not passed", function() {

            it("throws", function() {
                var instantiatingStandardTagWithoutName = function() {
                    new StandardTag();
                };

                expect(instantiatingStandardTagWithoutName).toThrow();
            });

        });

    });

    describe("#toTag", function() {

        var tag;

        describe("when normal name and content are present", function() {

            beforeEach(function() {
                tag = new StandardTag("description", "some desc").toTag();
            });

            it("returns the metatag in html", function() {
                expect(tag).toBe(
                    '<meta name="description" content="some desc">'
                );
            });

        });

        describe("when content have characters that could break html", function() {

            beforeEach(function() {
                tag = new StandardTag("key", "'/value><'").toTag();
            });

            it("returns the metatag in html", function() {
                expect(tag).toBe(
                    '<meta name="key" content="&#x27;/value&gt;&lt;&#x27;">'
                );
            });

        });

    });

    describe("#selector", function() {

        var selector;

        beforeEach(function() {
            selector = new StandardTag("description").selector();
        });

        it("returns the jQuery selector", function() {
            expect(selector).toBe(
                'meta[name="description"]'
            );
        });

    });

    describe("#valueProp", function() {

        it("returns the value property", function() {
            expect(new StandardTag("link").valueProp()).toBe("content");
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
