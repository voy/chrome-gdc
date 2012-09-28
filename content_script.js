var CodeMirror = CodeMirror;

function initEditor(textarea) {
    var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        indentUnit: 4,
        mode: {
            name: 'javascript',
            json: true
        }
    });

    return editor;
}

function downloadJSON() {
    var uri = window.location + '';
    uri = uri.substr(0, uri.indexOf('?'));

    return $.ajax({
        url: uri,
        dataType: 'json'
    });
}

function addEditLink() {
    var editUrl = window.location + '';
    if (editUrl.indexOf('?mode=edit') === -1) editUrl += '?mode=edit';
    $('<a>', {
        href: editUrl,
        text: 'Edit this dashboard'
    }).insertBefore('pre');
}

function isViewDashboardPage() {
    return $('pre').text().indexOf('projectDashboard') !== -1;
}

function augmentPage() {
    isViewDashboardPage() && addEditLink();

    var textarea = document.querySelector('textarea');
    textarea.innerText = '';
    var editor = initEditor(textarea);

    if (isEditMode()) {
        if (!textarea) {
            addEditLink();
            return;
        }

        downloadJSON().done(function(json) {
            editor.setValue(JSON.stringify(json, null, 4));
            $('#JSON').attr('checked', true).parent('fieldset').hide();
        });
    }
}

function isEditMode() {
    var uri = window.location + '';
    return uri.indexOf('mode=edit') !== -1;
}

augmentPage();
