function Game(){
  this.board = new Board()
}

Game.prototype.isTwoPlayer = function(){
  return this.hasOwnProperty("player1") && this.hasOwnProperty("player2")
}
