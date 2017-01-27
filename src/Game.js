//Responsible for starting and managing the game

function Game(){
  this.board = new Board()
  this.players = []
  this.isFinished = false
}

//Used methods
Game.prototype.addPlayer = function(name){
  if (this._enoughPlayers()){
    throw new Error("Already has 2 players")
  } else {
    this.players.push(new Player(name))
  }
}

Game.prototype.startGame = function(size){
  if (this._enoughPlayers()){
    this.board.createGrid(size)
    this._assignPlayerValue()
    this._assignCurrentPlayer()
  } else {
    throw new Error("Not enough players")
  }
}

Game.prototype.takeTurn = function(userField){
  var selectedField = this._findUserField(userField)
  if (selectedField.isEmpty()){
    selectedField.fill(this.currentPlayer.value)
  } else {
    throw new Error("Field has already been filled")
  }
  this._nextMove()
}

//To be Private methods
Game.prototype._enoughPlayers = function(){
  return this.players.length >= 2
}

Game.prototype._switchPlayer = function(){
  this.currentPlayer = this.players.reverse()[0]
}

Game.prototype._assignPlayerValue = function(){
  this.players[0].value = "X"
  this.players[1].value = "O"
}

Game.prototype._assignCurrentPlayer = function(){
  this.currentPlayer = this.players[0]
}

Game.prototype._findUserField = function(userField){
  var selectedField;
  this.board.grid.forEach(function(field){
    if (field.id === userField){
      selectedField = field
    }
  })
  return selectedField
}

Game.prototype._nextMove = function(){
  this._checkIfOver()
  if(!this._isOver()){
    this._switchPlayer()
  }
}

Game.prototype._currentBoard = function(){
  var currentBoard = []
  var currentPlayer = this.currentPlayer
  this.board.grid.forEach(function(field){
    if (field.value === currentPlayer.value){
      currentBoard.push((field.id).toString())
    }
  })
  return currentBoard
}

Game.prototype._checkIfOver = function(){
  var currentBoard = this._currentBoard()
  var winningPositions = ["123", "456", "789", "159", "357", "147", "258", "369"]
  var self = this
  winningPositions.forEach(function(position){
    var matches = 0
    currentBoard.forEach(function(play){
      if (position.includes(play)){
        matches += 1
      }
    })
    if (matches === 3){
      self.isFinished = true
    }
  })
}


Game.prototype._isOver = function(){
  return this.isFinished
}
