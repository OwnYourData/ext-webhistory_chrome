'use strict';

function loadOptions() {
  var pia_url = "";
  var app_secret = "";
  chrome.storage.sync.get(['OYD_pia-url', 'OYD_app-secret'], function(items) {
    var pia_url = items['OYD_pia-url'];
    var app_secret = items['OYD_app-secret'];
    document.getElementById("pia-url").value = pia_url;
    document.getElementById("app-secret").value = app_secret;
  }); 
}

function saveOptions() {
  var pia_url = document.getElementById("pia-url").value;
  var app_secret = document.getElementById("app-secret").value;
  chrome.storage.sync.set({'OYD_pia-url': pia_url, 'OYD_app-secret': app_secret}, function() {
  });
}

loadOptions();

document.getElementById("save").addEventListener("click", saveOptions);
