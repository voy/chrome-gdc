var menuItems = [{
    title: 'View dashboard',
    onclick: onViewDashboard
}, {
    title: 'Edit dashboard',
    onclick: onEditDashboard
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

function createTab(url) {
    chrome.tabs.create({
        url: url
    });
}

function onViewDashboard(info, tab) {
    var dashboardUrl = getDashboardUrl(info.pageUrl);
    createTab(dashboardUrl);
}

function onEditDashboard(info, tab) {
    var dashboardUrl = getDashboardUrl(info.pageUrl) + '?mode=edit';
    createTab(dashboardUrl);
}

function getDashboardUrl(pageUrl) {
    var siteBase = getSiteBase(pageUrl);
        dashboardUri = getObjectUri(pageUrl),
        url = siteBase + dashboardUri;

    return url;
}

function getSiteBase(pageUrl) {
    return pageUrl.match(/(https?:\/\/.*?)($|\/|\?)/)[1];
}

function getObjectUri(pageUrl) {
    var re = /(\/gdc.*?)\|/g;
    var uris = [], match;
    while (match = re.exec(pageUrl)) uris.push(match[1]);
    return uris && uris[1];
}

// render the context menu and bind event handlers
createContextMenu(menuItems);
