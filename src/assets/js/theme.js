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

});