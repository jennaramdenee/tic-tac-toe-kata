describe("Game", function(){

  var game;

  beforeEach(function(){
    game = new Game()
  })

  describe("New Game", function(){

    it("initializes with a new board", function(){
      expect(game.board).toBeDefined()
    })

  })

  describe("Start Game", function(){

    it("can check that there are two players", function(){
      expect(game.isTwoPlayer()).toEqual(false)
    })

  })





})
