/*var menuItems = [{
    title: 'View dashboard',
    onclick: extractDashboardUri
}, {
    title: 'Edit dashboard',
    onclick: extractDashboardUri
}];

function createContextMenu(config) {
    config.forEach(createContextMenuItem);
}

function createContextMenuItem(itemConfig) {
    chrome.contextMenus.create({
        title: itemConfig.title,
        contexts: ['page'],
        onclick: itemConfig.onclick
    });
}

function onViewDashboard(info, tab) {
    var parsedUri = parseUrl(tab);
    if (!parsedUri.dashboardUri) return;


}

function onEditDashboard() {
}

function parseUrl(info, tab) {
    var url = tab.url;
    var dashboardUri = url.match(/(\/gdc.*?)\|/)[1];
    var siteUrl = url.match(/https?:\/\/(.*?)($|\/|\?)/)[1];

    return {
        dashboardUri: dashboardUri,
        siteUrl: siteUrl
    }
}

// render the context menu and bind event handlers
createContextMenu(menuItems);
*/
