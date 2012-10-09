/// <reference path="lib.d.ts" />

class DashboardEditor {

	CodeMirror; 
	editor;
	textarea;

	url: string;
	editPageQuery: string;
	editLinkRendered: bool;

	constructor(window) {
		if (typeof window !== 'undefined') {
			this.CodeMirror = window.CodeMirror;
			this.url = window.location + '';
		}

		this.editPageQuery = '?mode=edit';
		this.editLinkRendered = false;
	}

    render() {
        this.renderEditLink();
        this.textarea = this.getTextarea();
        this.editor = this.renderEditor();

        if (this.editor) {
            var callback = this.initializeEditor.bind(this);
            this.downloadDashboardJSON(callback);
        }
    }

    getTextarea() {
        return document.querySelector('textarea');
    }

    renderEditLink() {
        if (!this.shouldRenderEditLink()) return;

        var url = this.getDashboardEditPageUrl();
        this._renderEditLink(url);
    }

    _renderEditLink(url) {
        $('<a>', {
            href: url,
            text: 'Edit dashboard'
        }).insertBefore('pre');
    }

    shouldRenderEditLink() {
        return this.isDashboardViewPage() ||
                (this.isDashboardEditPage() && !this.getTextarea());
    }

    renderEditor() {
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
    }

    initializeEditor(json) {
        var jsonStr = JSON.stringify(json, null, 4);
        this.editor.setValue(jsonStr);
        this.setFormatToJSON();
    }

    setFormatToJSON() {
        $('#JSON').attr('checked', true).parent('fieldset').hide();
    }

    isDashboardEditPage() {
        return this.url.indexOf(this.editPageQuery) !== -1;
    }

    isDashboardViewPage() {
        return $('pre').text().indexOf('projectDashboard') !== -1;
    }

    getDashboardEditPageUrl() {
        var url = this.url;

        if (!this.isDashboardEditPage()) {
            url += this.editPageQuery;
        }

        return url;
    }

    downloadDashboardJSON(callback) {
        $.ajax({
            url: this.url,
            dataType: 'json'
        }).done(callback);
    }

}

/*if (typeof exports !== 'undefined') {*/
if (exports) {
	exports.DashboardEditor = DashboardEditor;
} else {
    var editor = new DashboardEditor(window);
    editor.render();
}
