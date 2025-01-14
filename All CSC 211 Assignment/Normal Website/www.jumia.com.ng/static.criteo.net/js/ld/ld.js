! function() {
    "use strict";

    function s(e, t) {
        var n, o, i = null === (n = window.Criteo) || void 0 === n ? void 0 : n.oneTagConfig;
        return null !== (o = i && i[e]) && void 0 !== o ? o : t
    }
    var c, e, u = "5.22.0";
    (e = c = c || {})[e.None = 0] = "None", e[e.Cookie = 1] = "Cookie", e[e.LocalStorage = 2] = "LocalStorage";
    var M = (o.checkLocalStorageIsWritable = function() {
        try {
            if (!window.localStorage) return !1;
            var e = "criteo_localstorage_check";
            return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0
        } catch (e) {
            return !1
        }
    }, o.checkCookiesAreWritable = function() {
        var e = new o("criteo_write_test", 1e4);
        e.setValueWithNoDomain("1");
        var t = "1" === e.cookieValue;
        return e.removeWithNoDomain(), t
    }, o.prototype.setCookieRead = function() {
        this.isCookieRead = !0
    }, o.prototype.setValue = function(e, t) {
        void 0 === t && (t = !0), this.cookieValue = e, this.isCookieValueExternallySet = !0, t && this.writeOnAllStorages(e)
    }, o.prototype.setValueFromExistingCookie = function() {
        var e = this.getValue();
        void 0 !== e && (this.cookieValue = e, this.cookieOrigin |= c.Cookie)
    }, o.prototype.setValueFromAllStorages = function() {
        var e = this.getFromAllStorages();
        this.cookieValue = e.value, this.cookieOrigin = e.origin
    }, o.prototype.getValue = function() {
        for (var e = 0, t = document.cookie.split(";"); e < t.length; e++) {
            var n = t[e];
            if (n.substr(0, n.indexOf("=")).replace(/^\s+|\s+$/g, "") === this.cookieName) {
                var o = n.substr(n.indexOf("=") + 1);
                return (decodeURIComponent || unescape)(o)
            }
        }
    }, o.prototype.removeWithNoDomain = function() {
        this.setValueWithNoDomainWithExpiration("", 0)
    }, o.prototype.removeOnMainDomain = function() {
        this.setOnMainDomainWithExpiration("", 0)
    }, o.prototype.setOnMainDomain = function(e) {
        return this.setOnMainDomainWithExpiration(e, this.cookieRetentionTimeInMs)
    }, o.prototype.writeOnAllStorages = function(e) {
        this.setOnMainDomain(e), this.useLocalStorage && window.localStorage.setItem(this.cookieName, e)
    }, o.prototype.getFromAllStorages = function() {
        switch (this.cookieOrigin) {
            case c.LocalStorage:
                return {
                    value: window.localStorage.getItem(this.cookieName),
                    origin: c.LocalStorage
                };
            case c.Cookie:
                return {
                    value: this.getValue(),
                    origin: c.Cookie
                };
            case c.None:
                var e = null;
                this.useLocalStorage && (e = window.localStorage.getItem(this.cookieName));
                var t = this.getValue() || null;
                return {
                    value: t || e,
                    origin: this.computeStorageOrigin(t, e)
                }
        }
    }, o.prototype.removeFromAllStorages = function() {
        this.removeOnMainDomain(), this.useLocalStorage && window.localStorage.removeItem(this.cookieName)
    }, o.prototype.setValueWithNoDomainWithExpiration = function(e, t) {
        var n = new Date;
        n.setTime(n.getTime() + t);
        var o = "expires=" + n.toUTCString(),
            i = encodeURIComponent || escape;
        document.cookie = this.cookieName + "=" + i(e) + ";" + o + ";path=/";
        var r = this.getValue();
        void 0 !== r && (this.cookieValue = r)
    }, o.prototype.setValueWithNoDomain = function(e) {
        this.setValueWithNoDomainWithExpiration(e, this.cookieRetentionTimeInMs)
    }, o.prototype.toFragmentData = function() {
        return {
            origin: this.cookieOrigin,
            value: this.cookieValue
        }
    }, o.prototype.setOnMainDomainWithExpiration = function(e, t) {
        var n = new Date;
        n.setTime(n.getTime() + t);
        for (var o = "expires=" + n.toUTCString(), i = null === document.location ? [] : document.location.hostname.split("."), r = null, a = 0; a < i.length; ++a) {
            var s = "domain=." + (r = i.slice(i.length - a - 1, i.length).join(".")),
                c = encodeURIComponent || escape;
            document.cookie = this.cookieName + "=" + c(e) + ";" + o + ";" + s + ";path=/";
            var u = this.getValue();
            if (u && u === e) break
        }
        return r || document.location
    }, o.prototype.computeStorageOrigin = function(e, t) {
        var n = c.None;
        return e && (n |= c.Cookie), t && (n |= c.LocalStorage), n
    }, o.prototype.getMatchingKeyInAllStorage = function(e) {
        if (!(e instanceof RegExp)) return e;
        if ("undefined" != typeof localStorage)
            for (var t = 0, n = Object.keys(localStorage); t < n.length; t++) {
                var o = n[t];
                if (e.test(o)) return o
            }
        for (var i = 0, r = document.cookie.split(";"); i < r.length; i++) {
            var a = r[i];
            if (e.test(a)) return a
        }
        return ""
    }, o);

    function o(e, t, n) {
        void 0 === n && (n = c.None), this.cookieValue = null, this.isCookieValueExternallySet = !1, this.isCookieRead = !1, this.cookieName = this.getMatchingKeyInAllStorage(e), this.cookieRetentionTimeInMs = t, this.cookieOrigin = n, this.useLocalStorage = o.checkLocalStorageIsWritable()
    }
    var l, t, r = "OneTag",
        a = ["color: #fff;", "background: #ff4f00;", "display: inline-block;", "padding: 1px 4px;", "border-radius: 3px;"].join(" ");
    (t = l = l || {})[t.Off = 0] = "Off", t[t.Error = 1] = "Error", t[t.Warning = 2] = "Warning", t[t.Info = 3] = "Info", t[t.Debug = 4] = "Debug";
    var n, i, O = (d.setLogLevel = function(e) {
        d.level = e, this.debug("Log level set to " + l[e])
    }, d.debug = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        d.log(console.log, l.Debug, e)
    }, d.info = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        d.log(console.log, l.Info, e)
    }, d.warn = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        d.log(console.warn, l.Warning, e)
    }, d.error = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        d.log(console.error, l.Error, e)
    }, d.log = function(e, t, n) {
        if (t <= d.level) {
            var o = window.navigator.userAgent,
                i = 0 < o.indexOf("MSIE ") || 0 < o.indexOf("Trident/") ? ["[" + r + "]"] : ["%c" + r, a];
            e.apply(console, i.concat(n))
        }
    }, d.level = l.Warning, d);

    function d() {}(i = n = n || {})[i.Unknown = 0] = "Unknown", i[i.TopLevel = 1] = "TopLevel", i[i.Child = 2] = "Child";
    var x = (p.extractHostname = function(e) {
        var t = document.createElement("a");
        return t.href = e, t.hostname
    }, p.getAnchorWithReferrer = function(e) {
        if (e && e.referrer) {
            var t = e.createElement("a");
            return t.href = e.referrer, t
        }
        return null
    }, p.getQueryString = function(t) {
        var n;
        try {
            n = t.top.location.search
        } catch (e) {
            var o = t;
            try {
                for (; o.parent.document !== o.document && o.parent.document;) o = o.parent
            } catch (e) {}
            if (o) {
                var i = p.getAnchorWithReferrer(o.document);
                i && (n = i.search)
            }
        }
        return n
    }, p.getHighestAccessibleUrl = function(e) {
        var t, n = p.getHighestAccessibleWindow(e),
            o = n.topFrame;
        if (n.err) try {
            try {
                t = o.top.location.href
            } catch (e) {
                var i = o.location.ancestorOrigins;
                t = i[i.length - 1]
            }
        } catch (e) {
            t = o.document.referrer
        } else t = o.location.href;
        return t
    }, p.getPreviousUrl = function(e) {
        var t, n, o = p.getHighestAccessibleWindow(e),
            i = o.topFrame,
            r = "";
        if (o.err || (r = i.document.referrer || (null === (t = i.top) || void 0 === t ? void 0 : t.document.referrer) || ""), !r) {
            var a = null === (n = i.location) || void 0 === n ? void 0 : n.ancestorOrigins;
            a && 0 < a.length && (r = a[a.length - 1])
        }
        return r
    }, p.onBodyReady = function(t, n) {
        ! function e() {
            document.body ? t.setProtectedTimeout(n, 0) : t.setProtectedTimeout(e, 10)
        }()
    }, p.onDocumentReady = function(n, o) {
        if ("complete" === document.readyState) o();
        else if (document.addEventListener) n.addProtectedEventListener(document, "DOMContentLoaded", o, !1), n.addProtectedEventListener(window, "load", o, !1);
        else {
            n.attachProtectedEvent(document, "onreadystatechange", o), n.attachProtectedEvent(window, "onload", o);
            var e = !1;
            try {
                e = null === window.frameElement && document.documentElement
            } catch (e) {}
            if (e && e.doScroll) ! function t() {
                if (e) {
                    try {
                        e.doScroll("left")
                    } catch (e) {
                        return void n.setProtectedTimeout(t, 50)
                    }
                    o()
                }
            }();
            else {
                var t = !1,
                    i = null === document.onload ? null : function(e, t) {
                        return e.onload(t)
                    },
                    r = null === document.onreadystatechange ? null : function(e, t) {
                        return e.onreadystatechange(t)
                    };
                document.onload = document.onreadystatechange = function(e) {
                    r instanceof Function && r(document, e), t || document.readyState && "complete" !== document.readyState || (i instanceof Function && i(document, e), t = !0, o())
                }
            }
        }
    }, p.removeLater = function(e, t) {
        e.setProtectedTimeout(function() {
            null !== t && null !== t.parentElement && t.parentElement.removeChild(t)
        }, 3e4)
    }, p.appendCriteoContainer = function(e) {
        if (!e) return null;
        var t = document.createElement("div");
        return t.setAttribute("id", "criteo-tags-div"), t.style.display = "none", e.appendChild(t), t
    }, p.getOneTagLocation = function() {
        try {
            return window.self === window.top ? n.TopLevel : n.Child
        } catch (e) {
            return O.info("Cannot get OneTag location", e), n.Unknown
        }
    }, p.getHighestAccessibleWindow = function(e) {
        var t = e,
            n = !1;
        try {
            for (; t.parent.document !== t.document;) {
                if (!t.parent.document) {
                    n = !0;
                    break
                }
                t = t.parent
            }
        } catch (e) {
            n = !0
        }
        return {
            topFrame: t,
            err: n
        }
    }, p);

    function p() {}
    var f = (h.prototype.getReadyToRetrieveProvider = function() {
        return this.tcfv2ConsentProvider.hasCallerFunctionInFrame() ? this.tcfv2ConsentProvider : this.tcfv1ConsentProvider.hasCallerFunctionInFrame() ? this.tcfv1ConsentProvider : void 0 !== this.tcfv2ConsentProvider.getCMPFrame() ? this.tcfv2ConsentProvider : void 0 !== this.tcfv1ConsentProvider.getCMPFrame() ? this.tcfv1ConsentProvider : void 0
    }, h.prototype.retrieveConsentForPassback = function(e) {
        var t = this.getReadyToRetrieveProvider();
        void 0 === t && (this.logger("No compatible GDPR privacy provider found"), e(void 0)), t === this.tcfv1ConsentProvider ? this.tcfv1ConsentProvider.retrieveConsentForPassback(e) : t === this.tcfv2ConsentProvider && this.tcfv2ConsentProvider.retrieveConsent(e)
    }, h.prototype.retrieveConsent = function(e) {
        var t = this.getReadyToRetrieveProvider();
        void 0 === t && (this.logger("No compatible GDPR privacy provider found"), e(void 0)), null == t || t.retrieveConsent(e)
    }, h.prototype.readyToRetrieve = function() {
        return this.tcfv2ConsentProvider.readyToRetrieve() || this.tcfv1ConsentProvider.readyToRetrieve()
    }, h);

    function h(e, t, n) {
        void 0 === n && (n = function(e) {}), this.tcfv1ConsentProvider = e, this.tcfv2ConsentProvider = t, this.logger = n
    }

    function g(e) {
        try {
            return JSON.parse(e)
        } catch (e) {
            return
        }
    }
    var m = (v.prototype.getCMPFrame = function() {
        for (var e, t = this.currentWindow, n = 0; n < 10; ++n) {
            try {
                t.frames.__cmpLocator && (e = t)
            } catch (e) {}
            if (t === this.currentWindow.top) break;
            t = t.parent
        }
        return e
    }, v.prototype.hasCallerFunctionInFrame = function() {
        return "function" == typeof this.currentWindow.__cmp
    }, v.prototype.readyToRetrieve = function() {
        return this.hasCallerFunctionInFrame() || void 0 !== this.getCMPFrame()
    }, v.prototype.pingWithTimeout = function(o, e, t, n) {
        function i(e, t) {
            r.logger(t), clearTimeout(e), n()
        }
        var r = this;
        return window.setTimeout(function() {
            var n = window.setTimeout(function() {
                i(o, "Timeout: Unable to get ping return after " + e + "ms")
            }, e);
            r.executeCommand("ping", null, function(e, t) {
                clearTimeout(n), t ? (r.logger("GDPR CMP ping returned"), !0 !== e.cmpLoaded && i(o, "GDPR ping returned cmpLoaded which is not true"), r.logger("GDPR ping returned cmpLoaded which is true")) : i(o, "Error sending ping to GDPR CMP")
            })
        }, t)
    }, v.prototype.retrieveConsent = function(e) {
        this.executeRetrieveConsent("getConsentData", null, e)
    }, v.prototype.retrieveConsentForPassback = function(e) {
        this.executeRetrieveConsent("getVendorConsents", [91], e)
    }, v.prototype.executeRetrieveConsent = function(e, t, n) {
        var o = this,
            i = !1,
            r = window.setTimeout(function() {
                i = !0, o.logger("Timeout: Unable to resolve GDPR consent after " + o.timeout + "ms"), n(void 0)
            }, this.timeout),
            a = !1 !== this.cmpAutoDetect ? this.pingWithTimeout(r, this.pingTimeout, this.pingDelay, function() {
                i = !0, o.logger("Timeout: Unable to ping GDPR API after " + o.pingTimeout + "ms"), n(void 0)
            }) : void 0;
        this.executeCommand(e, t, function(e, t) {
            clearTimeout(a), i || (clearTimeout(r), t ? (o.logger("GDPR consent retrieved"), o.processConsentData(e, n)) : (o.logger("Error retrieving GDPR consent data from CMP"), n(void 0)))
        })
    }, v.prototype.processConsentData = function(e, t) {
        if (e) {
            var n = {};
            void 0 !== e.consentData && (n.consentData = e.consentData), void 0 !== e.gdprApplies && (n.gdprApplies = !!e.gdprApplies), t(n)
        } else this.logger("Unable to read GDPR consent data from CMP"), t(void 0)
    }, v.prototype.executeCommand = function(e, t, n) {
        var r = this;
        if (!this.hasCallerFunctionInFrame()) {
            this.logger("No GDPR CMP defined on current frame");
            var a = this.getCMPFrame();
            this.currentWindow.__cmp = function(e, t, n) {
                if (!a) return r.logger("GDPR CMP not found in any frame"), void n({
                    msg: "GDPR CMP not found in any frame"
                }, !1);
                var o = Math.random().toString(10),
                    i = {
                        __cmpCall: {
                            command: e,
                            parameter: t,
                            callId: o
                        }
                    };
                r.cmpCallbacks[o] = n, a.postMessage(i, "*")
            }, this.currentWindow.addEventListener("message", function(e) {
                var t = "string" == typeof e.data ? g(e.data) : e.data;
                if (t && t.__cmpReturn && t.__cmpReturn.callId && t.__cmpReturn.returnValue) {
                    var n = t.__cmpReturn;
                    r.cmpCallbacks && r.cmpCallbacks[n.callId] && (r.cmpCallbacks[n.callId](n.returnValue, n.success), delete r.cmpCallbacks[n.callId])
                }
            }, !1)
        }
        this.currentWindow.__cmp(e, t, n)
    }, v);

    function v(e, t, n) {
        void 0 === n && (n = function(e) {}), this.cmpCallbacks = {}, this.currentWindow = e, this.timeout = t.tcfTimeout, this.pingTimeout = t.tcfPingTimeout, this.pingDelay = t.tcfPingDelay, this.cmpAutoDetect = t.cmpAutoDetect, this.logger = n
    }
    var y, C;
    (C = y = y || {}).LOADED = "tcloaded", C.UI_SHOWN = "cmpuishown", C.USER_ACTION_COMPLETE = "useractioncomplete";
    var w = (b.prototype.getCMPFrame = function() {
        for (var e, t = this.currentWindow, n = 0; n < 10; ++n) {
            try {
                t.frames.__tcfapiLocator && (e = t)
            } catch (e) {}
            if (t === this.currentWindow.top) break;
            t = t.parent
        }
        return e
    }, b.prototype.hasCallerFunctionInFrame = function() {
        return "function" == typeof this.currentWindow.__tcfapi
    }, b.prototype.readyToRetrieve = function() {
        return this.hasCallerFunctionInFrame() || void 0 !== this.getCMPFrame()
    }, b.prototype.pingWithTimeout = function(n, e, t, o) {
        function i(e, t) {
            r.logger(t), clearTimeout(e), o()
        }
        var r = this;
        return window.setTimeout(function() {
            var t = window.setTimeout(function() {
                i(n, "Timeout: Unable to get TCFv2 ping return after " + e + "ms")
            }, e);
            r.executeCommand("ping", 2, function(e) {
                clearTimeout(t), r.logger("TCFv2 CMP ping returned in ms"), "error" === e.cmpStatus ? i(n, "Error status on ping to TCFv2 CMP") : !0 !== e.cmpLoaded ? i(n, "TCFv2 ping returned cmpLoaded = false") : r.logger("TCFv2 ping returned cmpLoaded = true")
            })
        }, t)
    }, b.prototype.retrieveConsent = function(n) {
        var o, i, r = this,
            a = !1,
            s = window.setTimeout(function() {
                a = !0, i === y.UI_SHOWN ? (r.logger("Timeout: User hasn't confirm their consent settings after " + r.timeout + "ms"), n(o)) : (r.logger("Timeout: Unable to resolve TCFv2 consent after " + r.timeout + "ms"), n(void 0))
            }, this.timeout),
            c = !1 !== this.cmpAutoDetect ? this.pingWithTimeout(s, this.pingTimeout, this.pingDelay, function() {
                a = !0, r.logger("Timeout: Unable to ping TCFv2 API after " + r.pingTimeout + "ms"), n(void 0)
            }) : void 0;
        this.executeCommand("addEventListener", 2, function(e, t) {
            clearTimeout(c), a || ((i = e.eventStatus) !== y.UI_SHOWN && clearTimeout(s), t ? (r.logger("TCFv2 consent retrieved in ms"), e || (r.logger("Unable to read GDPR consent data from CMP"), n(void 0)), o = r.processResponseData(e), i !== y.LOADED && i !== y.USER_ACTION_COMPLETE || n(o)) : (r.logger("Error retrieving TCFv2 consent data from CMP"), n(void 0)))
        })
    }, b.prototype.processResponseData = function(e) {
        var t, n, o = {};
        return void 0 !== e.tcString && (o.consentData = e.tcString), void 0 !== e.gdprApplies && (o.gdprApplies = !!e.gdprApplies), o.version = e.tcfPolicyVersion ? e.tcfPolicyVersion : 2, o.purposes = null === (t = null == e ? void 0 : e.purpose) || void 0 === t ? void 0 : t.consents, o.vendorConsents = null === (n = null == e ? void 0 : e.vendor) || void 0 === n ? void 0 : n.consents, o
    }, b.prototype.executeCommand = function(e, t, n, o) {
        var a = this;
        if (!this.hasCallerFunctionInFrame()) {
            this.logger("No TCFv2 CMP defined on current frame");
            var s = this.getCMPFrame();
            this.currentWindow.__tcfapi = function(e, t, n, o) {
                if (!s) return a.logger("TCFv2 CMP not found in any frame"), void n({
                    msg: "TCFv2 CMP not found in any frame"
                }, !1);
                var i = Math.random().toString(10),
                    r = {
                        __tcfapiCall: {
                            command: e,
                            version: t,
                            parameter: o,
                            callId: i
                        }
                    };
                a.cmpCallbacks[i] = n, s.postMessage(r, "*")
            }, this.currentWindow.addEventListener("message", function(e) {
                var t = "string" == typeof e.data ? g(e.data) : e.data;
                if (t && t.__tcfapiReturn && t.__tcfapiReturn.callId && t.__tcfapiReturn.returnValue) {
                    var n = t.__tcfapiReturn;
                    a.cmpCallbacks && a.cmpCallbacks[n.callId] && "function" == typeof a.cmpCallbacks[n.callId] && (a.cmpCallbacks[n.callId](n.returnValue, n.success), n.returnValue.eventStatus !== y.UI_SHOWN && delete a.cmpCallbacks[n.callId])
                }
            }, !1)
        }
        this.currentWindow.__tcfapi(e, t, n, o)
    }, b);

    function b(e, t, n) {
        void 0 === n && (n = function(e) {}), this.cmpCallbacks = {}, this.currentWindow = e, this.timeout = t.tcfTimeout, this.pingTimeout = t.tcfPingTimeout, this.pingDelay = t.tcfPingDelay, this.cmpAutoDetect = t.cmpAutoDetect, this.logger = n
    }
    var k = (P.prototype.getCMPFrame = function() {
        for (var e, t = this.currentWindow, n = 0; n < 10; ++n) {
            try {
                t.frames.__uspapiLocator && (e = t)
            } catch (e) {}
            if (t === this.currentWindow.top) break;
            t = t.parent
        }
        return e
    }, P.prototype.hasCallerFunctionInWindow = function() {
        return "function" == typeof this.currentWindow.__uspapi
    }, P.prototype.readyToRetrieve = function() {
        return this.hasCallerFunctionInWindow() || void 0 !== this.getCMPFrame()
    }, P.prototype.retrieveConsent = function(n) {
        var o = this,
            i = !1,
            r = window.setTimeout(function() {
                i = !0, o.logger("Timeout: Unable to resolve CCPA consent after " + o.timeout + "ms"), n(void 0)
            }, this.timeout);
        this.executeCommand("getUSPData", 1, function(e, t) {
            i || (clearTimeout(r), t ? (o.logger("CCPA consent retrieved"), o.processResponseData(e, n)) : (o.logger("Error retrieving CCPA consent data from CMP"), n(void 0)))
        })
    }, P.prototype.processResponseData = function(e, t) {
        e ? t(e) : (this.logger("Unable to read CCPA consent data from CMP"), t(void 0))
    }, P.prototype.executeCommand = function(e, t, n) {
        var r = this;
        if (!this.hasCallerFunctionInWindow()) {
            this.logger("No CCPA CMP defined on current frame");
            var a = this.getCMPFrame();
            this.currentWindow.__uspapi = function(e, t, n) {
                if (!a) return r.logger("CCPA CMP not found in any frame"), void n({
                    msg: "CCPA CMP not found in any frame"
                }, !1);
                var o = Math.random().toString(10),
                    i = {
                        __uspapiCall: {
                            command: e,
                            parameter: t,
                            callId: o
                        }
                    };
                r.uspapiCallbacks[o] = n, a.postMessage(i, "*")
            }, this.currentWindow.addEventListener("message", function(e) {
                var t = "string" == typeof e.data ? g(e.data) : e.data;
                if (t && t.__uspapiReturn && t.__uspapiReturn.callId && t.__uspapiReturn.returnValue) {
                    var n = t.__uspapiReturn;
                    r.uspapiCallbacks && r.uspapiCallbacks[n.callId] && (r.uspapiCallbacks[n.callId](n.returnValue, n.success), delete r.uspapiCallbacks[n.callId])
                }
            }, !1)
        }
        this.currentWindow.__uspapi(e, t, n)
    }, P.prototype.hasUserOptOut = function(e) {
        return !(!e || !e.uspString || "1YNY" === e.uspString.toUpperCase() || "1YNN" === e.uspString.toUpperCase() || "1YN-" === e.uspString.toUpperCase() || "1-N-" === e.uspString.toUpperCase() || "1---" === e.uspString)
    }, P);

    function P(e, t, n) {
        void 0 === n && (n = function(e) {}), this.uspapiCallbacks = {}, this.currentWindow = e, this.timeout = t.uspApiTimeout, this.logger = n
    }
    var L = (S.prototype.retrieveConsent = function(t) {
        var e = this.tcfCompatibleConsentProvider.readyToRetrieve(),
            n = this.ccpaConsentProvider.readyToRetrieve(),
            o = {};
        if (e || n) {
            var i = e && n ? 2 : 1;
            e && this.tcfCompatibleConsentProvider.retrieveConsent(function(e) {
                o.gdprConsent = e, 0 == --i && t(o)
            }), n && this.ccpaConsentProvider.retrieveConsent(function(e) {
                o.ccpaConsent = e, 0 == --i && t(o)
            })
        } else t(o)
    }, S);

    function S(e, t, n, o) {
        void 0 === t && (t = 1e4), void 0 === n && (n = 50), void 0 === o && (o = 1e3);
        var i = {
                tcfTimeout: t,
                tcfPingTimeout: n,
                tcfPingDelay: o
            },
            r = {
                uspApiTimeout: t
            };
        this.tcfCompatibleConsentProvider = new f(new m(e, i, O.info), new w(e, i, O.info), O.info), this.ccpaConsentProvider = new k(e, r, O.info)
    }
    var U = (T.prototype.catchAndStoreException = function(e, t) {
        try {
            return void 0 === t ? e() : e.apply(this, t)
        } catch (e) {
            e instanceof Error ? this.exceptions.push(e) : this.exceptions.push(new Error(e))
        }
    }, T.prototype.setProtectedTimeout = function(e, t) {
        var n = this;
        if ("undefined" != typeof window && "function" == typeof window.setTimeout) return window.setTimeout(function() {
            return n.catchAndStoreException(e)
        }, t)
    }, T.prototype.addProtectedEventListener = function(e, t, n, o) {
        var i = this;
        if (void 0 !== e && "function" == typeof e.addEventListener) return e.addEventListener(t, function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return i.catchAndStoreException(n, e)
        }, o)
    }, T.prototype.attachProtectedEvent = function(e, t, n) {
        var o = this;
        if (void 0 !== e && "function" == typeof e.attachEvent) return e.attachEvent(t, function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return o.catchAndStoreException(n, e)
        })
    }, T);

    function T() {
        this.exceptions = []
    }

    function N(e, t) {
        if (e instanceof Array)
            for (var n = 0, o = e; n < o.length; n++) {
                N(o[n], t)
            } else W(t, e) || t.push(e)
    }

    function W(e, t) {
        for (var n = JSON.stringify || encodeURIComponent || escape, o = n(t), i = 0, r = e; i < r.length; i++) {
            var a = r[i];
            if (a === t || n(a) === o) return !0
        }
        return !1
    }

    function _(e, t) {
        var n = [];
        if (void 0 === e) return void 0 === t ? n : t.slice();
        if (void 0 === t) return e.slice();
        for (var o = 0, i = t; o < i.length; o++) {
            var r = i[o];
            W(e, r) || n.push(r)
        }
        return e.concat(n)
    }

    function V(e) {
        for (var t = [], n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            null != i && t.push(i)
        }
        return t
    }

    function B(e, t) {
        if (void 0 === e && void 0 === t) return !0;
        if (void 0 === e || void 0 === t) return !1;
        if (!(e instanceof Array)) return B([e], t);
        if (!(t instanceof Array)) return B(e, [t]);
        if (e.length !== t.length) return !1;
        for (var n = 0, o = e; n < o.length; n++) {
            if (!W(t, o[n])) return !1
        }
        return !0
    }

    function j(e) {
        var t = e;
        if (e instanceof Function) return (t = e()) instanceof Function ? t : j(t);
        if (e instanceof Array) {
            t = [];
            for (var n = 0; n < e.length; ++n) t[n] = j(e[n])
        } else if (e && "[object Object]" === e.toString()) {
            t = {};
            for (var o = 0, i = Object.getOwnPropertyNames(e); o < i.length; o++) {
                var r = i[o];
                t[r] = j(e[r])
            }
        }
        return t
    }

    function q(e, t) {
        for (var n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            if (i.event === t.event && B(t.account, i.account)) {
                for (var r in t) t.hasOwnProperty(r) && "account" !== r && (i[r] = t[r]);
                return
            }
        }
        e.push(t)
    }

    function G(e, t) {
        for (var n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            if (i.event === t.event && B(t.account, i.account) && i.hash_method === t.hash_method) return void(void 0 !== t.email && (i.email = _(i.email instanceof Array || void 0 === i.email ? i.email : [i.email], t.email instanceof Array ? t.email : [t.email])))
        }
        e.push(t)
    }

    function H(e, t, n) {
        var o = j(n);
        return z(e, o), q(t, j(o)), 1
    }

    function z(e, t) {
        for (var n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            if (i.event === t.event && void 0 === t.account && void 0 === i.account || B(t.account, i.account)) {
                for (var r in t) t.hasOwnProperty(r) && "account" !== r && (i[r] = t[r]);
                return
            }
        }
        e.push(t)
    }

    function J(e) {
        if (void 0 !== e.identity && JSON.stringify) {
            var t = e.identity instanceof Array ? e.identity : [e.identity];
            e.raw_identity = JSON.stringify(t), delete e.identity
        }
    }
    var Y = (I.prototype.fillQueryStringParams = function(e, t) {
        var n = this.config.trackingCallData.firstPartyIdentifier;
        n && e.push("fpid=" + n), this.gaid && e.push("ai=" + this.gaid), this.idfa && e.push("idfa=" + this.idfa), this.canWriteCookie && e.push("adce=1"), null !== this.clickOriginPayload && e.push("cop=" + this.clickOriginPayload), null !== this.optoutCookie.cookieValue && e.push("optout=1"), null != this.bundleCookie.cookieValue && e.push("bundle=" + this.bundleCookie.cookieValue), null !== this.secureIdCookie.cookieValue && (e.push("sid=" + this.secureIdCookie.cookieValue), e.push("sid_read=" + (this.secureIdCookie.isCookieValueExternallySet ? "1" : "0"))), null !== this.tld && e.push("tld=" + this.tld), t.privateModeDetectionEnabled && null !== this.privateMode && 0 !== this.privateMode ? e.push("pm=" + this.privateMode) : t.privateModeDetectionEnabled || e.push("pm=3"), void 0 !== new M("cto_clc", this.readonlyCookieRetentionTime).getValue() && e.push("clc=1")
    }, I.prototype.checkAcid = function() {
        this.setCanWriteCookie(), this.setCanWriteLocalStorage()
    }, I.prototype.setCop = function(e) {
        var t = x.getQueryString(e);
        if (void 0 !== t && (this.clickOriginPayload = this.getParameterValueByName(t, "cto_pld")), null === this.clickOriginPayload) try {
            var n = x.getAnchorWithReferrer(e.top.document);
            n && n.search && (this.clickOriginPayload = this.getParameterValueByName(n.search, "cto_pld"))
        } catch (e) {}
    }, I.prototype.checkClientSideIdentityStatus = function() {
        this.optoutCookie.getFromAllStorages(), this.secureIdCookie.setValueFromAllStorages(), this.bundleCookie.setValueFromAllStorages(), this.ifaCookie.setValueFromAllStorages()
    }, I.prototype.checkCookies = function(e) {
        var t = !0;
        if (e.callbacks) {
            for (var n = 0, o = "string" == typeof e.callbacks ? [e.callbacks] : e.callbacks; n < o.length; n++) {
                var i = o[n],
                    r = document.createElement("img");
                r.setAttribute("style", "display:none;"), r.setAttribute("width", "1"), r.setAttribute("height", "1"), r.setAttribute("data-owner", "criteo-tag"), r.setAttribute("src", i);
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(r, a), x.removeLater(this.exceptionHandler, r)
            }
            t = !1
        }
        e.optout ? (this.optoutCookie.setValue("1", t), this.secureIdCookie.removeFromAllStorages(), this.bundleCookie.removeFromAllStorages()) : (e.bundle && this.bundleCookie.setValue(e.bundle, t), e.removeSid ? this.secureIdCookie.removeFromAllStorages() : e.sid && this.secureIdCookie.setValue(e.sid, t))
    }, I.prototype.getParameterValueByName = function(e, t) {
        if (e && 1 < e.length) {
            "?" === e[0] && (e = "&" + e.substr(1));
            var n = "&" + t + "=",
                o = e.indexOf(n);
            if (-1 !== o) {
                var i = e.indexOf("&", o + n.length);
                return e.slice(o + n.length, i < 0 ? void 0 : i)
            }
        }
        return null
    }, I.prototype.setCanWriteCookie = function() {
        this.canWriteCookie = M.checkCookiesAreWritable()
    }, I.prototype.setCanWriteLocalStorage = function() {
        this.canWriteLocalStorage = M.checkLocalStorageIsWritable()
    }, I.prototype.getTld = function() {
        var e = new M("cto_tld_test", 36e5),
            t = e.setOnMainDomain("woot");
        return e.removeOnMainDomain(), t
    }, I.prototype.getPrivateMode = function(e, t) {
        if (e.isSafari) try {
            if ("function" == typeof t.openDatabase) return t.openDatabase(null, null, null, null), 1
        } catch (e) {
            return 2
        }
        return 0
    }, I);

    function I(e, t, n, o) {
        this.readonlyCookieRetentionTime = 0, this.optoutCookieRetentionTime = 15768e7, this.identificationCookieRetentionTime = 34164e6, this.optoutCookie = new M("cto_optout", this.optoutCookieRetentionTime), this.secureIdCookie = new M("cto_sid", this.identificationCookieRetentionTime), this.bundleCookie = new M("cto_bundle", this.identificationCookieRetentionTime), this.ifaCookie = new M("id_controller_ifa", this.identificationCookieRetentionTime), this.canWriteCookie = !1, this.canWriteLocalStorage = !1, this.clickOriginPayload = null, this.tld = this.getTld(), this.privateMode = this.getPrivateMode(t, n), this.exceptionHandler = e, this.config = o
    }
    var K = (D.prototype.createIframe = function(e, t, n, o, i, r) {
        var a = document.createElement("iframe"),
            s = encodeURIComponent || escape,
            c = x.getHighestAccessibleUrl(window),
            u = s(x.extractHostname(c)),
            l = window.SYNCFRAME_ORIGIN || "onetag",
            d = {
                bundle: e.bundleCookie.toFragmentData(),
                cw: e.canWriteCookie,
                optout: e.optoutCookie.toFragmentData(),
                origin: l,
                sid: e.secureIdCookie.toFragmentData(),
                tld: e.tld,
                topUrl: u,
                version: t.replace(/\./g, "_"),
                ifa: e.ifaCookie.toFragmentData(),
                lsw: e.canWriteLocalStorage,
                pm: o ? e.privateMode : 3
            },
            p = this.gumSyncFrameEndPoint;
        "#gum-debug-mode" === window.location.hash ? p += "?debug=1&topUrl=" + u : p += "?topUrl=" + u, l && (p += "&origin=" + l);
        var f = i.gdprConsent;
        f && (void 0 !== f.gdprApplies && (p += "&gdpr=" + (f.gdprApplies ? 1 : 0)), void 0 !== f.consentData && (p += "&gdpr_consent=" + f.consentData));
        var h = i.ccpaConsent;
        return h && void 0 !== h.uspString && (p += "&us_privacy=" + h.uspString), p += "#" + JSON.stringify(d), a.src = p, a.id = this.gumSyncFrameId, a.width = "0", a.height = "0", a.frameBorder = "0", a.setAttribute("style", "border-width:0px; margin:0px; display:none"), r && a.setAttribute("sandbox", "allow-scripts allow-same-origin"), a.title = "Criteo GUM iframe", x.removeLater(n, a), a
    }, D.prototype.setWaitingFlag = function(e) {
        this.waitingForSyncframe = this.waitingForSyncframe && null === e.bundleCookie.cookieValue && null === e.optoutCookie.cookieValue
    }, D.prototype.shouldInjectSyncframe = function() {
        return void 0 !== window.addEventListener || this.forceSyncFrame
    }, D);

    function D(e) {
        this.forceSyncFrame = !1, this.gumSyncFrameOrigin = "https://" + s("gumDomain", "gum.criteo.com"), this.gumSyncFrameEndPoint = window.CriteoSyncFrameUrlOverride || this.gumSyncFrameOrigin + "/syncframe", this.gumSyncFrameId = "criteo-syncframe-onetag", this.waitingForSyncframe = e.hasItp || s("waitForGum", !0)
    }
    var Q = new RegExp(/^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i),
        $ = (R.prototype.canRetrieveMetrics = function() {
            return this.hasPerformanceApi
        }, R.prototype.startRecordingInit = function() {
            this.canRetrieveMetrics() && (this.beginInit = performance.now())
        }, R.prototype.stopRecordingInit = function() {
            if (this.canRetrieveMetrics() && null === this.timings.initTime && null !== this.beginInit) {
                var e = performance.now();
                this.timings.initTime = e - this.beginInit
            }
        }, R.prototype.startRecordingPush = function() {
            this.canRetrieveMetrics() && (this.beginPush = performance.now())
        }, R.prototype.stopRecordingPush = function() {
            if (this.canRetrieveMetrics() && null === this.timings.pushTime && null !== this.beginPush && null !== this.timings.initTime) {
                var e = performance.now();
                this.timings.pushTime = e - this.beginPush
            }
        }, R.prototype.getPerformanceOrDegradedNow = function() {
            return this.canRetrieveMetrics() ? performance.now() : (new Date).getTime()
        }, R);

    function R() {
        this.timings = {
            initTime: null,
            pushTime: null
        }, this.beginInit = null, this.beginPush = null, this.hasPerformanceApi = void 0 !== window.performance && "function" == typeof window.performance.now
    }
    var X = (A.prototype.trySetPageId = function(e, t) {
        this.isCbsEnabled && this.checkNotExistOrEmpty(e.page_id) && (e.page_id = t)
    }, A.prototype.tryForceViewListPageId = function(e) {
        this.isCbsEnabled && this.checkNotExistOrEmpty(e.page_id) && (this.checkNotExistOrEmpty(e.category) ? this.checkNotExistOrEmpty(e.keywords) ? e.page_id = "viewList" : e.page_id = "viewSearchResult" : e.page_id = "viewCategory")
    }, A.prototype.tryRunActionAfterAdBlockDetectionOrImmediate = function(t, e) {
        var n = this,
            o = window.criteo_q;
        if (null != o) {
            var i = o.adBlockDetector;
            this.isCbsEnabled && void 0 !== i ? (i(function(e) {
                n.abe = e, t()
            }), e(t)) : t()
        } else t()
    }, A.prototype.tryAppendAdBlockerParameter = function(e) {
        void 0 !== this.abe && e.push("abe=" + (this.abe ? 1 : 0))
    }, A.prototype.tryAppendUatParameter = function(e) {
        if (this.isCbsEnabled && void 0 !== this.uat) {
            var t = encodeURIComponent || escape;
            e.push("uat=" + t(this.uat))
        }
    }, A.prototype.clean = function() {
        this.abe = void 0, this.isCbsEnabled = !1, this.uat = void 0
    }, A.prototype.enable = function() {
        this.isCbsEnabled = !0
    }, A.prototype.setUat = function(e) {
        this.uat = e
    }, A.prototype.checkNotExistOrEmpty = function(e) {
        return void 0 === e || "" === e
    }, A);

    function A() {
        this.abe = void 0, this.isCbsEnabled = !1, this.uat = void 0
    }
    var F = /^#(enable|disable)-criteo-tag-debug-mode(=(\d+))?$/;

    function Z(e, t, n, o, i) {
        if (function() {
                if (!document || !window.location.hash) return;
                var e = F.exec(window.location.hash);
                if (!e || 4 !== e.length) return;
                var t = "enable" === e[1],
                    n = Number(e[3]);
                new M("criteoTagDebugMode", t ? 864e5 : 0).setValueWithNoDomain(t && n && !isNaN(n) ? String(n) : "0"), window.location.href = window.location.href.substr(0, window.location.href.indexOf("#"))
            }(), !document || "function" != typeof Array.prototype.indexOf || -1 === document.cookie.indexOf("criteoTagDebugMode=")) return e;
        var r = function(e, t, n, o, i) {
            var a = {
                exceptions: e.exceptions,
                m_config: n,
                m_state: o,
                originalPush: e.push,
                performances: e.performances,
                push: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    0 < e.length && this.stagedPushes.push(e), i.stopRecordingInit()
                },
                pushError: function(e) {
                    this.stagedPushes.push(e)
                },
                removeLater: e.removeLater,
                setProtectedTimeout: t.setProtectedTimeout,
                stagedErrors: [],
                stagedPushes: []
            };
            return window.onerror = function(r) {
                return function(e, t, n, o) {
                    var i = {
                        column: o,
                        lineNumber: n,
                        message: e,
                        url: t
                    };
                    return a.pushError(i), !(!r || "function" != typeof r) && r.apply(window, [e, t, n, o])
                }
            }(window.onerror), a
        }(e, t, n, o, i);
        return function() {
            if (!document) return;
            var e = "ld-tag-debug." + u + ".js",
                t = document.createElement("script");
            t.setAttribute("type", "text/javascript"), t.setAttribute("src", document.location.protocol + "//static.criteo.net/js/ld/" + e);
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(t, n)
        }(), r
    }
    var ee = (E.prototype.registerTrigger = function(e) {
        if (this.isFeatureAllowed("attribution-reporting")) {
            var t = document.createElement("img");
            t.setAttribute("style", "display:none;"), t.setAttribute("width", "1"), t.setAttribute("height", "1"), t.setAttribute("attributionsrc", E.ATTRIBUTION_TRIGGER_URL_PREFIX + "?" + e);
            var n = document.getElementsByTagName("script")[0];
            t.setAttribute("data-owner", "criteo-tag"), n.parentNode.insertBefore(t, n), x.removeLater(this.exceptionHandler, t)
        }
    }, E.prototype.isFeatureAllowed = function(t) {
        return !(!document.featurePolicy || !document.featurePolicy.features()) && document.featurePolicy.features().some(function(e) {
            return e === t
        })
    }, E.ATTRIBUTION_TRIGGER_URL_PREFIX = "https://measurement-api.criteo.com/conversiontracking", E);

    function E(e, t) {
        this.document = e, this.exceptionHandler = t
    }
    var te, ne = (oe.generateUUID = function() {
        for (var e = "", t = 0; t < 36; t++) e += 8 === t || 13 === t || 18 === t || 23 === t ? "-" : 14 === t ? "4" : 19 === t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(16 * Math.random()).toString(16);
        return e
    }, oe);

    function oe() {}

    function ie(e, t, n, o, i) {
        if (e && 0 !== (e = e.trim()).length) {
            var r = encodeURIComponent || escape,
                a = r(e);
            n < a.length && (t.push(i + "=" + a.length), a = a.substr(0, n));
            var s = r(a);
            t.push(o + "=" + s)
        }
    }
    if (!window.criteo_q || window.criteo_q instanceof Array) {
        var re = window.criteo_q || [];
        window.criteo_q = function() {
            var e;
            void 0 !== (null === (e = null === window || void 0 === window ? void 0 : window.location) || void 0 === e ? void 0 : e.hash) && -1 !== window.location.hash.indexOf("onetag-debug") && O.setLogLevel(l.Debug);
            var _ = new U,
                i = new $;
            i.startRecordingInit();
            var w = {
                    app: {
                        accounts: [],
                        actions: [],
                        bodyReady: !1,
                        disingScheduled: [],
                        domReady: !1,
                        eventSent: !1,
                        queue: []
                    },
                    cbs: new X
                },
                b = function() {
                    var e = s("blockedSteps", []),
                        t = {
                            account: s("partnerId") || null,
                            firstPartyIdentifier: s("fpIdentifier") || null,
                            customerInfo: [],
                            extraData: [],
                            handlerParams: {
                                v: u,
                                otl: x.getOneTagLocation()
                            },
                            handlerResponseType: "single",
                            handlerUrlPrefix: "https://sslwidget.criteo.com/event",
                            partnerPayload: null,
                            requestType: "pixel",
                            responseType: "js",
                            tagVersion: u,
                            dynamic: s("dynamic") || null,
                            fullUrlMaxLength: s("fullUrlMaxLength", 2e3),
                            previousUrlMaxLength: s("previousUrlMaxLength", 400),
                            privateModeDetectionEnabled: s("privateModeDetectionEnabled", !0),
                            sandboxedSyncframeEnabled: s("sandboxedSyncframeEnabled", !1),
                            isStepAllowed: function(t) {
                                return !e.some(function(e) {
                                    return e == t
                                })
                            }
                        },
                        n = {
                            item: !0,
                            "item.id": !0,
                            product: !0,
                            "product.id": !0
                        },
                        o = {
                            item: !0,
                            product: !0
                        };
                    return {
                        hooks: {},
                        shortNameMap: {
                            events: {
                                applaunched: "al",
                                viewitem: "vp",
                                viewhome: "vh",
                                viewlist: "vl",
                                viewbasket: "vb",
                                viewsearch: "vs",
                                viewpage: "vpg",
                                tracktransaction: "vc",
                                addtocart: "ac",
                                calldising: "dis",
                                setdata: "exd",
                                setemail: "ce",
                                setidentity: "id"
                            },
                            properties: {
                                event: "e",
                                account: "a",
                                first_party_identifier: "fpid",
                                currency: "c",
                                product: "p",
                                item: "p",
                                "item.id": "i",
                                "item.price": "pr",
                                "item.quantity": "q",
                                "item.availability": "pav",
                                "item.buy_box": "bb",
                                "item.sku_parent": "psp",
                                "item.store_id": "ps",
                                item_whitelist: "iw",
                                "product.id": "i",
                                "product.price": "pr",
                                "product.quantity": "q",
                                "product.availability": "pav",
                                "product.buy_box": "bb",
                                "product.sku_parent": "psp",
                                "product.store_id": "ps",
                                data: "d",
                                keywords: "kw",
                                checkin_date: "din",
                                checkout_date: "dout",
                                deduplication: "dd",
                                delivery: "dl",
                                attribution: "at",
                                "attribution.channel": "ac",
                                "attribution.value": "v",
                                user_segment: "si",
                                new_customer: "nc",
                                customer_id: "ci",
                                email: "m",
                                hash_method: "h",
                                identity: "id",
                                raw_identity: "rid",
                                transaction_value: "tv",
                                client_revenue: "cr",
                                responseType: "rt",
                                page_name: "pn",
                                page_id: "pi",
                                page_number: "pnb",
                                category: "ca",
                                filters: "f",
                                "filters.name": "fn",
                                "filters.operator": "fo",
                                "filters.value": "fv",
                                retailer_visitor_id: "rvi",
                                price: "pr",
                                availability: "av",
                                sub_event_type: "se",
                                store_id: "s",
                                item_group_id: "sp",
                                sku_parent: "sp",
                                zipcode: "z",
                                nocall: "noc",
                                block: "bl"
                            }
                        },
                        trackingCallData: t,
                        workflow: {
                            container: null,
                            disOnce: !1,
                            manualDising: !1,
                            manualFlush: !1,
                            noPartialFlush: !1,
                            partialDis: !1
                        },
                        encodingConfig: {
                            shouldEncodeField: function(e) {
                                return n[e]
                            }
                        },
                        parsingConfig: {
                            shouldParseField: function(e) {
                                return o[e]
                            }
                        },
                        identifierScrappingConfig: {
                            externalIdentifiersToRead: {
                                FirstId: {
                                    key: "firstid",
                                    storageSource: c.Cookie
                                },
                                IntimateMergerId: {
                                    key: /^_im_uid\./,
                                    storageSource: c.LocalStorage
                                }
                            }
                        }
                    }
                }(),
                t = function(e) {
                    var t = e.match(Q),
                        n = null !== t;
                    return {
                        hasItp: null !== t && 11 <= parseFloat(t[1]),
                        isSafari: n
                    }
                }(window.navigator.userAgent),
                k = new Y(_, t, window, b),
                P = new K(t),
                n = new L(window),
                I = new ee(document, _),
                D = function(t) {
                    var o = !1,
                        i = void 0,
                        r = [];
                    return function(e) {
                        o ? e(i) : (r.push(e), 1 === r.length && t(function(e) {
                            o = !0, i = e;
                            for (var t = 0, n = r; t < n.length; t++) {
                                (0, n[t])(i)
                            }
                        }))
                    }
                }(n.retrieveConsent.bind(n));

            function f(e, t, n, o, i, r, a, s, c, u, l) {
                e.waitingForSyncframe && (e.waitingForSyncframe = !1, d(e, t, n, o, i, r, a, s, c, u, l))
            }

            function o(t, n, o, i, r, a, s, c, u, l, d, e) {
                if (t.shouldInjectSyncframe()) {
                    var p = t.createIframe(i, c.tagVersion, _, c.privateModeDetectionEnabled, e, c.sandboxedSyncframeEnabled);
                    window.addEventListener && (_.addProtectedEventListener(window, "message", function(e) {
                        ! function(e, t, n, o, i, r, a, s, c, u, l, d) {
                            var p = d.data;
                            if (!(p && d.origin == e.gumSyncFrameOrigin || window.BypassSyncframeMessageSanityCheck)) return;
                            d.stopPropagation(), o.checkCookies(p), e.waitingForSyncframe && f(e, t, n, o, i, r, a, s, c, u, l)
                        }(t, n, o, i, r, a, s, c, u, l, d, e)
                    }, !0), A(n, l, u, {
                        event: "appendtag",
                        element: p
                    }))
                }
            }

            function r(e, t) {
                ! function(e) {
                    var t = !1;
                    if (200 < e.length) t = !0;
                    else
                        for (var n = 0, o = e; n < o.length; n++) {
                            var i = o[n],
                                r = 0;
                            if (Object.keys) r = Object.keys(i).length;
                            else
                                for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (r += 1);
                            if (200 < r) {
                                t = !0;
                                break
                            }
                        }
                    t && (e.length = 0)
                }(e.extraData), e.customerInfo = [], t.clean()
            }

            function a() {
                for (var o = [], e = 0; e < arguments.length; e++) o[e] = arguments[e];
                _.catchAndStoreException(function() {
                    i.startRecordingPush();
                    for (var e = 0, t = o; e < t.length; e++) {
                        var n = t[e];
                        w.app.queue.push(n)
                    }
                    d(P, w.app, w.cbs, k, b.shortNameMap, b.encodingConfig, b.parsingConfig, b.trackingCallData, b.hooks, b.workflow, b.identifierScrappingConfig), r(b.trackingCallData, w.cbs), i.stopRecordingPush()
                }, o), i.stopRecordingInit()
            }

            function d(e, t, n, o, i, r, a, s, c, u, l) {
                for (var d = [], p = t.queue, f = 0; f < p.length; ++f) {
                    var h = p[f];
                    if (h instanceof Array) {
                        var g = [f + 1, 0];
                        p.splice.apply(p, g.concat(h))
                    }
                    if (h instanceof Function) p.splice(f + 1, 0, h());
                    else if (h && "[object Object]" === h.toString()) switch (m(t, n, o, i, r, a, s, c, u, l, h, f, p, d)) {
                        case 0:
                            d.push(h);
                            break;
                        case -1:
                            d = d.concat(p.slice(f)), f = p.length
                    }
                }
                c.afterEval instanceof Function && c.afterEval(), t.queue = d || [], u.manualFlush || u.noPartialFlush && 0 !== t.queue.length || e.waitingForSyncframe || T(t, n, o, i, r, a, s, c, u, l, 0 !== t.queue.length)
            }

            function R(e, t, n) {
                n.hasOwnProperty("account") || (n.account = t.accounts);
                var o = e.handlerResponseType;
                n.hasOwnProperty("type") && (o = n.type, delete n.type), N(n.account, t.disingScheduled), "sequential" === o && (n.dc = !0)
            }

            function A(e, t, n, o) {
                var i = F(e, o);
                return null !== i ? i : S(e, t, n, o)
            }

            function S(e, t, n, o) {
                if (!e.bodyReady || t.container && document.body.contains(t.container) || (t.container = x.appendCriteoContainer(document.body)), o.url) {
                    var i = void 0;
                    o.isImgUrl ? ((i = document.createElement("img")).setAttribute("style", "display:none;"), i.setAttribute("width", "1"), i.setAttribute("height", "1")) : ((i = document.createElement("script")).setAttribute("async", "true"), i.setAttribute("type", "text/javascript")), i.setAttribute("src", o.url), o.element = i
                }
                if (n.beforeAppend instanceof Function && (o.element = n.beforeAppend(o.element)), j(o), o.element && (o.element.tagName || o.isImgUrl))
                    if (t.container || "script" !== o.element.tagName.toLowerCase() && !o.isImgUrl) {
                        if (!t.container) return 0;
                        t.container.appendChild(o.element), x.removeLater(_, o.element)
                    } else {
                        var r = document.getElementsByTagName("script")[0];
                        o.element.setAttribute("data-owner", "criteo-tag"), r.parentNode.insertBefore(o.element, r), x.removeLater(_, o.element)
                    }
                return 1
            }

            function F(e, t) {
                return !e.domReady && t.requiresDOM && "no" !== t.requiresDOM ? "blocking" === t.requiresDOM ? -1 : 0 : (delete t.requiresDOM, t.event ? (t.account && N(t.account, e.accounts), t.event = t.event.toLowerCase(), null) : (j(t), 1))
            }

            function m(e, t, n, o, i, r, a, s, c, u, l, d, p, f) {
                var h = l.event,
                    g = F(e, l);
                if (null !== g) return g;
                switch (l.event) {
                    case "setdata":
                        return H(a.extraData, e.actions, l);
                    case "setparameter":
                        for (var m in l) "event" !== m.toLowerCase() && l.hasOwnProperty(m) && (a.handlerParams[m] = l[m]);
                        return 1;
                    case "calldising":
                        R(a, e, l);
                        break;
                    case "setzipcode":
                    case "setstore":
                        return l.event = "setdata", H(a.extraData, e.actions, l);
                    case "setcustomerid":
                        return l.event = "setdata", l.customer_id = l.id, delete l.id, H(a.extraData, e.actions, l);
                    case "setretailervisitorid":
                        return t.enable(), l.event = "setdata", l.retailer_visitor_id = l.id, delete l.id, H(a.extraData, e.actions, l);
                    case "setgoogleadvertisingid":
                        return n.gaid = l.gaid, H(a.extraData, e.actions, {
                            event: "setdata",
                            site_type: "aa"
                        });
                    case "setappleadvertisingid":
                        return n.idfa = l.idfa, H(a.extraData, e.actions, {
                            event: "setdata",
                            site_type: "aios"
                        });
                    case "setemail":
                    case "sethashedemail":
                    case "ceh":
                        l.event = "setemail", l.hasOwnProperty("email") && (l.email instanceof Array || (l.email = [l.email]), l.email = V(l.email));
                        var v = j(l);
                        return a.customerInfo.push(v), G(e.actions, j(l)), 1;
                    case "setidentity":
                        if (l.hasOwnProperty("identity")) {
                            var y = l.identity instanceof Array ? l.identity : [l.identity];
                            if (0 < (y = V(y)).length) return l.identity = y, e.actions.push(j(l)), 1
                        }
                        return 0;
                    case "setsitetype":
                        var C = "d";
                        return "aios" !== l.type && "aa" != l.type || (C = l.type), "mobile" !== l.type && "m" !== l.type || (C = "m"), "tablet" !== l.type && "t" !== l.type || (C = "t"), l.event = "setdata", delete l.type, l.site_type = C, H(a.extraData, e.actions, l);
                    case "appendtag":
                        return S(e, c, s, l);
                    case "gettagstate":
                        return l.callback instanceof Function ? l.callback(w, b, k, P) : 1;
                    case "setuat":
                        return t.setUat(l.uat), 1;
                    case "viewsearchresult":
                    case "viewcategory":
                        t.trySetPageId(l, h), l.event = "viewlist";
                        break;
                    case "viewlist":
                        t.tryForceViewListPageId(l);
                        break;
                    case "viewitem":
                    case "viewhome":
                    case "viewbasket":
                    case "tracktransaction":
                    case "addtocart":
                        t.trySetPageId(l, h);
                        break;
                    case "viewstore":
                        t.trySetPageId(l, h), l.event = "viewHome", l.sub_event_type = "s";
                        break;
                    case "checkavailability":
                        t.trySetPageId(l, h), l.event = "viewBasket", l.sub_event_type = "a";
                        break;
                    case "reserveinstore":
                        t.trySetPageId(l, h), l.event = "viewBasket", l.sub_event_type = "r";
                        break;
                    case "flush":
                    case "flushevents":
                        return T(e, t, n, o, i, r, a, s, c, u, d !== p.length - 1 || 0 !== f.length), 1;
                    case "setaccount":
                        return a.account = l.account, 1;
                    case "seturl":
                        return a.handlerUrlPrefix = l.url, 1;
                    case "setcalltype":
                        return a.handlerResponseType = l.type, 1;
                    case "setresponsetype":
                        return a.responseType = l.type, 1;
                    case "setrequesttype":
                        return a.requestType = l.type, 1;
                    case "setpartnerpayload":
                        return a.partnerPayload = l.payload, 1;
                    case "oninitialized":
                        return s.onInitialized = l.callback, 1;
                    case "ondomready":
                        return s.onDOMReady = l.callback, 1;
                    case "beforeappend":
                        return s.beforeAppend = l.callback, 1;
                    case "aftereval":
                        return s.afterEval = l.callback, 1;
                    case "onflush":
                        return s.onFlush = l.callback, 1;
                    case "onurlgenerated":
                        return s.onUrlGenerated = l.callback, 1;
                    case "disonce":
                        return c.disOnce = !0, 1;
                    case "manualdising":
                        return c.manualDising = !0, 1;
                    case "manualflush":
                        return c.manualFlush = !0, 1;
                    case "nopartialflush":
                        return c.noPartialFlush = !0, 1;
                    case "disonpartialflush":
                        return c.partialDis = !0, 1
                }
                return e.actions.push(j(l)), 1
            }

            function T(n, o, e, t, i, r, a, s, c, u, l) {
                if (s.onFlush instanceof Function && (s.onFlush(), O.warn("on flush hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")), 0 !== n.actions.length) {
                    for (var d = 0, p = a.extraData; d < p.length; d++) {
                        var f = p[d];
                        q(n.actions, f)
                    }
                    for (var h = 0, g = a.customerInfo; h < g.length; h++) {
                        var m = g[h];
                        G(n.actions, m)
                    }
                    for (var v = 0, y = n.actions; v < y.length; v++) {
                        J(y[v])
                    }
                    if (!c.manualDising && (!l || c.partialDis)) {
                        for (var C = [], w = 0, b = n.accounts; w < b.length; w++) {
                            var k = b[w];
                            W(n.disingScheduled, k) || C.push(k)
                        }
                        0 < C.length && function(e, t, n) {
                            var o = F(t, n);
                            null !== o || (R(e, t, n), t.actions.push(j(n)))
                        }(a, n, {
                            event: "callDising",
                            account: C
                        })
                    }
                    var P = !1,
                        S = function(e, t, n, o, i, r, a, s) {
                            var c = e.actions,
                                u = [];
                            1 === e.accounts.length && (i.account = e.accounts[0]);
                            null !== i.account && u.push("a=" + E(o, r, a, i.account, []));
                            "js" !== i.responseType && u.push("rt=" + E(o, r, a, i.responseType, []));
                            if (i.handlerParams) {
                                var l = decodeURIComponent(E(o, r, a, i.handlerParams, []));
                                l && u.push(l)
                            }
                            var d = function() {
                                for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
                                    var n = e[t],
                                        o = n.nonce || n.getAttribute("nonce");
                                    if (null != o && "" !== o) return o
                                }
                                return
                            }();
                            if (void 0 !== d) {
                                var p = encodeURIComponent || escape;
                                u.push("csp-nonce=" + p(d))
                            }
                            t.tryAppendUatParameter(u);
                            for (var f = 0; f < c.length; ++f) {
                                var h = c[f];
                                h.account && B(null === i.account ? void 0 : i.account, null === h.account ? void 0 : h.account) && delete h.account, u.push("p" + f + "=" + E(o, r, a, h, []))
                            }
                            n.fillQueryStringParams(u, i), null !== i.partnerPayload && u.push("pp=" + E(o, r, a, i.partnerPayload, []));
                            i.dynamic && u.push("dy=1");
                            if (ie(x.getHighestAccessibleUrl(window), u, i.fullUrlMaxLength, "fu", "ful"), i.isStepAllowed("readPreviousUrl")) {
                                ie(x.getPreviousUrl(window), u, i.previousUrlMaxLength, "pu", "pul")
                            }
                            u.push("ceid=" + ne.generateUUID()), u.push("dtycbr=" + Math.floor(1e5 * Math.random()));
                            var g = function(o) {
                                return Object.keys(o.externalIdentifiersToRead).map(function(e) {
                                    var t = o.externalIdentifiersToRead[e],
                                        n = new M(t.key, 0, t.storageSource).getFromAllStorages().value;
                                    return null != n && 0 < n.length ? JSON.stringify({
                                        type: e,
                                        value: n
                                    }) : ""
                                }).filter(function(e) {
                                    return 0 < e.length
                                }).join(",")
                            }(s);
                            0 < g.length && u.push("external_advids=" + encodeURIComponent("[" + g + "]"));
                            return u
                        }(n, o, e, t, a, i, r, u);
                    n.actions = [];
                    var T = function() {
                        if (!P) {
                            P = !0, o.tryAppendAdBlockerParameter(S);
                            var e = function(e) {
                                    return e.join("&")
                                }(S),
                                t = function(e, t) {
                                    return {
                                        event: "appendTag",
                                        isImgUrl: "gif" === e.responseType,
                                        url: e.handlerUrlPrefix + "?" + t
                                    }
                                }(a, e);
                            "function" == typeof s.onUrlGenerated ? s.onUrlGenerated(t.url) : "beacon" === a.requestType && navigator.sendBeacon ? navigator.sendBeacon(t.url) : A(n, c, s, t), O.info("DIS call triggered", t.url, S), (n.eventSent = !0) === t.isImgUrl && I.registerTrigger(e), c.disOnce || (n.disingScheduled = [])
                        }
                    };
                    D(function(e) {
                        S.push.apply(S, function(e) {
                            var t = [],
                                n = e.gdprConsent;
                            n && (void 0 !== n.gdprApplies && t.push("gra=" + (n.gdprApplies ? 1 : 0)), void 0 !== n.consentData && t.push("grs=" + n.consentData), void 0 !== n.version && t.push("grv=" + n.version));
                            var o = e.ccpaConsent;
                            return o && (void 0 !== o.uspString && t.push("cs=" + o.uspString), void 0 !== o.version && t.push("cv=" + o.version)), t
                        }(e)), o.tryRunActionAfterAdBlockDetectionOrImmediate(T, function(e) {
                            return _.setProtectedTimeout(e, 500)
                        })
                    })
                }
            }

            function E(e, t, n, o, i) {
                var r, a, s, c = encodeURIComponent || escape,
                    u = "";
                if (o instanceof Function) u = E(e, t, n, o(), i);
                else if (o instanceof Array) {
                    for (var l = [], d = 0; d < o.length; ++d) l[d] = E(e, t, n, o[d], i);
                    u += "[" + l.join(",") + "]"
                } else if (o && "[object Object]" === o.toString()) {
                    var p = [];
                    for (var f in o)
                        if (o.hasOwnProperty(f)) {
                            var h = i.concat([f]);
                            p.push((r = e, a = f, void 0, s = h.join("."), (r.properties[s] ? r.properties[s] : a) + "=" + E(e, t, n, o[f], h)))
                        }
                    u += p.join("&")
                } else if (1 === i.length && "event" === i[0]) u += e.events[o.toLowerCase()] ? e.events[o.toLowerCase()] : o;
                else {
                    var g = function(e, t, n) {
                        var o = t.join(".");
                        return "string" == typeof n && e.shouldParseField(o) && 0 != n.length && "[" == n.charAt(0) && "]" == n.charAt(n.length - 1) ? n.substring(1, n.length - 1).split(",", -1).map(function(e) {
                            return e.trim()
                        }) : []
                    }(n, i, o);
                    if (0 < g.length) return E(e, t, n, g, i);
                    ! function(e, t) {
                        var n = t.join(".");
                        return e.shouldEncodeField(n)
                    }(t, i) ? u += o: u += c(o)
                }
                return c(u)
            }
            return _.catchAndStoreException(function() {
                return k.checkAcid(), k.checkClientSideIdentityStatus(), k.setCop(window),
                    function(e, t, n, o, i, r, a, s, c, u, l) {
                        e.setWaitingFlag(o), e.waitingForSyncframe && _.setProtectedTimeout(function() {
                            f(e, t, n, o, i, r, a, s, c, u, l)
                        }, 1e4)
                    }(P, w.app, w.cbs, k, b.shortNameMap, b.encodingConfig, b.parsingConfig, b.trackingCallData, b.hooks, b.workflow, b.identifierScrappingConfig), x.onBodyReady(_, function() {
                        b.hooks.onInitialized instanceof Function ? (w.app.bodyReady = b.hooks.onInitialized(), O.warn("onInitialized hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")) : w.app.bodyReady = !0, D(function(e) {
                            o(P, w.app, w.cbs, k, b.shortNameMap, b.encodingConfig, b.parsingConfig, b.trackingCallData, b.hooks, b.workflow, b.identifierScrappingConfig, e)
                        }), d(P, w.app, w.cbs, k, b.shortNameMap, b.encodingConfig, b.parsingConfig, b.trackingCallData, b.hooks, b.workflow, b.identifierScrappingConfig)
                    }), x.onDocumentReady(_, function() {
                        b.hooks.onDOMReady instanceof Function ? (w.app.domReady = b.hooks.onDOMReady(), O.warn("on DOM ready hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")) : w.app.domReady = !0, d(P, w.app, w.cbs, k, b.shortNameMap, b.encodingConfig, b.parsingConfig, b.trackingCallData, b.hooks, b.workflow, b.identifierScrappingConfig)
                    }),
                    function(e) {
                        try {
                            var t = x.getAnchorWithReferrer(document);
                            if (t)
                                if (t.hostname !== document.location.hostname) z(e, {
                                    event: "setData",
                                    ref: t.protocol + "//" + t.hostname
                                })
                        } catch (e) {}
                    }(b.trackingCallData.extraData), s("visitEventEnabled", !1) && function(e, t) {
                        function n() {
                            t.eventSent || (e({
                                event: "setRequestType",
                                type: "beacon"
                            }), e({
                                event: "viewPage"
                            }))
                        }
                        window.addEventListener && window.addEventListener("pagehide", n);
                        var o = s("visitEventDelay", 3e4);
                        0 <= o && setTimeout(n, o)
                    }(a, w.app), Z({
                        exceptions: _.exceptions,
                        performances: i.timings,
                        push: a,
                        removeLater: function(e) {
                            return x.removeLater(_, e)
                        }
                    }, _, b, w, i)
            })
        }(), re.adBlockDetector, window.criteo_q.adBlockDetector = re.adBlockDetector, (te = window.criteo_q).push.apply(te, re)
    }
}();