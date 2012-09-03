function extractDashboardUri(info, tab) {
debugger;
    var url = tab.url;
    var match = url.match(/(\/gdc.*?)\|/);


    if (match[0]) {
    }
    debugger;

    chrome.tabs.create({ url: url });
}

console.log('omfg');

var title = 'View dashboard JSON';
var id = chrome.contextMenus.create({
    title: title,
    contexts: ['page'],
    onclick: extractDashboardUri
});
var title = 'Edit dashboard JSON';
var id = chrome.contextMenus.create({
    title: title,
    contexts: ['page'],
    onclick: function() {
        console.log('ehlo');
    }
});
