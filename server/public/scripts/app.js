$(document).ready(function() {
  var sigmaIndex = 0;
  var numSigmas = 0;
  var fadeTime = 400;
  var enableButtons = function(){
    $('input').removeAttr('disabled');
  };
  var updateTime = 10000;
  var autoUpdate = setTimeout(nextSig, updateTime);

  $( "body" ).keydown(function() {
    switch (event.keyCode) {
      case 37:
        clearTimeout(autoUpdate);
        prevSig();
        break;
      case 39:
        clearTimeout(autoUpdate);
        nextSig();
        break;
      }
  });

  $('#previous').on('click', function(){
    clearTimeout(autoUpdate);
    prevSig();
  });

  $('#next').on('click', function(){
    clearTimeout(autoUpdate);
      nextSig();
  });

  function prevSig(){
    $('input').attr('disabled', true)
    if(sigmaIndex == 0) {
      sigmaIndex = numSigmas;
      console.log(sigmaIndex);
    } else {
      sigmaIndex--;
    }
    highlight(sigmaIndex);
    console.log(sigmaIndex);
    $('#info').fadeOut(fadeTime, displayDetails);
    autoUpdate = setTimeout(nextSig, updateTime);
  }

  function nextSig() {
    $('input').attr('disabled', true);
    if(sigmaIndex == numSigmas){
      sigmaIndex = 0;
    } else {
      sigmaIndex++;
    }
    highlight(sigmaIndex);
    $('#info').fadeOut(fadeTime, displayDetails);
    autoUpdate = setTimeout(nextSig, updateTime);
  }

  $.ajax({
    type: 'GET',
    url: '/data',
    success: function(sigmas) {
      numSigmas = sigmas.sigmanauts.length - 1;
      displayIndex(sigmas.sigmanauts);
      console.log(numSigmas);
      console.log(sigmas.sigmanauts[numSigmas]);
      updateDom();
    },
    error: function() {
      console.log('Error with request');
    }
  });

  function updateDom() {
    highlight();
    displayDetails();
  }

  function displayDetails() {
    var sigmaData = $('#sigmaNumber' + sigmaIndex).data().details;
    var $el = $('#info');
    $el.children().remove();
    $el.append('<h1>' + sigmaData.name + '</h1>');
    $el.append('<a href = https://github.com/' + sigmaData.git_username + '>https://github.com/' + sigmaData.git_username + '</a>');
    $el.append("<h3>SIGMA SHOUTOUT:</h3><p>" + sigmaData.shoutout + '</p>');
    $el.fadeIn(fadeTime, enableButtons);
  }

  function highlight() {
    var i = sigmaIndex;
    $('td').text(' ');
    $('td').removeAttr('class');
    $('#sigmaNumber' + i).text('Σ');
    $('#sigmaNumber' + i).attr('class', 'fade');
  }

  function displayIndex(sigmanauts){
    for(var i = 0; i < sigmanauts.length; i++) {
      if(i % 10 == 0)
        //new table for each new row to allow for centering of rows with less than 10 elements
        $('#tables').append('<table><tr></tr></table>');
      }
      var $el = $('tr').last();
      $el.append('<td id="sigmaNumber' + i + '">&#x03A3</td>');
      $el.children().last().data( "details", sigmanauts[i]);
    }
  }


});
