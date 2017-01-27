$(document).ready(function(){

  var game = new Game()

  $('#enter-players').on('submit', function(event){
    event.preventDefault()
    var player1 = $('#player1').val()
    var player2 = $('#player2').val()
    game.addPlayer(player1)
    game.addPlayer(player2)
    game.startGame(3)
    $('#enter-players').html('<p>'+player1+' vs. '+player2+'<p>')
  })


  $('td').on('click', function(event){
    event.preventDefault()
    var id = $(this).attr('name')
    var value = game.currentPlayer.value
    game.takeTurn(parseInt(id))
    $(this).html('<p>'+value+'</p>')
    lastMove()
  })

  function lastMove(){
    if(game.isFinished){
      var player = game.currentPlayer.name
      $('#enter-players').html('<p>Bow down to '+player+'<p>')
      $('td').off('click')
    }
  }



})
