'use strict';

const logEnabled = false;

function log(message) {
  if (logEnabled) {
    console.log(message);
  }
}
function warn(message) {
  if (logEnabled) {
    console.warn(message);
  }
}

// event handler to toggle mute

browser.action.onClicked.addListener((tab) => {
  if (tab !== undefined) {
    log("toolbar icon clicked");
    log(tab);
    toggleTabMute(tab);
  } else {
    warn("toolbar icon clicked, tab is undefined");
  }
});

browser.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-mute-tab") {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    for (let tab of tabs) {
      log("command toggle-mute-tab executed");
      log(tab);
      toggleTabMute(tab);
    }
  }
});

function toggleTabMute(tab) {
  let isMuted = tab.mutedInfo.muted;
  browser.tabs.update(tab.id, {"muted": !isMuted});
  log(`  currently muted: ${isMuted} -> set to: ${!isMuted}`);
}

// event handler to update toolbar icon

browser.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  if (Object.prototype.hasOwnProperty.call(changeInfo, "mutedInfo") || Object.prototype.hasOwnProperty.call(changeInfo, "status")) {
    log("tabs.onUpdated");
    log(tab);
    updateToolbarIcon(tab);
  }
});

browser.tabs.onActivated.addListener(async (activeInfo) => {
  let tab = await browser.tabs.get(activeInfo.tabId);
  log("tabs.onActivated");
  log(tab);
  updateToolbarIcon(tab);
});

browser.theme.onUpdated.addListener(async (_updateInfo) => {
  let tabs = await browser.tabs.query({active: true, currentWindow: true});
  for (let tab of tabs) {
    log("theme.onUpdated");
    log(tab);
    updateToolbarIcon(tab);
  }
});

// update icon tool methods

function updateToolbarIcon(tab) {
  if (tab.mutedInfo.muted) {
    setToolbarIconMute(tab);
  } else {
    setToolbarIconUnmute(tab);
  }
}

function setToolbarIconMute(tab) {
  setToolbarIcon(tab, "muted", "toolbarTooltipMute");
}

function setToolbarIconUnmute(tab) {
  setToolbarIcon(tab, "unmuted", "toolbarTooltipUnmute");
}

async function setToolbarIcon(tab, newIconState, tooltipKey) {
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;
  let iconTheme = isDarkMode ? "light" : "dark";

  let tooltip = browser.i18n.getMessage(tooltipKey);
  log(`  set toolbar icon: tab is ${newIconState}, darkmode: ${isDarkMode}`);
  chrome.action.setIcon({
    "tabId": tab.id,
    "path": {
      "16": `images/${iconTheme}/${newIconState}-16.png`,
      "32": `images/${iconTheme}/${newIconState}-32.png`,
      "64": `images/${iconTheme}/${newIconState}-64.png`,
      "128": `images/${iconTheme}/${newIconState}-128.png`
    }
  });
  chrome.action.setTitle({
    "tabId": tab.id,
    "title": tooltip
  });
}
