declare var exports;

class UrlBuilder {
    static RE_PARSE = /^(.*?:\/\/.*?)\/.*?s=(.*)/i;

    prefix: string;
    projectUri: string;
    projectMDUri: string;

    static createFromUrl(url) {
        var builder = new UrlBuilder();
        var matches = url.match(UrlBuilder.RE_PARSE);
        if (!matches) return builder;

        builder.prefix = matches[1];
        builder.projectUri = matches[2].split('|')[0];
        builder.projectMDUri = builder.getProjectMDUri();
        return builder;
    }

    getEnrichedProjectViewUrl() {
        return this.prefix + this.projectUri + '/view';
    }

    getProjectViewUrl() {
        return this.prefix + this.projectUri;
    }

    getProjectEditUrl() {
        return this.prefix + this.projectUri + '?mode=edit';
    }

    getProjectMDUri() {
        return this.projectUri.replace('projects', 'md');
    }

    getProjectMDUrl() {
        return this.prefix + this.projectMDUri;
    }

    getValidateProjectUrl() {
        return this.prefix + this.projectMDUri + '/validate';
    }

    getManageLDMUrl() {
        return this.prefix + this.projectMDUri + '/ldm/manage';
    }

    getTemplatesUrl() {
        return this.prefix + this.projectMDUri + '/templates';
    }
}

if (exports) {
    exports.UrlBuilder = UrlBuilder;
}
