/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

this.EXPORTED_SYMBOLS = [ "Tabs" ];

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;

Cu.import("resource://gre/modules/Services.jsm");

let browserWindow = Services.wm.getMostRecentWindow("navigator:browser");

this.Tabs = {
  init: function(libDir) {},

  configurations: [
    function fiveTabs(deferred) {
      fiveTabsHelper();
      hoverTab(browserWindow.gBrowser.tabs[3]);
      deferred.resolve();
    },
    function fourPinned(deferred) {
      fiveTabsHelper();
      let tab = browserWindow.gBrowser.addTab(TWITTER_FAVICON);
      browserWindow.gBrowser.pinTab(tab);
      tab = browserWindow.gBrowser.addTab(GOOGLE_FAVICON);
      browserWindow.gBrowser.pinTab(tab);
      tab = browserWindow.gBrowser.addTab(SHORLANDER_FAVICON);
      browserWindow.gBrowser.pinTab(tab);
      tab = browserWindow.gBrowser.addTab("about:home");
      browserWindow.gBrowser.pinTab(tab);
      browserWindow.gBrowser.selectTabAtIndex(5);
      hoverTab(browserWindow.gBrowser.tabs[2]);
      // also hover the new tab button
      let newTabButton = browserWindow.document.getAnonymousElementByAttribute(browserWindow.gBrowser.tabContainer, "class", "tabs-newtab-button");
      hoverTab(newTabButton);
      browserWindow.gBrowser.tabs[browserWindow.gBrowser.tabs.length - 1].setAttribute("beforehovered", true);
      deferred.resolve();
    },
    function twoPinnedWithOverflow(deferred) {
      fiveTabsHelper();

      browserWindow.gBrowser.loadTabs([
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
        "about:addons",
        "about:home",
        "about:robots",
        "about:newtab",
      ], true, true);
      let tab = browserWindow.gBrowser.addTab(TWITTER_FAVICON);
      browserWindow.gBrowser.pinTab(tab);
      tab = browserWindow.gBrowser.addTab(GOOGLE_FAVICON);
      browserWindow.gBrowser.pinTab(tab);
      browserWindow.gBrowser.selectTabAtIndex(4);
      hoverTab(browserWindow.gBrowser.tabs[6]);
      deferred.resolve();
    }
  ],
};


/* helpers */

function fiveTabsHelper() {
  // some with no favicon and some with. Selected tab in middle.
  closeAllButOneTab("about:addons");
  browserWindow.gBrowser.loadTabs([
    "about:addons",
    "about:home",
    "about:robots",
    "about:newtab",
    GOOGLE_FAVICON,
  ], true, true);
  browserWindow.gBrowser.selectTabAtIndex(1);
}

function closeAllButOneTab(url = "about:blank") {
  let gBrowser = browserWindow.gBrowser;
  // Close all tabs except the last so we don't quit the browser.
  while (gBrowser.tabs.length > 1)
    gBrowser.removeTab(gBrowser.selectedTab, {animate: false});
  gBrowser.selectedBrowser.loadURI(url);
  if (gBrowser.selectedTab.pinned)
    gBrowser.unpinTab(gBrowser.selectedTab);
  let newTabButton = browserWindow.document.getAnonymousElementByAttribute(browserWindow.gBrowser.tabContainer, "class", "tabs-newtab-button");
  hoverTab(newTabButton, false);
}

function hoverTab(tab, hover = true) {
  var inIDOMUtils = Cc["@mozilla.org/inspector/dom-utils;1"]
                      .getService(Ci.inIDOMUtils);
  if (hover) {
    inIDOMUtils.addPseudoClassLock(tab, ":hover");
  } else {
    inIDOMUtils.clearPseudoClassLocks(tab);
  }
  // XXX: this isn't necessarily testing what we ship
  if (tab.nextElementSibling)
    tab.nextElementSibling.setAttribute("afterhovered", hover || null);
  if (tab.previousElementSibling)
    tab.previousElementSibling.setAttribute("beforehovered", hover || null);
}

// Favicons
const TWITTER_FAVICON = "data:image/x-icon,%00%00%01%00%01%00%10%10%00%00%01%00%20%00h%04%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%20%00%00%00%00%00%00%04%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%0C%FF%FF%FF%1F%FF%FF%FF%1F%FF%FF%FF%1F%FF%FF%FF%18%FF%FF%FF%07%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%03%FF%FF%FF(%FB%EF%CF%60%F6%D5~%A1%F6%D5~%A1%F6%D5~%A1%F8%DF%9E%89%FC%F4%DEW%FF%FF%FF(%FF%FF%FF%03%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FA%F7%EE%0F%CF%B0%60%9F%B6%88%10%EE%BD%89%00%FF%DB%9F%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%F4%CB_%B6%FD%F9%EF%3F%FF%FF%FF%03%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%0F%F9%ED%CEZ%F3%C5P%C2%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%F1%BC0%DB%FD%F9%EF%3F%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F3%E4%BEW%ED%B8%2F%DB%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%F1%BC0%DB%FF%FF%FF%18%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%0C%F4%D3~%9F%EE%B0%0F%F3%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%F4%DC%9E%81%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F8%ED%CFV%EE%B0%0F%F3%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%F1%BC0%DB%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%D6%AC%40%C5%EE%AC%00%FF%EE%AC%00%FF%EA%A9%00%FF%D8%9C%00%FF%D4%99%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%FF%FF%FF%14%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F3%DB%9E~%EE%AC%00%FF%D8%9C%00%FF%BA%8B%10%EE%CF%B0%60%9F%D9%BCo%94%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%F8%E4%AFx%FF%FF%FF%0C%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%E3%B6%3F%CA%C9%91%00%FF%CF%B0%60%9F%FA%F7%EE%0F%FF%FF%FF%00%F0%E7%CE0%E3%A4%00%FF%EE%AC%00%FF%EE%AC%00%FF%EE%AC%00%FF%DF%A1%00%FF%E8%AC%0F%F3%F4%EA%CFB%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%CC%A9O%B1%E1%CF%9E%60%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%C3%9A%2F%D0%CC%94%00%FF%D0%96%00%FF%C9%91%00%FF%C5%A0%40%BF%BE%92%1F%E0%E3%D0%9Eb%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FA%F7%EE%0F%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FA%F7%EE%0F%DD%C7%8Ep%D8%BF~%81%E1%CF%9E%60%FF%FF%FF%00%FA%F7%EE%0F%FA%F7%EE%0F%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%00%00%FF%FF%00%00%FF%FF%00%00%F0%FF%00%00%C0%3F%00%00%F8%1F%00%00%F0%0F%00%00%E0%07%00%00%E0%07%00%00%C0%07%00%00%E0%07%00%00%C7%03%00%00%DF%03%00%00%FF%DF%00%00%FF%FF%00%00%FF%FF%00%00";
const SHORLANDER_FAVICON = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%ACIDATx%DA%AC%921o%141%10%85%DF%D8%EB%BD%BB%EC%06mC%83%AE%A1%0B%15P%D3S%F0%07%90(%D2%20%91%1E%C4%3F%A0%0E%12T)%D2%A4%A4A%B4%F4%A1%86%02AGs%1D%5Dt%5Cn%BD%B6%87%19%FB%16iis%23%ED%CA~%EB%99y%F3%AD%89%99q%93%A8%F4%B5%3A%BB%C7%ED%DCda%BDMX%9E%FC%A0_%C7G%DC%B8%A2%FD%19%12%EE%5E%FC%A4%AF%8F%EF%F3%81%B5Y%DB%C4%88%07%9F%BFQ.%A0%C9%5D%23%1F%0C%01u%CC%07%9A%D6%A2%9B%95%C3%E8%8B%D6%CE%1Dn%19%03N%3Cu%90C%93w.4haA%F3R%80v%B2%99%11%8C%14H%7D%9A%16P%DBc%E7%F5%C0%E8%D4%B6%B2%89%E5%A0%AEo%ABm%D5RD%12%07%3AB.%BE%17%88%CF%5E%3D%E1%E6p%86%C5%A1%95%F9%22%DE%BF%FEH%AB%D5%8A%DB%B6-%AE%D6k%2C%97K%FA%20%10%9D%CC%D3%FB%84%AB%3E%E0%C5%97%EF%05%A2%AB%2B%CC%16N%9E%0A1%0C%05%98%24w%5D7%E9%B6%A8%AC%602%A8%12%C1%872%9E%C1%0D%23%3B%18%7C%40%7F%3D%C0T)%8F0%DA%1EC%D7%EA%E6%3AD%04b%F4%D2%7D%BB%03%BC%1F%88%0F%8FO%B8n%0E%E0%84%01s%C4%E5%DBSz%F4%FC%25%5BW%E7Cq%F0%B8%3C%3F%A5ww%9E%B2%81%C5%26%05%5C%C5%1Eo~%7F*%10mU%83%AC%CB%0F%A2%2F%D6%C8%C2%E8%5E%22%85%B8%03f%E1%24%A5%D2%0Bk%E2%F4%26%B2%CC4%08%07%8E!%EF%87m%10%1E%E5%8F%04_4%ED%AC%C9%91%FF%BB%CA1%F8%7F%C2%B8%F6%9B%8D%98%09%13Mm%8F%9D%7D%0A%FB%81%F8W%80%01%00%94%0D%CA2-%BD%DF%EF%00%00%00%00IEND%AEB%60%82";
const GOOGLE_FAVICON = "data:image/x-icon,%00%00%01%00%02%00%10%10%00%00%01%00%20%00h%04%00%00%26%00%00%00%20%20%00%00%01%00%20%00%A8%10%00%00%8E%04%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%20%00%00%00%00%00%00%04%00%00%12%0B%00%00%12%0B%00%00%00%00%00%00%00%00%00%00%F4%85BJ%F4%85B%E7%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%E4%F4%85BJ%F4%85B%E6%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%E7%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%8DN%FF%FA%C8%AB%FF%FE%EF%E7%FF%FD%E5%D7%FF%FB%D4%BD%FF%FB%CF%B5%FF%F7%A1n%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FB%D8%C2%FF%FD%EC%E1%FF%F5%94Y%FF%F4%85B%FF%F4%85B%FF%F4%88F%FF%FC%DB%C7%FF%F7%A2n%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FD%EE%E5%FF%F9%BB%96%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F9%BA%94%FF%FB%D3%BA%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F9%BE%9B%FF%FC%DE%CC%FF%F4%88G%FF%F4%85B%FF%F4%85B%FF%F5%92W%FF%FD%EC%E1%FF%FB%CF%B4%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F7%A9z%FF%FA%C8%AA%FF%F9%BC%96%FF%F9%C2%A0%FF%FE%F4%EE%FF%FD%ED%E3%FF%F5%92V%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%87F%FF%FE%F6%F1%FF%FC%E2%D3%FF%F5%8FQ%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F6%9Ei%FF%F9%B9%92%FF%FF%FF%FE%FF%F8%B0%85%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F9%B8%91%FF%FF%FB%F9%FF%F7%A8y%FF%F5%8DO%FF%FB%CD%B2%FF%F6%9Fj%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FE%F5%F0%FF%FB%CE%B3%FF%F4%85B%FF%F4%85B%FF%F7%A4q%FF%FD%EB%E0%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FE%F6%F2%FF%F8%B0%85%FF%F4%85B%FF%F4%85B%FF%F8%B3%89%FF%FF%FB%F8%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FA%C8%A9%FF%F9%BC%97%FF%F4%85B%FF%F4%86D%FF%FD%E4%D5%FF%FB%D6%BF%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%86D%FF%F9%BA%94%FF%F9%BB%96%FF%FC%E1%D0%FF%FF%FE%FD%FF%FA%CB%AF%FF%F7%A7w%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%E6%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%E6%F4%85BI%F4%85B%E6%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%E6%F4%85BI%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00(%00%00%00%20%00%00%00%40%00%00%00%01%00%20%00%00%00%00%00%00%10%00%00%12%0B%00%00%12%0B%00%00%00%00%00%00%00%00%00%00%F4%85B%00%F4%85B'%F4%85B%AD%F4%85B%F2%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%F2%F4%85B%AD%F4%85B'%F4%85B%00%F4%85B(%F4%85B%EF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%EF%F4%85B(%F4%85B%AD%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%AD%F4%85B%F1%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%F3%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%8BK%FF%F8%B6%8E%FF%FC%DB%C7%FF%FE%F2%EB%FF%FF%FB%F8%FF%FF%FC%FB%FF%FE%F4%EE%FF%FD%E7%DA%FF%FA%CD%B1%FF%F7%A3p%FF%F4%85C%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F7%A4r%FF%FE%F3%EC%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%F5%F0%FF%FB%D2%B9%FF%F9%BD%99%FF%F8%B6%8E%FF%F9%BB%95%FF%FB%D2%B9%FF%FE%F8%F4%FF%FC%E3%D3%FF%F6%98%60%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F6%97%5D%FF%FF%FA%F7%FF%FF%FF%FF%FF%FF%FD%FB%FF%F9%BD%99%FF%F4%88F%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%8DO%FF%FC%E0%CF%FF%FE%F5%EF%FF%F6%99a%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FB%CF%B4%FF%FF%FF%FF%FF%FF%FF%FF%FF%F8%B4%8B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%90R%FF%FF%FC%FA%FF%FC%E3%D4%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FD%E4%D5%FF%FF%FF%FF%FF%FE%F4%EE%FF%F4%85C%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FD%E6%D8%FF%FF%FF%FF%FF%F6%9Ab%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FB%D7%C1%FF%FF%FF%FF%FF%FD%EC%E1%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FE%F0%E7%FF%FF%FF%FF%FF%F8%B2%88%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F7%AB%7D%FF%FF%FF%FF%FF%FF%FD%FC%FF%F5%93X%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F8%B3%8A%FF%FF%FF%FF%FF%FF%FF%FF%FF%F8%B0%85%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FA%CC%B0%FF%FF%FF%FF%FF%FD%E5%D6%FF%F5%92V%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F8%B1%86%FF%FF%FC%FB%FF%FF%FF%FF%FF%FF%FC%FB%FF%F5%91U%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F8%B1%86%FF%FE%F0%E7%FF%FE%F9%F5%FF%FA%CC%B0%FF%F8%AC%7F%FF%F6%99a%FF%F5%90R%FF%F5%8FR%FF%FA%CD%B1%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%F9%BD%99%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%86C%FF%F6%9Ei%FF%F9%BB%96%FF%FB%CD%B2%FF%FC%DA%C6%FF%FD%ED%E3%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%FF%F9%C1%9F%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FC%DC%C8%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%F9%F6%FF%F8%AF%82%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%94Y%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%F4%ED%FF%F6%9Ab%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%94Z%FF%FF%FF%FF%FF%FF%FF%FF%FF%FA%C6%A7%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F7%A1m%FF%FB%D1%B8%FF%FD%E9%DD%FF%FD%E8%DB%FF%FF%FE%FD%FF%FF%FF%FF%FF%FD%E5%D7%FF%F4%88F%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F9%C2%A0%FF%FF%FF%FF%FF%FF%FF%FF%FF%FD%EA%DE%FF%F7%A6v%FF%F5%8EP%FF%F6%9Dg%FF%FC%DB%C7%FF%FC%DC%C8%FF%F5%8BL%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F7%A9z%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%F2%EB%FF%F5%8FQ%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%87F%FF%FD%E9%DD%FF%FD%E4%D5%FF%F4%89I%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FC%DF%CE%FF%FF%FF%FF%FF%FF%FF%FF%FF%F8%B1%87%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FA%C3%A2%FF%FF%FF%FF%FF%F9%C1%9F%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FF%FA%F7%FF%FF%FF%FF%FF%FE%F8%F5%FF%F4%88G%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F9%BE%9A%FF%FF%FF%FF%FF%FD%ED%E3%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FF%FA%F7%FF%FF%FF%FF%FF%FC%DF%CE%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FA%CC%B0%FF%FF%FF%FF%FF%FE%F9%F6%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FD%E4%D5%FF%FF%FF%FF%FF%FB%D4%BC%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%FD%EC%E1%FF%FF%FF%FF%FF%FE%F2%EB%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F8%B6%8E%FF%FF%FF%FF%FF%FC%DF%CE%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F7%A3q%FF%FF%FF%FF%FF%FF%FF%FF%FF%FA%CD%B1%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%87E%FF%FC%E1%D0%FF%FF%FB%F8%FF%F5%92V%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%8AJ%FF%FD%EA%DE%FF%FF%FF%FF%FF%FE%F7%F2%FF%F5%93W%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F5%8CM%FF%FB%D4%BD%FF%FD%EB%E0%FF%F7%A6t%FF%F5%8DO%FF%F7%A2o%FF%FD%E6%D8%FF%FF%FF%FF%FF%FF%FC%FB%FF%F8%B2%88%FF%F5%95%5B%FF%F4%87E%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F6%A0l%FF%FB%CD%B2%FF%FD%E9%DC%FF%FE%F8%F4%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FD%EB%E0%FF%F7%A7w%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%F1%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%F3%F4%85B%AD%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%AD%F4%85B'%F4%85B%EF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%EF%F4%85B'%F4%85B%00%F4%85B%25%F4%85B%AD%F4%85B%F1%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%FF%F4%85B%F1%F4%85B%AD%F4%85B%25%F4%85B%00%80%00%00%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%00%00%01";