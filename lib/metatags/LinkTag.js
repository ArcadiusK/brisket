"use strict";

var _ = require("underscore");

var valueProp = "href";

var LinkTag = function(rel, href) {
    if (!rel) {
        throw new Error(
            "You must provide rel for a new LinkTag"
        );
    }

    this.rel  = rel;
    this.href = href || this.href;
};

LinkTag.prototype = {

    rel: null,

    href: "",

    toTag: function() {
        return "<link rel=\"" + this.rel + "\" " + valueProp + "=\"" + _.escape(this.href) + "\">";
    },

    selector: function() {
        return "link[rel=\"" + this.rel + "\"]";
    },

    valueProp: function() {
        return valueProp;
    }

};

module.exports = LinkTag;

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
