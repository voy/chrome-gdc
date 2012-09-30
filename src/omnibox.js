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
        var url, matches = text.match(/src="(.*?)"/i);

        if (text.indexOf('/') === 0) {
            url = 'https://localhost' + text;
        } else if (matches && matches[1]) {
            if (text.indexOf('dashboard.html') !== -1) {
                url = matches[1] + '&export=1';
            } else {
                url = matches[1];
            }
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
