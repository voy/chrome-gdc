/**
 * When iframe is pasted to omnibox parse our its src attr, append export parameter
 * and navigate to the resulting uri.
 */
function onOmniboxInputEntered(text) {
    var matches = text.match(/src="(.*?)"/i);

    if (matches && matches[1]) {
        var uri = matches[1] + '&export=1';
        navigate(uri);
    } else if (text.indexOf('/') === 0) {
        navigate('https://localhost' + text);
    }

}

chrome.omnibox.onInputEntered.addListener(onOmniboxInputEntered);
