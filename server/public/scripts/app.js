$(document).ready(function() {
  var sigmaIndex = 0;
  var numSigmas = 0;
  //need to get ajax array info for these
  $('#previous').on('click', function(){
      if(sigmaIndex == 0){
        sigmaIndex = 17;
      } else {
        sigmaIndex--;
      }
      highlight(sigmaIndex);
      displayDetails($('#sigmaNumber' + sigmaIndex).data().details);
  });
  $('#next').on('click', function(){
      if(sigmaIndex == 17){
        sigmaIndex = 0;
      } else {
        sigmaIndex++;
      }
      highlight(sigmaIndex);
      displayDetails($('#sigmaNumber' + sigmaIndex).data().details);
  });

  $.ajax({
    type: 'GET',
    url: '/data',

    success: function(sigmas) {
      numSigmas = sigmas.sigmanauts.length - 1;
      console.log(sigmas.sigmanauts);
      displayDetails(sigmas.sigmanauts[sigmaIndex]);

      displayIndex(sigmas.sigmanauts);
      highlight(sigmaIndex);
    },

    error: function() {
      console.log('Error with request');
    }

  });

  function displayDetails(oneSigma) {
    var $el = $('#info');
    $el.children().remove();
    $el.append('<h1>' + oneSigma.name + '</h1>');
    $el.append('<a href = https://github.com/' + oneSigma.git_username + '>https://github.com/' + oneSigma.git_username + '</a>');
    $el.append('<p>' + oneSigma.shoutout + '</p>');
  }

  function highlight(i) {
    $('td').text(' ');
    $('td').removeClass();
    $('#sigmaNumber' + i).text('Σ');
    $('#sigmaNumber' + i).attr('class', 'fade');
    console.log(i);
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
