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
  if (this.enoughPlayers()){
    this.board.createGrid(size)
    this.assignPlayerValue()
    this.assignCurrentPlayer()
  } else {
    throw new Error("Not enough players")
  }
}

Game.prototype.switchPlayer = function(){
  this.currentPlayer = this.players.reverse()[0]
}

Game.prototype.assignPlayerValue = function(){
  this.players[0].value = "X"
  this.players[1].value = "O"
}

Game.prototype.assignCurrentPlayer = function(){
  this.currentPlayer = this.players[0]
}

Game.prototype.findUserField = function(userField){
  var selectedField;
  this.board.grid.forEach(function(field){
    if (field.id === userField){
      selectedField = field
    }
  })
  return selectedField
}

Game.prototype.takeTurn = function(userField){
  var selectedField = this.findUserField(userField)
  if (selectedField.isEmpty()){
    selectedField.fill(this.currentPlayer.value)
    this.switchPlayer()
  }
}

//switch turns
