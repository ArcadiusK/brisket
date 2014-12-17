"use strict";

var _ = require("underscore");

var valueProp = "content";

var StandardTag = function(name, content) {
    if (!name) {
        throw new Error(
            "You must provide name for a new StandardTag"
        );
    }

    this.name = name;
    this.content = content || this.content;
};

StandardTag.prototype = {

    name: null,

    content: "",

    toTag: function() {
        return "<meta name=\"" + this.name + "\" " + valueProp + "=\"" + _.escape(this.content) + "\">";
    },

    selector: function() {
        return "meta[name=\"" + this.name + "\"]";
    },

    valueProp: function() {
        return valueProp;
    }

};

module.exports = StandardTag;

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
