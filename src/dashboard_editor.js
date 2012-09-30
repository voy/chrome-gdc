function DashboardEditor(window) {
    if (typeof window !== 'undefined') {
        this.CodeMirror = window.CodeMirror;
        this.url = window.location + '';
    }

    this.editPageQuery = '?mode=edit';
    this.editLinkRendered = false;
}

DashboardEditor.prototype = {

    render: function() {
        this.renderEditLink();
        this.textarea = this.getTextarea();
        this.editor = this.renderEditor();

        if (this.editor) {
            var callback = this.initializeEditor.bind(this);
            this.downloadDashboardJSON(callback);
        }
    },

    getTextarea: function() {
        return document.querySelector('textarea');
    },

    renderEditLink: function(text) {
        if (!this.shouldRenderEditLink()) return;

        var url = this.getDashboardEditPageUrl();
        this._renderEditLink(url);
    },

    _renderEditLink: function(url) {
        $('<a>', {
            href: url,
            text: 'Edit dashboard'
        }).insertBefore('pre');
    },

    shouldRenderEditLink: function() {
        return this.isDashboardViewPage() ||
                (this.isDashboardEditPage() && !this.getTextarea());
    },

    renderEditor: function() {
        if (!this.textarea) return;

        this.textarea.innerText = '';
        return this.CodeMirror.fromTextArea(this.textarea, {
            lineNumbers: true,
            indentUnit: 4,
            mode: {
                name: 'javascript',
                json: true
            }
        });
    },

    initializeEditor: function(json) {
        var jsonStr = JSON.stringify(json, null, 4);
        this.editor.setValue(jsonStr);
        this.setFormatToJSON();
    },

    setFormatToJSON: function() {
        $('#JSON').attr('checked', true).parent('fieldset').hide();
    },

    isDashboardEditPage: function() {
        return this.url.indexOf(this.editPageQuery) !== -1;
    },

    isDashboardViewPage: function() {
        return $('pre').text().indexOf('projectDashboard') !== -1;
    },

    getDashboardEditPageUrl: function() {
        var url = this.url;

        if (!this.isDashboardEditPage()) {
            url += this.editPageQuery;
        }

        return url;
    },

    downloadDashboardJSON: function(callback) {
        $.ajax({
            url: this.url,
            dataType: 'json'
        }).done(callback);
    }

};

if (typeof module !== 'undefined') {
    module.exports = DashboardEditor;
} else {
    var editor = new DashboardEditor(window);
    editor.render();
}
