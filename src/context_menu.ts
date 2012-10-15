/// <reference path="lib.d.ts" />

declare var UrlBuilder;

var menuItems = [
    {
        title: 'Show dashboard',
        action: (urlBuilder) => urlBuilder.getEnrichedDashboardViewUrl()
    }//, {                                                        */
    /*    title: 'Show dashboard view',                           */
    /*    action: (urlBuilder) => urlBuilder.getDashboardViewUrl()*/
    /*}, {                                                        */
    /*    title: 'Edit dashboard',                                */
    /*    action: (urlBuilder) => urlBuilder.getDashboardEditUrl()*/
    /*}, {}, {                                                    */
    /*    title: 'Project',                                       */
    /*    action: (urlBuilder) => urlBuilder.getProjectViewUrl()  */
    /*}, {                                                        */
    /*    title: 'Metadata',                                      */
    /*    action: (urlBuilder) => urlBuilder.getProjectMDUri()    */
    /*}, {                                                        */
    /*    title: 'Template',                                      */
    /*}, { type: 'separator' }, {                                 */
    /*    title: 'Validate',                                      */
    /*    action: (urlBuilder) => urlBuilder.getProjectMDUri()    */
    /*}, {                                                        */
    /*    title: 'Export',                                        */
    /*}, {                                                        */
    /*    title: 'Manage LDM',                                    */
    /*}                                                           */
];

class ContextMenu {

    chrome;

    _menuCreated: bool = false;
    _contextMenuId;

    static CONTEXTS = ['all'];

    constructor(public config, public urlBuilder) {
        if (typeof chrome !== 'undefined') {
            this.chrome = chrome;
        }
    }

    createMenu() {
        if (this._menuCreated) return;

        this._contextMenuId = this.chrome.contextMenus.create({
            title: 'GoodData',
            contexts: ContextMenu.CONTEXTS
        });

        this.config.forEach((itemConfig) => {
            var itemId = this.addItem(itemConfig.title, itemConfig.action);
            /*itemConfig.itemId = itemId;*/
        });

        this._menuCreated = true;
    }

    addItem(title, action) {
        if (!title) return;

        var clickHandler = (tab) => {
            this.urlBuilder.parseUrl(tab.pageUrl);
            this.createTab(action(this.urlBuilder));
        }

        return this.chrome.contextMenus.create({
            title: title,
            contexts: ContextMenu.CONTEXTS,
            parentId: this._contextMenuId,
            onclick: clickHandler
        });
    }

    addSeparator() {
        this.chrome.contextMenus.create({
            type: 'separator',
            parentId: this._contextMenuId,
            contexts: ContextMenu.CONTEXTS
        });
    }

    createTab(url: string) {
        this.chrome.tabs.create({ url: url });
    }

};

if (chrome) {
    chrome.tabs.getCurrent(function(tab) {
        console.log(tab);
    });
    var urlBuilder = new UrlBuilder();
    var menu = new ContextMenu(menuItems, urlBuilder);
    menu.createMenu();
}
