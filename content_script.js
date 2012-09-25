function initEditor() {
    var $textarea = $('textarea').hide();
    $('<div>', { id: 'aceEditor' }).insertAfter($textarea);

    var editor = ace.edit('aceEditor');
    editor.getSession().setMode("ace/mode/json");
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(4);

    editor.getSession().on('change', function(){
        $textarea.val(editor.getSession().getValue());
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

function updateEditor(editor, json) {
    $('#JSON').attr('checked', true);
    var jsonStr = JSON.stringify(json, null, 4);
    editor.getSession().setValue(jsonStr);
}

function augmentPage() {
    var uri = window.location + '';

    $('body').addClass('editableResource');

    var editor = initEditor();
    downloadJSON().done(function(json) {
        updateEditor(editor, json);
    });
}

var uri = window.location + '';
(uri.indexOf('mode=edit') !== -1) && augmentPage();
