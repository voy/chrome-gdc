var uri = window.location + '';

if (uri.indexOf('mode=edit') !== -1) {
    /*$('textarea').bind('keydown', function(e) {
      var keyCode = e.keyCode || e.which;

      if (keyCode == 9) {
        e.preventDefault();
        var start = $(this).get(0).selectionStart;
        var end = $(this).get(0).selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start)
                    + "    "
                    + $(this).val().substring(end));

        // put caret at right position again
        $(this).get(0).selectionStart =
        $(this).get(0).selectionEnd = start + 1;
      }
    });*/

    var $textarea = $('textarea');
    $('<div>', { id: 'ace' }).insertAfter($textarea);
    $textarea.hide();
    var editor = ace.edit('ace');
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/yaml");
    editor.getSession().setValue($textarea.val());
    editor.getSession().setTabSize(4);
    //ace.edit(document.querySelector('textarea'));
    $('body').addClass('editableResource');
    //$('textarea').attr('wrap', 'off');
    $('<a>', {
        href: '#',
        text: 'Download JSON',
        click: function() {
            downloadJSON(function(dashboardJSON) {
                $('textarea').val(JSON.stringify(dashboardJSON, null, 4));
                $('#JSON').attr('checked', true);
            });
        }
    }).prependTo('form > .params');
}

function downloadJSON(callback) {
    var uri = window.location + '';
    uri = uri.substr(0, uri.indexOf('?'));

    $.ajax({
        url: uri,
        dataType: 'json'
    }).done(callback);
}
