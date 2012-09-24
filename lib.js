/**
 * Navigate to an uri in the currently selected tab.
 */
function navigate(url) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.update(tab.id, { url: url });
    });
}
