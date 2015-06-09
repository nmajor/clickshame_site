// var baseUrl = 'http://api.clickshame.com';
// var identityKey = 'y1vGmClD5SHK5u9EoiW8TeSpprGUNlQm40UkVnVv2YSvLAJYBx';

var identityKey = 'rAHHlL1NY61ul4ncm8eP2DCmKUsbWWzYCgb35pADhdK6KVdtE6';
var baseUrl = 'http://localhost:3000';

function sendStrike(recaptchaResponse) {
  $.ajax({
  url: baseUrl+'/strikes',
  method: 'POST',
  data: {
    key: identityKey,
    url: $('#report-url').val(),
    comment: $('#report-comment').val(),
    type: 'clickbait',
    recaptcha_response: $('#report-captcha-response').val()
  },
  crossDomain: true,
  }).done(function(result) {
    console.log('blahsubmittedstrike');
    console.log(result);
  });
}

var captchaContainer = null;
function loadCaptcha() {
  console.log('heyhey1');
  captchaContainer = grecaptcha.render('report-recaptcha', {
    'sitekey' : '6Ldy9QcTAAAAAIRmro5Uf2I9eFhLrkgzxeZvhTQg',
    'callback' : function(response) {
      // $('#report-captcha-response').val(response);
      sendStrike(response);
    }
  });
}

$(window).load(function() {

  $( "#clickbait-ticker" ).rcarousel({
    auto: { enabled: true, direction: "next", interval: 4000 },
    visible: 5,
    step: 1,
    height: 300,
    width: 400,
    margin: 50,
  });

  SocialShareKit.init();

  function bindReport() {
    $('#report-submit').click(function() {
      $('.report-data-form').hide();
      $('.report-recaptcha-form').show();
    });
  }

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
    }).done(function(result) {
      renderWallElements( referenceWallListElm, result, 'url', true );
    });
  }

  function getIdentityTotal() {
    $.ajax({
    url: baseUrl+'/identities/total?key='+identityKey,
    method: 'GET',
    crossDomain: true,
    }).done(function(result) {
      $('.identity-total').html(result);
    });
  }

  function getReferenceTotal() {
    $.ajax({
    url: baseUrl+'/references/total?key='+identityKey,
    method: 'GET',
    crossDomain: true,
    }).done(function(result) {
      $('.reference-total').html(result);
    });
  }

  function getDomainTotal() {
    $.ajax({
    url: baseUrl+'/domains/total?key='+identityKey,
    method: 'GET',
    crossDomain: true,
    }).done(function(result) {
      $('.domain-total').html(result);
    });
  }

  bindReport();

  getIdentityTotal();
  getReferenceTotal();
  getDomainTotal();

  getWallStrikes();
  getWallDomains();
  getWallReferences();

});