//Responsible for starting and managing the game

function Game(){
  this.board = new Board()
  this.players = []
  this.isFinished = false
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
  } else {
    throw new Error("Field has already been filled")
  }
  this.nextMove()
}

Game.prototype.nextMove = function(){
  this.checkIfOver()
  if(!this.isOver()){
    this.switchPlayer()
  }
}

Game.prototype.currentBoard = function(){
  var currentBoard = ""
  var currentPlayer = this.currentPlayer
  this.board.grid.forEach(function(field){
    if (field.value === currentPlayer.value){
      currentBoard += field.id
    }
  })
  return currentBoard
}

Game.prototype.checkIfOver = function(){
  currentBoard = this.currentBoard()
  var winningPositions = ["123", "456", "789", "159", "357", "147", "258", "369"]
  if (winningPositions.includes(currentBoard)){
    this.isFinished = true
  }
}

Game.prototype.isOver = function(){
  return this.isFinished
}
