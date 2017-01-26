describe("Game", function(){

  var game;
  var player1;
  var player2;
  var field;

  beforeEach(function(){
    game = new Game()
    player1 = new Player()
    player2 = new Player()
    field = new Field(2)

  })

  describe("New Game", function(){

    it("initializes with a new board", function(){
      expect(game.board).toBeDefined()
    })

    it("initializes with empty array of players", function(){
      expect(game.players).toEqual(jasmine.arrayContaining([]))
    })

  })

  describe("Add Players", function(){

    it("can add a new player to the game", function(){
      game.addPlayer(player1)
      expect(game.players).toEqual(jasmine.arrayContaining([player1]))
    })

    it("does not add more than 2 players", function(){
      game.players = [player1, player2]
      expect(function(){game.addPlayer(player1)}).toThrowError("Already has 2 players")
    })

  })

  describe("Enough Players", function(){

    it("can check when there are not two players", function(){
      expect(game.enoughPlayers()).toEqual(false)
    })

    it("can check when there are two players", function(){
      game.players = [player1, player2]
      expect(game.enoughPlayers()).toEqual(true)
    })

  })

  describe("Assign 'X' and 'O' to players", function(){

    it("can assign 'X' to first player", function(){
      game.players = [player1, player2]
      game.assignPlayerValue()
      expect(player1.value).toEqual("X")
    })

    it("can assign 'O' to first player", function(){
      game.players = [player1, player2]
      game.assignPlayerValue()
      expect(player2.value).toEqual("O")
    })

  })

  describe("Assign current player", function(){

    it("assigns the first player as current player", function(){
      game.players = [player1, player2]
      game.assignCurrentPlayer()
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
      spyOn(game, "assignPlayerValue")
      game.startGame(3)
      expect(game.assignPlayerValue).toHaveBeenCalled()
    })

    it("assigns current player when starting a game", function(){
      game.players = [player1, player2]
      spyOn(game, "assignCurrentPlayer")
      game.startGame(3)
      expect(game.assignCurrentPlayer).toHaveBeenCalled()
    })

    it("does not start a game if there aren't enough players", function(){
      game.players = [player1]
      expect(function(){game.startGame(3)}).toThrowError("Not enough players")
    })

  })

  describe("Taking Turns", function(){

    it("finds the corresponding field to user chosen field", function(){
      function FieldDouble(){ this.id = 2 }
      var testField = new FieldDouble()

      function BoardDouble(){ this.grid = [testField] }
      var testBoard = new BoardDouble()

      game.board = testBoard

      expect(game.findUserField(2)).toEqual(testField)
    })

    it("checks whether a user's chosen field is empty", function(){
      spyOn(field, "isEmpty")
      spyOn(game, "findUserField").and.returnValue(field)
      game.takeTurn(field)
      expect(field.isEmpty).toHaveBeenCalled()
    })

    it("fills the user chosen field with player's value", function(){
      spyOn(field, "fill")
      spyOn(game, "findUserField").and.returnValue(field)
      game.players = [player1, player2]
      game.startGame(3)
      game.takeTurn(field)
      expect(field.fill).toHaveBeenCalled()
    })

  })

  describe("Switching Turns", function(){

    it("can indicate whose turn it is", function(){
      game.players = [player1, player2]
      game.switchPlayer()
      expect(game.currentPlayer).toEqual(player2)
    })

  })





})
