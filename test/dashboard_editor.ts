var assert = require('chai').assert;
var sinon = require('sinon');

var DashboardEditor = require('../src/dashboard_editor.js');


describe('DashboardEditor', function() {
    var editor;

    var dashboardViewUrl = 'https://secure.gooddata.com/gdc/md/FoodMart/obj/42992',
        dashboardEditUrl = 'https://secure.gooddata.com/gdc/md/FoodMart/obj/42992?mode=edit';

    beforeEach(function() {
        editor = new DashboardEditor();
    });

    it('should not initialize editor when it is not present on page', function() {
        sinon.stub(editor, 'renderEditLink');
        sinon.stub(editor, 'getTextarea');
        sinon.stub(editor, 'renderEditor').returns(null);
        sinon.stub(editor, 'downloadDashboardJSON');
        editor.render();

        assert.isTrue(editor.downloadDashboardJSON.notCalled);
    });

    it('should set itself up from the window object if supplied', function() {
        editor = new DashboardEditor({
            CodeMirror: 'dummy',
            location: 'http://foo.bar'
        });

        assert.equal('http://foo.bar', editor.url);
        assert.equal('dummy', editor.CodeMirror);
    });

    it('should render editor and reset it properly', function() {
        editor.textarea = { innerText: 'some previous content' };
        editor.CodeMirror = { fromTextArea: sinon.spy() };
        editor.renderEditor();

        assert.equal('', editor.textarea.innerText);
        assert.isTrue(editor.CodeMirror.fromTextArea.calledOnce);
        assert.isTrue(editor.CodeMirror.fromTextArea.calledWith(editor.textarea));
    });

    it('should be able to tell if url is dashboard edit page', function() {
        editor.url = dashboardViewUrl;
        assert.isFalse(editor.isDashboardEditPage());
        editor.url = dashboardEditUrl;
        assert.isTrue(editor.isDashboardEditPage());
    });

    it('should render edit link on view page', function() {
        sinon.stub(editor, 'isDashboardViewPage').returns(true);

        assert.isTrue(editor.shouldRenderEditLink());
    });

    it('should render edit link on edit success page', function() {
        sinon.stub(editor, 'isDashboardViewPage').returns(false);
        sinon.stub(editor, 'isDashboardEditPage').returns(true);
        sinon.stub(editor, 'getTextarea').returns(null);

        assert.isTrue(editor.shouldRenderEditLink());
    });

    it('should not render edit link on plain edit page', function() {
        sinon.stub(editor, 'isDashboardViewPage').returns(false);
        sinon.stub(editor, 'isDashboardEditPage').returns(true);
        sinon.stub(editor, 'getTextarea').returns({});

        assert.isFalse(editor.shouldRenderEditLink());
    });

    it('should be able to construct dashboard edit page url', function() {
        editor.url = dashboardViewUrl;
        assert.equal(dashboardEditUrl, editor.getDashboardEditPageUrl());
        editor.url = dashboardEditUrl;
        assert.equal(dashboardEditUrl, editor.getDashboardEditPageUrl());
    });

    it('should initialize dashboard to use JSON', function() {
        editor.editor = { setValue: sinon.spy() };
        sinon.stub(editor, 'setFormatToJSON');
        editor.initializeEditor({ some: "json" });

        assert.equal(true, editor.setFormatToJSON.calledOnce);
        assert.equal(true, editor.editor.setValue.calledOnce);
        var setValueParam = editor.editor.setValue.getCall(0).args[0];
        assert.notEqual(setValueParam.indexOf('{'), -1);
    });
});
