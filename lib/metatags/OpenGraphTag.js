"use strict";

var _ = require("underscore");

var valueProp = "content";

var OpenGraphTag = function(property, content) {
    if (!property) {
        throw new Error(
            "You must provide property for a new OpenGraphTag"
        );
    }

    this.property = property;
    this.content  = content || this.content;
};

OpenGraphTag.prototype = {

    property: null,

    content: "",

    toTag: function() {
        return "<meta property=\"" + this.property + "\" " + valueProp + "=\"" + _.escape(this.content) + "\">";
    },

    selector: function() {
        return "meta[property=\"" + this.property + "\"]";
    },

    valueProp: function() {
        return valueProp;
    }

};

module.exports = OpenGraphTag;

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
