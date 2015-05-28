// function (url) {
//   return request(url);
// }

function expander1(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader('Access-Control-Allow-Origin', url);
  request.onreadystatechange = function(data){
    console.log('blah');
    console.log(data);
    console.log(request);
  };
  request.send();
}

function expander2(url) {
  var request = $.ajax({
    url: url,
    method: "GET",
    dataType: 'jsonp'
  }).done(function( data, data2, data3 ) {
    console.log('blah1');
    console.log(data);
    console.log(data2);
    console.log(data3);
  }).fail(function( data, data2, data3 ) {
    console.log('blah2');
    console.log('blahdata');
    console.log(data);
    console.log('blahdata2');
    console.log(data2);
    console.log('blahdata3');
    console.log(data3);

    console.log('blahdata4');
    console.log(data.getAllResponseHeaders());
  });
}



function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function expander3(url) {
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    console.log('blahblah1');
    console.log(xhr);
    console.log(xhr.responseText);
  };

  xhr.onerror = function(err) {
    console.log('blahblaherror')
    console.log('Woops, there was an error making the request.');
    console.log(err);
  };

  xhr.send();
}




