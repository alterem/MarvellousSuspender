import  { gsStorage }             from './gsStorage.js';
import  { gsUtils }               from './gsUtils.js';

(() => {
  'use strict';

  gsUtils.documentReadyAndLocalisedAsPromised(document).then(function() {
    //Set theme
    gsStorage.getOption(gsStorage.THEME).then((theme) => {
      document.body.classList.add(theme === 'dark' ? 'dark' : null);
    });

    var shortcutsEl = document.getElementById('keyboardShortcuts');
    var configureShortcutsEl = document.getElementById('configureShortcuts');

    var notSetMessage = chrome.i18n.getMessage('js_shortcuts_not_set');
    var groupingKeys = [
      '2-toggle-temp-whitelist-tab',
      '2b-unsuspend-selected-tabs',
      '4-unsuspend-active-window',
    ];

    //populate keyboard shortcuts
    chrome.commands.getAll(commands => {
      commands.forEach(command => {
        if (command.name !== '_execute_browser_action') {
          const shortcut =
            command.shortcut !== ''
              ? gsUtils.formatHotkeyString(command.shortcut)
              : '(' + notSetMessage + ')';
          var addMarginBottom = groupingKeys.includes(command.name);
          shortcutsEl.innerHTML += `<div ${
            addMarginBottom ? ' class="bottomMargin"' : ''
          }>${command.description}</div>
            <div class="${
              command.shortcut ? 'hotkeyCommand' : 'lesserText'
            }">${shortcut}</div>`;
        }
      });
    });

    //listener for configureShortcuts
    configureShortcutsEl.onclick = function(e) {
      chrome.tabs.update({ url: 'chrome://extensions/shortcuts' });
    };
  });

})();
