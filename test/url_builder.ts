/// <reference path="test.d.ts" />
var assert = require('chai').assert;
var sinon = require('sinon');

var UrlBuilder = require('../src/url_builder.js').UrlBuilder;

describe('url builder', () => {
    var builder;
    var testUrl = 'https://secure.gooddata.com/#s=/gdc/projects/FooProject|projectDashboardPage|/gdc/md/5wvh1suon0ix9xso2lfhjwq29j7nrezw/obj/42992|b194fc13979d';

    beforeEach(() => {
        builder = new UrlBuilder();
    });

    it('should be creatable from url', () => {
        builder.parseUrl(testUrl);
        assert.equal(builder.dashboardUri, '/gdc/md/5wvh1suon0ix9xso2lfhjwq29j7nrezw/obj/42992');
        assert.equal(builder.projectUri, '/gdc/projects/FooProject');
        assert.equal(builder.projectMDUri, '/gdc/md/FooProject');
        assert.equal(builder.prefix, 'https://secure.gooddata.com');
    });

    describe('url construction', () => {
        var prefix = 'https://secure.gooddata.com';

        function assertUrlCorrect(result, uri) {
            assert.equal(result, prefix + uri);
        }

        beforeEach(() => {
            builder.prefix = prefix;
            builder.dashboardUri = '/gdc/md/dashboard/1';
            builder.projectUri = '/gdc/projects/FooProject';
            builder.projectMDUri = '/gdc/md/FooProject';
        });

        it('should build enriched project view url', () => {
            var url = builder.getEnrichedProjectViewUrl();
            assertUrlCorrect(url, '/gdc/md/dashboard/1/view');
        });

        it('should build project view url', () => {
            var url = builder.getProjectViewUrl();
            assertUrlCorrect(url, '/gdc/md/dashboard/1');
        });

        it('should build project edit url', () => {
            var url = builder.getProjectEditUrl();
            assertUrlCorrect(url, '/gdc/md/dashboard/1?mode=edit');
        });

        it('should build project metadata url', () => {
            var url = builder.getProjectMDUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject');
        });

        it('should build project metadata validate url', () => {
            var url = builder.getValidateProjectUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject/validate');
        });

        it('should build manage LDM url', () => {
            var url = builder.getManageLDMUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject/ldm/manage');
        });

        it('should build template url', () => {
            var url = builder.getTemplatesUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject/templates');
        });
    });
});
