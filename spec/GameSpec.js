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

  describe("Start Game", function(){

    it("can start a game by creating a new grid", function(){
      spyOn(Board.prototype, "createGrid")
      game.startGame(3)
      expect(Board.prototype.createGrid).toHaveBeenCalled()
    })

  })





})
