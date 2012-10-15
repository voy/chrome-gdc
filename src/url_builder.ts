/// <reference path="lib.d.ts" />

class UrlBuilder {
    static RE_PARSE = /^(.*?:\/\/.*?)\/.*?s=(.*)/i;

    prefix: string;
    dashboardUri: string;
    projectUri: string;
    projectMDUri: string;

    parseUrl(url) {
        var matches = url.match(UrlBuilder.RE_PARSE);
        if (!matches) return;

        this.prefix = matches[1];

        var parts = matches[2].split('|');
        this.dashboardUri = parts[2];
        this.projectUri = parts[0];
        this.projectMDUri = this.getProjectMDUri();
    }

    getEnrichedProjectViewUrl() {
        return this.prefix + this.dashboardUri + '/view';
    }

    getProjectViewUrl() {
        return this.prefix + this.dashboardUri;
    }

    getProjectEditUrl() {
        return this.prefix + this.dashboardUri + '?mode=edit';
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

if (typeof exports !== 'undefined') {
    exports.UrlBuilder = UrlBuilder;
}
