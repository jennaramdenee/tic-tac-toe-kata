describe("Game", function(){

  var game;
  var player1;
  var player2;

  beforeEach(function(){
    game = new Game()
    player1 = new Player()
    player2 = new Player()

  })

  describe("New Game", function(){

    it("initializes with a new board", function(){
      expect(game.board).toBeDefined()
    })

    it("initializes with empty array of players", function(){
      expect(game.players).toEqual(jasmine.arrayContaining([]))
    })

    it("is by default not finished", function(){
      expect(game.isFinished).toEqual(false)
    })

  })

  describe("Add Players", function(){

    it("can add a new player to the game", function(){
      game.addPlayer(player1)
      expect(game.players.length).toEqual(1)
    })

    it("does not add more than 2 players", function(){
      game.players = [player1, player2]
      expect(function(){game.addPlayer(player1)}).toThrowError("Already has 2 players")
    })

  })

  describe("Enough Players", function(){

    it("can check when there are not two players", function(){
      expect(game._enoughPlayers()).toEqual(false)
    })

    it("can check when there are two players", function(){
      game.players = [player1, player2]
      expect(game._enoughPlayers()).toEqual(true)
    })

  })

  describe("Assign 'X' and 'O' to players", function(){

    it("can assign 'X' to first player", function(){
      game.players = [player1, player2]
      game._assignPlayerValue()
      expect(player1.value).toEqual("X")
    })

    it("can assign 'O' to first player", function(){
      game.players = [player1, player2]
      game._assignPlayerValue()
      expect(player2.value).toEqual("O")
    })

  })

  describe("Assign current player", function(){

    it("assigns the first player as current player", function(){
      game.players = [player1, player2]
      game._assignCurrentPlayer()
      expect(game.currentPlayer).toEqual(player1)
    })

  })

  describe("Start Game", function(){

    it("can start a game by creating a new grid", function(){
      game.players = [player1, player2]
      spyOn(Board.prototype, "createGrid")
      game.startGame(3)
      expect(Board.prototype.createGrid).toHaveBeenCalled()
    })

    it("assigns values to players when starting a game", function(){
      game.players = [player1, player2]
      spyOn(game, "_assignPlayerValue")
      game.startGame(3)
      expect(game._assignPlayerValue).toHaveBeenCalled()
    })

    it("assigns current player when starting a game", function(){
      game.players = [player1, player2]
      spyOn(game, "_assignCurrentPlayer")
      game.startGame(3)
      expect(game._assignCurrentPlayer).toHaveBeenCalled()
    })

    it("does not start a game if there aren't enough players", function(){
      game.players = [player1]
      expect(function(){game.startGame(3)}).toThrowError("Not enough players")
    })

  })

  describe("Finding User Selected Field", function(){

    it("finds the corresponding field to user chosen field", function(){
      function FieldDouble(){ this.id = 2}
      var testField = new FieldDouble()

      function BoardDouble(){ this.grid = [testField] }
      var testBoard = new BoardDouble()

      game.board = testBoard

      expect(game._findUserField(2)).toEqual(testField)
    })

  })

  describe("Take Turn", function(){

    xit("checks whether a user's chosen field is empty", function(){
      function FieldDouble(){}
      FieldDouble.prototype.isEmpty = function(){}
      var testField2 = new FieldDouble()

      spyOn(testField2, "isEmpty")
      spyOn(game, "_findUserField").and.returnValue(testField2)
      game.takeTurn(testField2)
      expect(testField2.isEmpty).toHaveBeenCalled()
    })

    it("fills the user chosen field with player's value", function(){
      function FieldDouble(){}
      FieldDouble.prototype.isEmpty = function(){return true}
      FieldDouble.prototype.fill = function(){}
      var testField = new FieldDouble()

      spyOn(testField, "fill")
      spyOn(game, "_findUserField").and.returnValue(testField)
      game.players = [player1, player2]
      game.startGame(3)
      game.takeTurn(testField)
      expect(testField.fill).toHaveBeenCalled()
    })

    it("switches current player after a turn has been taken", function(){
      function FieldDouble(){}
      FieldDouble.prototype.isEmpty = function(){return true}
      FieldDouble.prototype.fill = function(){}
      var testField = new FieldDouble()

      spyOn(game, "_switchPlayer")
      spyOn(game, "_findUserField").and.returnValue(testField)
      game.players = [player1, player2]
      game.startGame(3)
      game.takeTurn(testField)
      expect(game._switchPlayer).toHaveBeenCalled()
    })

    it("indicates when a field has already been filled", function(){
      function FieldDouble(){}
      FieldDouble.prototype.isEmpty = function(){return false}
      var testField = new FieldDouble()
      spyOn(game, "_findUserField").and.returnValue(testField)
      expect(function(){game.takeTurn()}).toThrowError("Field has already been filled")
    })

  })

  describe("Switching Turns", function(){

    it("can indicate whose turn it is", function(){
      game.players = [player1, player2]
      game._switchPlayer()
      expect(game.currentPlayer).toEqual(player2)
    })

  })

  describe("Look at current board", function(){

    beforeEach(function(){
      game.addPlayer(player1)
      game.addPlayer(player2)
      game.startGame(3)
    })

    it("can return an array showing fields where value is O", function(){
      game.takeTurn(1)
      game.takeTurn(2)
      game.takeTurn(3)
      game.takeTurn(4)
      expect(game._currentBoard()).toEqual(jasmine.arrayContaining(["1", "3"]))
    })

  })

  describe("Is Over", function(){

    it("can check if game is finished", function(){
      game.isFinished = true
      expect(game._isOver()).toEqual(true)
    })

  })

  describe("Winning Game", function(){

    beforeEach(function(){
      game.addPlayer(player1)
      game.addPlayer(player2)
      game.startGame(3)
    })

    it("can detect a winning game", function(){
      game.takeTurn(1)
      game.takeTurn(4)
      game.takeTurn(2)
      game.takeTurn(5)
      game.takeTurn(3)
      expect(game.isFinished).toEqual(true)
    })

    it("can detect a game not over yet", function(){
      game.takeTurn(1)
      game.takeTurn(4)
      game.takeTurn(2)
      game.takeTurn(5)
      game.takeTurn(6)
      expect(game.isFinished).toEqual(false)
    })

  })

  describe("Ending Game / Next Move", function(){

    it("can end the game", function(){
      game.isFinished = false
      spyOn(game, "_switchPlayer")
      game._nextMove()
      expect(game._switchPlayer).toHaveBeenCalled()
    })

  })

  describe("Full Board", function(){

    it("can check if the board is not full", function(){
      expect(game._checkIfBoardFull()).toEqual(false)
    })

    it("can check if the board is full", function(){
      game.addPlayer(player1)
      game.addPlayer(player2)
      game.startGame(3)
      game.takeTurn(1)
      game.takeTurn(5)
      game.takeTurn(2)
      game.takeTurn(4)
      game.takeTurn(6)
      game.takeTurn(3)
      game.takeTurn(7)
      game.takeTurn(8)
      game.takeTurn(9)
      expect(game._checkIfBoardFull()).toEqual(true)
    })

  })


})
