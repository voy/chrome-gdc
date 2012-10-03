function Omnibox() {}

Omnibox.prototype = {

    bind: function() {
        var callback = this.onInputEntered.bind(this);
        chrome.omnibox.onInputEntered.addListener(callback);
    },

    navigate: function(url) {
        chrome.tabs.getSelected(null, function(tab) {
            if (tab.url === 'chrome://newtab/') {
                chrome.tabs.update(tab.id, { url: url });
            } else {
                chrome.tabs.create({ url: url });
            }
        });
    },

    getResultUrl: function(text) {
        var url,
            iframeMatch = text.match(/src="(.*?)"/i),
            iframeUri = iframeMatch && iframeMatch[1],
            jiraMatch = text.match(/(?:[a-z]+-)?([0-9]+)/i),
            jiraIssue = (jiraMatch && jiraMatch[1]) ? 'GD-' + jiraMatch[1] : false;

        if (text.indexOf('/') === 0) {
            url = 'https://localhost' + text;
        } else if (iframeUri) {
            if (text.indexOf('dashboard.html') !== -1) {
                url = iframeUri + '&export=1';
            } else {
                url = iframeUri;
            }
        } else if (jiraIssue) {
            return 'https://jira.gooddata.com/jira/browse/' + jiraIssue;
        }

        return url;
    },

    /**
     * When iframe is pasted to omnibox parse our its src attr, append export parameter
     * and navigate to the resulting uri.
     */
    onInputEntered: function(text) {
        var url = this.getResultUrl(text);
        url && this.navigate(url);
    }
};

if (typeof module !== 'undefined') {
    module.exports = Omnibox;
} else {
    var omnibox = new Omnibox();
    omnibox.bind();
}
