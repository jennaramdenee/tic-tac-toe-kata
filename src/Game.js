function Game(){
  this.board = new Board()
  this.players = []
}

Game.prototype.enoughPlayers = function(){
  return this.players.length >= 2
}

Game.prototype.addPlayer = function(player){
  if (this.enoughPlayers()){
    throw new Error("Already has 2 players")
  } else {
    this.players.push(player)
  }
}

Game.prototype.startGame = function(size){
  this.board.createGrid(3)
}

Game.prototype.switchPlayer = function(){
  this.currentPlayer = this.players.reverse()[0]
}

Game.prototype.assignPlayerValue = function(){
  this.players[0].value = "X"
  this.players[1].value = "O"
}
