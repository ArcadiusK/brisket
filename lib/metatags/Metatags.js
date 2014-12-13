"use strict";

var _ = require("underscore");

var OPEN_GRAPH = "openGraph";
var DEFAULT = "default";

var KEY_PROPERTIES = _.object([
    [OPEN_GRAPH, "property"],
    [DEFAULT, "name"]
]);

var Metatags = function(pairs) {
    if (!pairs) {
        throw new Error("You cannot create empty metatags");
    }

    this.pairs = pairs;
};

Metatags.prototype = {

    pairs: null,

    openGraphKey: OPEN_GRAPH,

    toTag: function(tagName) {
        var value = this.get(tagName) || this.getOpenGraph(tagName);

        return tagFromKeyValue(tagName, value);
    },

    toTags: function() {
        var tags = "";

        for (var key in this.pairs) {
            if (this.pairs.hasOwnProperty(key)) {

                switch (key) {
                    case OPEN_GRAPH:
                        tags += openGraphTags(this.pairs[key]);
                        break;

                    default:
                        tags += this.toTag(key);
                        break;
                }
            }
        }

        return tags;
    },

    get: function(tagName) {
        return this.pairs[tagName];
    },

    getOpenGraph: function(tagName) {
        if (!this.pairs[OPEN_GRAPH]) {
            return;
        }

        return this.pairs[OPEN_GRAPH][tagName];
    },

    tagSelector: function(tagName) {
        var keyPropType = isOpenGraphTag(tagName) ? OPEN_GRAPH : DEFAULT;

        return "meta[" + KEY_PROPERTIES[keyPropType] + "=\"" + tagName + "\"]";
    }

};

function isOpenGraphTag(tagName) {
    return !!tagName.match(/^og\:/);
}

function tagFromKeyValue(key, value) {
    if(value === undefined || value === null) {
        return "";
    }

    var keyPropType = isOpenGraphTag(key) ? OPEN_GRAPH : DEFAULT;

    return metaTag(KEY_PROPERTIES[keyPropType], key, "content", value);
}

/*
    The method openGraphTags and the switch case OPEN_GRAPH in toTags
    are unnecessary and should be deprecated. Keep them for backward
    compatibility.
*/
function openGraphTags(pairs) {
    var tags = "";

    for (var key in pairs) {
        if (pairs.hasOwnProperty(key)) {
            tags += tagFromKeyValue(key, pairs[key]);
        }
    }

    return tags;
}

function metaTag(keyProp, key, valueProp, value) {
    if (!key || !value) {
        return "";
    }

    return "<meta " + keyProp + "=\"" + key + "\" " + valueProp + "=\"" + _.escape(value) + "\">";
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
