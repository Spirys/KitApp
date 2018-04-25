// Utilities
function getCookie() {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + '_sessionId' + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getLocale() {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + 'locale' + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : 'en';
}