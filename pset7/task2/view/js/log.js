function getInfo() {
    console.group("Time");
    console.log('Date: ' + new Date());
    console.log('Timezone: ' + new Date().getTimezoneOffset()/60);
    console.groupEnd();

    console.group("Browser");
    console.log('App name: ' + navigator.appName);
    console.log('Product: ' + navigator.product);
    console.log('User-agent header sent: ' + navigator.userAgent);
    console.log('Version: ' + navigator.appVersion);
    console.log('Language: ' + navigator.language);
    console.log('On line: ' + navigator.onLine);
    console.log('Platform: ' + navigator.platform);
    console.log('Java enabled: ' + navigator.javaEnabled());
    console.groupEnd();

    console.group("Cookies");
    console.log('Cookie enabled: ' + navigator.cookieEnabled);
    console.log('Cookies: ' + document.cookie);
    console.groupEnd();

    console.group("Screen");
    console.log('Height (excluding the Windows Taskbar): ' + screen.availHeight);
    console.log('Width (excluding the Windows Taskbar): ' + screen.availWidth);
    console.log('Color depth: ' + screen.colorDepth);
    console.log('Resolution: ' + screen.pixelDepth);
    console.log('Total height: ' + screen.height);
    console.log('Total Width: ' + screen.width);
    console.groupEnd();

    console.group("Location");
    console.log('Hash: ' + location.hash);
    console.log('Hostname, protocol, port: ' + location.origin);
    console.log('Pathname: ' + location.pathname);
    console.log('Referrer: ' + document.referrer);
    console.log('History: ' + history.length);
    console.groupEnd();
}

function consoleLog(text) {
    var d = new Date();
    console.log('['
                    + d.getDate()
                    + '-'
                    + d.getMonth()
                    + '-'
                    + d.getFullYear()
                    + ' '
                    + d.getHours()
                    + ':'
                    + d.getMinutes()
                    + ':'
                    + d.getSeconds()
                + '] '
                + text);
}
