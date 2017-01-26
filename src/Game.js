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
