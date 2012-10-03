var assert = require('chai').assert;
var sinon = require('sinon');

var Omnibox = require('../src/omnibox.js');

describe('omnibox redirection', function() {
    var omnibox;

    beforeEach(function() {
        omnibox = new Omnibox();
    });

    it('should redirect relative uri to localhost', function() {
        var input = '/gdc/projects/5wvh1suon0ix9xso2lfhjwq29j7nrezw',
            expected = 'https://localhost/gdc/projects/5wvh1suon0ix9xso2lfhjwq29j7nrezw';

        assert.equal(omnibox.getResultUrl(input), expected);
    });

    var embeddedDashboardUrl = '<iframe frameborder="0" src="https://secure.gooddata.com/dashboard.html#project=/gdc/projects/5wvh1suon0ix9xso2lfhjwq29j7nrezw&dashboard=/gdc/md/5wvh1suon0ix9xso2lfhjwq29j7nrezw/obj/42992" width="100%" height="390px"></iframe>';
    var otherUrl = '<iframe frameborder="0" src="https://secure.gooddata.com/" width="100%" height="390px"></iframe>';

    it('should not fail when unknown string is entered', function() {
        assert.equal(omnibox.getResultUrl('Lorizzle nizzle dolor shit amizzle'), undefined);
    });

    it('should redirect dashboard iframe to export uri', function() {
        var expectedUrl = 'https://secure.gooddata.com/dashboard.html#project=/gdc/projects/5wvh1suon0ix9xso2lfhjwq29j7nrezw&dashboard=/gdc/md/5wvh1suon0ix9xso2lfhjwq29j7nrezw/obj/42992&export=1';
        assert.equal(omnibox.getResultUrl(embeddedDashboardUrl), expectedUrl);
    });

    it('should redirect iframe to src uri', function() {
        var expectedUrl = 'https://secure.gooddata.com/';
        assert.equal(omnibox.getResultUrl(otherUrl), expectedUrl);
    });

    it('should obtain redirect uri and navigate to it', function() {
        sinon.stub(omnibox, 'getResultUrl').returns('bar');
        sinon.stub(omnibox, 'navigate');

        omnibox.onInputEntered('foo');
        assert.isTrue(omnibox.getResultUrl.calledWithExactly('foo'));
        assert.isTrue(omnibox.navigate.calledWithExactly('bar'));
    });

    describe('jira issue recognizer', function() {
        var expectedUrl = 'https://jira.gooddata.com/jira/browse/GD-123';

        it('should recognize plain numbers as jira issue id', function() {
            assert.equal(omnibox.getResultUrl('123'), expectedUrl);
        });

        it('should recognize prefixed numbers as jira issue id', function() {
            assert.equal(omnibox.getResultUrl('gd-123'), expectedUrl);
        });

        it('should support different projects', function() {
            var expectedUrl = 'https://jira.gooddata.com/jira/browse/QA-123';
            assert.equal(omnibox.getResultUrl('qa-123'), expectedUrl);
        });
    });
});
