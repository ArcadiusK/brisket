"use strict";

var Metatags = require("lib/metatags/Metatags");

describe("Metatags", function() {

    var metatags;

    describe("creating Metatags", function() {

        describe("when pairs are not passed", function() {

            it("throws", function() {
                var instantiatingMetatagsWithoutPairs = function() {
                    new Metatags();
                };

                expect(instantiatingMetatagsWithoutPairs).toThrow();
            });

        });

    });

    describe("#toTag", function() {

        var tagName;

        beforeEach(function() {
            metatags = new Metatags({
                "description": "some description",
                "og:url": "http://example.com",
                "canonical": "http://example.com/canonical"
            });
        });

        describe("when the tagName is invalid", function() {

            beforeEach(function() {
                tagName = "invalid";
            });

            it("return an empty string", function() {
                expect(metatags.toTag(tagName)).toBe("");
            });

        });

        describe("when the tagName matches a standard tag name", function() {

            beforeEach(function() {
                tagName = "description";
            });

            it("returns the metatag in html", function() {
                expect(metatags.toTag(tagName)).toBe(
                    '<meta name="description" content="some description">'
                );
            });

        });

        describe("when the tagName matches a openGraph tag name", function() {

            beforeEach(function() {
                tagName = "og:url";
            });

            it("returns the metatag in html", function() {
                expect(metatags.toTag(tagName)).toBe(
                    '<meta property="og:url" content="http://example.com">'
                );
            });

        });

        describe("when the tagName matches a canonical-link tag name", function() {

            beforeEach(function() {
                tagName = "canonical";
            });

            it("returns the canonical link in html", function() {
                expect(metatags.toTag(tagName)).toBe(
                    '<link rel="canonical" href="http://example.com/canonical">'
                );
            });

        });

    });

    describe("#tagSelector", function() {

        beforeEach(function() {
            metatags = new Metatags({
                "key": "value"
            });
        });

        describe("when tagName is standard", function() {

            it("return a standard metatag selector", function() {
                expect(metatags.tagSelector("description")).toBe(
                    'meta[name="description"]'
                );
            });

        });

        describe("when tagName is a openGrpah tag", function() {

            it("return an openGraph metatag selector", function() {
                expect(metatags.tagSelector("og:url")).toBe(
                    'meta[property="og:url"]'
                );
            });

        });

        describe("when tagName is a canonical link tag", function() {

            it("return a canonical link selector", function() {
                expect(metatags.tagSelector("canonical")).toBe(
                    'link[rel="canonical"]'
                );
            });

        });

    });

});

// ----------------------------------------------------------------------------
// Copyright (C) 2015 Bloomberg Finance L.P.
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
