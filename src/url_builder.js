function UrlBuilder() {};

UrlBuilder.RE_PARSE = /^(.*?:\/\/.*?)\/.*?s=(.*)/i;

UrlBuilder.createFromUrl = function(url) {
    var builder = new UrlBuilder();
    var matches = url.match(UrlBuilder.RE_PARSE);
    if (!matches) return builder;

    builder.prefix = matches[1];
    builder.projectUri = matches[2].split('|')[0];
    builder.projectMDUri = builder.getProjectMDUri();
    return builder;
};

UrlBuilder.prototype = {

    getEnrichedProjectViewUrl: function() {
        return this.prefix + this.projectUri + '/view';
    },

    getProjectViewUrl: function() {
        return this.prefix + this.projectUri;
    },

    getProjectEditUrl: function() {
        return this.prefix + this.projectUri + '?mode=edit';
    },

    getProjectMDUri: function() {
        return this.projectUri.replace('projects', 'md');
    },

    getProjectMDUrl: function() {
        return this.prefix + this.projectMDUri;
    },

    getValidateProjectUrl: function() {
        return this.prefix + this.projectMDUri + '/validate';
    },

    getManageLDMUrl: function() {
        return this.prefix + this.projectMDUri + '/ldm/manage';
    },

    getTemplatesUrl: function() {
        return this.prefix + this.projectMDUri + '/templates';
    }
};

module.exports = UrlBuilder;