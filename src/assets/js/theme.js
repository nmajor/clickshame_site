  var orly;

$(window).load(function () {

  $( "#clickbait-ticker" ).rcarousel({
    auto: { enabled: true, direction: "next", interval: 4000 },
    visible: 5,
    step: 1,
    height: 300,
    width: 400,
    margin: 50,
  });

  SocialShareKit.init();

  var baseUrl = 'http://api.clickshame.com';
  var identityKey = 'y1vGmClD5SHK5u9EoiW8TeSpprGUNlQm40UkVnVv2YSvLAJYBx';

  // var identityKey = 'rAHHlL1NY61ul4ncm8eP2DCmKUsbWWzYCgb35pADhdK6KVdtE6';
  // var baseUrl = 'http://localhost:3000';

  function getCompositeScore(scores) {
    return scores.filter(function(score) { return score.type === 'composite'; })[0].value;
  }

  function renderWallElements(elm, dataArray, attr, includeScore) {
    var score;
    for(var i=0; i<dataArray.length; i++) {
      if ( includeScore ) {
        score = getCompositeScore(dataArray[i].Scores);
        elm.append('<li><span class="score">'+score+'</span>'+dataArray[i][attr]+'</li>');
      } else { elm.append('<li>'+dataArray[i][attr]+'</li>'); }
    }
  }

  function getWallStrikes() {
    var strikeWallListElm = $('.strike-wall ul');
    strikeWallListElm.html('');

    $.ajax({
    url: baseUrl+'/strikes/recent?key='+identityKey+'&count=20',
    method: 'GET',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    }).done(function(result) {
      renderWallElements( strikeWallListElm, result, 'url', false );
    });
  }

  function getWallDomains() {
    var domainWallListElm = $('.domain-wall ul');
    domainWallListElm.html('');

    $.ajax({
    url: baseUrl+'/domains/top?key='+identityKey+'&count=20',
    method: 'GET',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    }).done(function(result) {
      renderWallElements( domainWallListElm, result, 'name', true );
    });
  }

  function getWallReferences() {
    var referenceWallListElm = $('.reference-wall ul');
    referenceWallListElm.html('');

    $.ajax({
    url: baseUrl+'/references/top?key='+identityKey+'&count=20',
    method: 'GET',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    }).done(function(result) {
      renderWallElements( referenceWallListElm, result, 'url', true );
    });
  }

  function getIdentityTotal() {
    $.ajax({
    url: baseUrl+'/identities/total?key='+identityKey,
    method: 'GET',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    }).done(function(result) {
      $('.identity-total').html(result);
    });
  }

  function getReferenceTotal() {
    $.ajax({
    url: baseUrl+'/references/total?key='+identityKey,
    method: 'GET',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    }).done(function(result) {
      $('.reference-total').html(result);
    });
  }

  function getDomainTotal() {
    $.ajax({
    url: baseUrl+'/domains/total?key='+identityKey,
    method: 'GET',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    }).done(function(result) {
      $('.domain-total').html(result);
    });
  }

  getIdentityTotal();
  getReferenceTotal();
  getDomainTotal();

  getWallStrikes();
  getWallDomains();
  getWallReferences();

});