$(document).ready(function() {
  var sigmaIndex = 0;
  var numSigmas = 0;
  var fadeTime = 400;
  var enableButtons = function(){
    $('input').removeAttr('disabled');
  };
  var updateTime = 10000;
  var autoUpdate = setTimeout(nextSig, updateTime);

  $('#previous').on('click', function(){
    clearTimeout(autoUpdate);
    $('input').attr('disabled', true)
      if(sigmaIndex == 0){
        sigmaIndex = numSigmas;
      } else {
        sigmaIndex--;
      }
      highlight(sigmaIndex);
      console.log(sigmaIndex);
      $('#info').fadeOut(fadeTime, displayDetails);
      autoUpdate = setTimeout(nextSig, updateTime);
  });

  $('#next').on('click', function(){
    clearTimeout(autoUpdate);
      nextSig();
  });

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
      numSigmas = sigmas.sigmanauts.length - 2;
      displayIndex(sigmas.sigmanauts);
      console.log(numSigmas);
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
    $('#indexPoints').append('<tbody></tbody>');
    for(var i = 0; i < sigmanauts.length-1; i++) {
      if(i % 9 == 0) {
        $('tbody').append('<tr class="number"></tr>');
      }
      var $el = $('.number').last();
      $el.append('<td id="sigmaNumber' + i + '">&#x03A3</td>');
      $el.children().last().data( "details", sigmanauts[i]);
    }
  }


});
