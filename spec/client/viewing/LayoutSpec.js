"use strict";

var Environment = require("lib/environment/Environment");
var Layout = require("lib/viewing/Layout");
var $ = require("lib/application/jquery");

describe("Layout", function() {

    var ExampleLayout;
    var layout;

    describe("#asHtml", function() {

        beforeEach(function() {
            ExampleLayout = Layout.extend({
                template: "<!doctype html>\n<html></html>"
            });

            layout = new ExampleLayout();
        });

        describe("when template has NOT been rendered", function() {

            it("returns empty string", function() {
                expect(layout.asHtml()).toBe("");
            });

        });

        describe("when template has been rendered", function() {

            var hasDoctype = /<!doctype[^>]*>/i;

            beforeEach(function() {
                layout.renderTemplate();
            });

            describe("when template has a doctype", function() {

                it("has doctype in output html", function() {
                    expect(layout.asHtml()).toMatch(hasDoctype);
                });

            });

            describe("when template does NOT have a doctype", function() {

                beforeEach(function() {
                    ExampleLayout = Layout.extend({
                        template: "<html></html>"
                    });

                    layout = new ExampleLayout();
                });

                it("does NOT have a doctype in output html", function() {
                    expect(layout.asHtml()).not.toMatch(hasDoctype);
                });

            });

        });

    });

    describe("#isSameAs", function() {

        var Layout1;
        var Layout2;
        var layout1;
        var layout2;

        beforeEach(function() {
            Layout1 = Layout.extend();
            Layout2 = Layout.extend();
        });

        it("is NOT considered the same as an instance of it's base type", function() {
            layout1 = new Layout1();
            layout2 = new Layout();

            expect(layout1.isSameAs(layout2)).toBe(false);
        });

        describe("when one layout instance is the same type as another", function() {

            beforeEach(function() {
                layout1 = new Layout1();
                layout2 = new Layout1();
            });

            it("returns true", function() {
                expect(layout1.isSameAs(layout2)).toBe(true);
            });

        });

        describe("when one layout instance is NOT the same type as another", function() {

            beforeEach(function() {
                layout1 = new Layout1();
                layout2 = new Layout2();
            });

            it("returns false", function() {
                expect(layout1.isSameAs(layout2)).toBe(false);
            });

        });

    });

    describe("#isSameTypeAs", function() {

        var Layout1;
        var Layout2;

        beforeEach(function() {
            Layout1 = Layout.extend();
            Layout2 = Layout.extend();
        });

        it("is NOT considered the same type as it's base type", function() {
            layout = new Layout1();

            expect(layout.isSameTypeAs(Layout)).toBe(false);
        });

        describe("when a layout instance is the same type as another instance", function() {

            beforeEach(function() {
                layout = new Layout1();
            });

            it("returns true", function() {
                expect(layout.isSameTypeAs(Layout1)).toBe(true);
            });

        });

        describe("when one layout instance is NOT the same type as another instance", function() {

            beforeEach(function() {
                layout = new Layout1();
            });

            it("returns false", function() {
                expect(layout.isSameTypeAs(Layout2)).toBe(false);
            });

        });

    });

    describe("#renderMetaTags", function() {

        var metatags;
        var $head;

        beforeEach(function() {
            layout = new Layout();

            $head = $("<head></head>");

            spyOn(layout, "$head").and.returnValue($head);
        });

        describe("when there is no metatags", function() {

            beforeEach(function() {
                metatags = null;

                layout.setMetaTags(metatags);
                layout.renderMetaTags();
            });

            it("renders nothing in head", function() {
                expect($head.html()).toEqual("");
            });

        });

        describe("when there are metatags", function() {

            beforeEach(function() {
                metatags = new Layout.Metatags({
                    "description": "some description",
                    "og:url": "some openGraph url"
                });

                layout.setMetaTags(metatags);
                layout.renderMetaTags();
            });

            it("renders metatags in the head", function() {
                expect($head.html()).toEqual(
                    '<meta name="description" content="some description">' +
                    '<meta property="og:url" content="some openGraph url">'
                );
            });

        });

        describe("when existing metatags are rendered", function() {

            beforeEach(function() {
                metatags = new Layout.Metatags({
                    "canonical": "http://example.com/canonical",
                    "description": "some description",
                    "og:image": "some openGraph image"
                });

                layout.setMetaTags(metatags);
                layout.renderMetaTags();

                var newMetatags = new Layout.Metatags({
                    "canonical": "http://example.com/new-canonical",
                    "description": "new description",
                    "twitter:type": "new property"
                });

                layout.setMetaTags(newMetatags);
                layout.renderMetaTags();
            });

            it("updates metatags", function() {
                expect($head.html()).toEqual(
                    '<link rel="canonical" href="http://example.com/new-canonical">' +
                    '<meta name="description" content="new description">' +
                    '<meta property="og:image" content="some openGraph image">' +
                    '<meta name="twitter:type" content="new property">'
                );
            });

        });

    });

    describe("#renderPageLevelData", function() {

        beforeEach(function() {
            ExampleLayout = Layout.extend();

            layout = new ExampleLayout();

            spyOn(layout, "renderPageTitle");
            spyOn(layout, "renderMetaTags");
        });

        it("renders page title", function() {
            layout.renderPageLevelData();
            expect(layout.renderPageTitle).toHaveBeenCalled();
        });

        describe("on server", function() {

            beforeEach(function() {
                spyOn(Environment, "isServer").and.returnValue(true);
                layout.renderPageLevelData();
            });

            it("renders metatags", function() {
                expect(layout.renderMetaTags).toHaveBeenCalled();
            });

        });

        describe("on client", function() {

            beforeEach(function() {
                spyOn(Environment, "isServer").and.returnValue(false);
            });

            describe("updates metatags on client render", function() {

                beforeEach(function() {
                    layout.updateMetatagsOnClientRender = true;
                    layout.renderPageLevelData();
                });

                it("renders metatags", function() {
                    expect(layout.renderMetaTags).toHaveBeenCalled();
                });

            });

            describe("does NOT update metatags on client render", function() {

                beforeEach(function() {
                    layout.updateMetatagsOnClientRender = false;
                    layout.renderPageLevelData();
                });

                it("renders metatags", function() {
                    expect(layout.renderMetaTags).not.toHaveBeenCalled();
                });

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
