'use strict';

// chrome.runtime.sendMessage({method: "getBbConfiguration"}, function(response) {
//   var storage = new LocalStorage();
//   if(response.storage=="pia") {
//     storage = new PIAStorage(response.pia)
//   }

//   new GoogleAnalysis(storage).analyse(document);
// });


var url = document.location.origin;

if (url && url != "") {
  var pia_url = "";
  var app_key = "eu.ownyourdata.webhistory";
  var app_secret = "";
  var repo = "eu.ownyourdata.webhistory";
  chrome.storage.sync.get(['OYD_pia-url', 'OYD_app-secret'], function(items) {
    pia_url = items['OYD_pia-url'];
    app_secret = items['OYD_app-secret'];

    var authorizationBasic = btoa(app_key + ':' + app_secret);
    var request = new XMLHttpRequest();
    request.open('POST', pia_url + '/oauth/token', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send("grant_type=client_credentials");

    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        var token = JSON.parse(request.responseText).access_token;
        var req2 = new XMLHttpRequest();
        req2.open('POST', pia_url + '/api/repos/' + repo + '/items', true);
        req2.setRequestHeader('Accept', '*/*');
        req2.setRequestHeader('Content-Type', 'application/json');
        req2.setRequestHeader('Authorization', 'Bearer ' + token);
        var data = JSON.stringify({url: url,
                                   timestamp: Date.now(), 
                                   _oydRepoName: 'Webhistory'});
        req2.send(data);
      }
    }
  });
};
