import {UserAgent} from 'express-useragent';

export default function() {
    let source = navigator.userAgent || '';
    // if (req.headers['x-ucbrowser-ua']) {
    //     source = req.headers['x-ucbrowser-ua'];
    // }
    const ua = new UserAgent();
    if (typeof source === 'undefined') {
        source = "unknown";
    }
    ua.Agent.source = source.replace(/^\s*/, '').replace(/\s*$/, '');
    ua.Agent.os = ua.getOS(ua.Agent.source);
    ua.Agent.platform = ua.getPlatform(ua.Agent.source);
    ua.Agent.browser = ua.getBrowser(ua.Agent.source);
    ua.Agent.version = ua.getBrowserVersion(ua.Agent.source);
    ua.testBot();
    ua.testMobile();
    ua.testAndroidTablet();
    ua.testTablet();
    ua.testCompatibilityMode();
    ua.testSilk();
    ua.testKindleFire();
    return ua.Agent.isMobile;
}