"use strict";

var _ = require("underscore");

var OPEN_GRAPH = "openGraph";
var CANONICAL  = "canonical";
var STANDARD   = "standard";

var TAG_NAME_MATCHERS = _.object([
    [OPEN_GRAPH, /^og\:/],
    [CANONICAL, /^canonical$/]
]);

var MATATAGS = _.object([
    [OPEN_GRAPH, require("./OpenGraphTag")],
    [CANONICAL,  require("./LinkTag")],
    [STANDARD,   require("./StandardTag")],
]);

var Metatags = function(pairs) {
    if (!pairs) {
        throw new Error("You cannot create empty metatags");
    }

    this.pairs = pairs;
};

Metatags.prototype = {

    pairs: null,

    get: function(tagName) {
        return this.pairs[tagName];
    },

    toTag: function(tagName) {
        if (!tagName || !this.get(tagName)) {
            return "";
        }

        var metatag = tagFromKeyValue(tagName, this.get(tagName));

        return metatag.toTag();
    },

    tagSelector: function(tagName) {
        var metatag = tagFromKeyValue(tagName, this.get(tagName));

        return metatag.selector();
    },

    tagValueProp: function(tagName) {
        var metatag = tagFromKeyValue(tagName, this.get(tagName));

        return metatag.valueProp();
    }

};

function tagTypeByName(tagName) {
    var tagType =  _.find(_.keys(TAG_NAME_MATCHERS), function(tagType) {
        return tagName.match(TAG_NAME_MATCHERS[tagType]);
    });

    return tagType || STANDARD;
}

function tagFromKeyValue(key, value) {
    var Matatag = MATATAGS[tagTypeByName(key)];

    return new Matatag(key, value);
}

module.exports = Metatags;

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
