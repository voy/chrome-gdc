var assert = require('chai').assert;
var sinon = require('sinon');

var UrlBuilder = require('../src/url_builder.js');

describe('url builder', function() {
    var testUrl = 'https://secure.gooddata.com/#s=/gdc/projects/FooProject|projectDashboardPage|/gdc/md/5wvh1suon0ix9xso2lfhjwq29j7nrezw/obj/42992|b194fc13979d';

    it('should be creatable from url', function() {
        var builder = UrlBuilder.createFromUrl(testUrl);
        assert.equal(builder.projectUri, '/gdc/projects/FooProject');
        assert.equal(builder.projectMDUri, '/gdc/md/FooProject');
        assert.equal(builder.prefix, 'https://secure.gooddata.com');
    });

    describe('url construction', function() {
        var prefix = 'https://secure.gooddata.com',
            builder;

        function assertUrlCorrect(result, uri) {
            assert.equal(result, prefix + uri);
        }

        beforeEach(function() {
            builder = new UrlBuilder();
            builder.prefix = prefix;
            builder.projectUri = '/gdc/projects/FooProject';
            builder.projectMDUri = '/gdc/md/FooProject';
        });

        it('should build enriched project view url', function() {
            var url = builder.getEnrichedProjectViewUrl();
            assertUrlCorrect(url, '/gdc/projects/FooProject/view');
        });

        it('should build project view url', function() {
            var url = builder.getProjectViewUrl();
            assertUrlCorrect(url, '/gdc/projects/FooProject');
        });

        it('should build project edit url', function() {
            var url = builder.getProjectEditUrl();
            assertUrlCorrect(url, '/gdc/projects/FooProject?mode=edit');
        });

        it('should build project metadata url', function() {
            var url = builder.getProjectMDUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject');
        });

        it('should build project metadata validate url', function() {
            var url = builder.getValidateProjectUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject/validate');
        });

        it('should build manage LDM url', function() {
            var url = builder.getManageLDMUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject/ldm/manage');
        });

        it('should build template url', function() {
            var url = builder.getTemplatesUrl();
            assertUrlCorrect(url, '/gdc/md/FooProject/templates');
        });
    });
});