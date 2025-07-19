// 内部日志函数，避免循环依赖
const logError = function(context, message, error) {
  console.warn('WARNING:', context, message, error);
};

export const gsChrome = {
  cookiesGetAll: function() {
    return new Promise(resolve => {
      chrome.cookies.getAll({}, cookies => {
        if (chrome.runtime.lastError) {
          logError('chromeCookies', 'Error getting cookies', chrome.runtime.lastError);
          cookies = [];
        }
        resolve(cookies);
      });
    });
  },
  cookiesRemove: function(url, name) {
    return new Promise(resolve => {
      if (!url || !name) {
        logError('chromeCookies', 'url or name not specified', null);
        resolve(null);
        return;
      }
      chrome.cookies.remove({ url, name }, details => {
        if (chrome.runtime.lastError) {
          logError('chromeCookies', 'Error removing cookie', chrome.runtime.lastError);
          details = null;
        }
        resolve(details);
      });
    });
  },

  tabsCreate: function(details) {
    return new Promise(resolve => {
      if (
        !details ||
        (typeof details !== 'string' && typeof details.url !== 'string')
      ) {
        logError('chromeTabs', 'url not specified', null);
        resolve(null);
        return;
      }
      details = typeof details === 'string' ? { url: details } : details;
      chrome.tabs.create(details, tab => {
        if (chrome.runtime.lastError) {
          logError('chromeTabs', 'Error creating tab', chrome.runtime.lastError);
          tab = null;
        }
        resolve(tab);
      });
    });
  },
  tabsReload: function(tabId) {
    return new Promise(resolve => {
      if (!tabId) {
        logError('chromeTabs', 'tabId not specified', null);
        resolve(false);
        return;
      }
      chrome.tabs.reload(tabId, () => {
        if (chrome.runtime.lastError) {
          logError('chromeTabs', 'Error reloading tab', chrome.runtime.lastError);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  },
  tabsUpdate: function(tabId, updateProperties) {
    return new Promise(resolve => {
      if (!tabId || !updateProperties) {
        logError('chromeTabs', 'tabId or updateProperties not specified', null);
        resolve(null);
        return;
      }
      chrome.tabs.update(tabId, updateProperties, tab => {
        if (chrome.runtime.lastError) {
          logError('chromeTabs', 'Error updating tab', chrome.runtime.lastError);
          tab = null;
        }
        resolve(tab);
      });
    });
  },
  tabsGet: function(tabId) {
    return new Promise(resolve => {
      if (!tabId) {
        logError('chromeTabs', 'tabId not specified', null);
        resolve(null);
        return;
      }
      chrome.tabs.get(tabId, tab => {
        if (chrome.runtime.lastError) {
          logError('chromeTabs', 'Error getting tab', chrome.runtime.lastError);
          tab = null;
        }
        resolve(tab);
      });
    });
  },
  tabsQuery: function(queryInfo) {
    queryInfo = queryInfo || {};
    return new Promise(resolve => {
      chrome.tabs.query(queryInfo, tabs => {
        if (chrome.runtime.lastError) {
          logError('chromeTabs', 'Error querying tabs', chrome.runtime.lastError);
          tabs = [];
        }
        resolve(tabs);
      });
    });
  },
  tabsRemove: function(tabId) {
    return new Promise(resolve => {
      if (!tabId) {
        logError('chromeTabs', 'tabId not specified', null);
        resolve(null);
        return;
      }
      chrome.tabs.remove(tabId, () => {
        if (chrome.runtime.lastError) {
          logError('chromeTabs', 'Error removing tab', chrome.runtime.lastError);
        }
        resolve();
      });
    });
  },

  windowsGetLastFocused: function() {
    return new Promise(resolve => {
      chrome.windows.getLastFocused({}, window => {
        if (chrome.runtime.lastError) {
          logError('chromeWindows', 'Error getting last focused window', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
  windowsGet: function(windowId) {
    return new Promise(resolve => {
      if (!windowId) {
        logError('chromeWindows', 'windowId not specified', null);
        resolve(null);
        return;
      }
      chrome.windows.get(windowId, { populate: true }, window => {
        if (chrome.runtime.lastError) {
          logError('chromeWindows', 'Error getting window', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
  windowsGetAll: function() {
    return new Promise(resolve => {
      chrome.windows.getAll({ populate: true }, windows => {
        if (chrome.runtime.lastError) {
          logError('chromeWindows', 'Error getting all windows', chrome.runtime.lastError);
          windows = [];
        }
        resolve(windows);
      });
    });
  },
  windowsCreate: function(createData) {
    createData = createData || {};
    return new Promise(resolve => {
      chrome.windows.create(createData, window => {
        if (chrome.runtime.lastError) {
          logError('chromeWindows', 'Error creating window', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
  windowsUpdate: function(windowId, updateInfo) {
    return new Promise(resolve => {
      if (!windowId || !updateInfo) {
        logError('chromeTabs', 'windowId or updateInfo not specified', null);
        resolve(null);
        return;
      }
      chrome.windows.update(windowId, updateInfo, window => {
        if (chrome.runtime.lastError) {
          logError('chromeWindows', 'Error updating window', chrome.runtime.lastError);
          window = null;
        }
        resolve(window);
      });
    });
  },
};
