describe("Board", function(){

  var board;
  var testFieldDouble;

  describe("New board", function(){

    beforeEach(function(){
      board = new Board()
      function FieldDouble(){}
      testFieldDouble = new FieldDouble()
    })

    it("is initialized with an empty grid", function(){
      expect(board.grid).toEqual(jasmine.arrayContaining([]))
    })

    it("can add a new field to grid", function(){
      board.addField(testFieldDouble)
      expect(board.grid).toEqual(jasmine.arrayContaining([testFieldDouble]))
    })

    it("creates a 3x3 grid with 9 fields", function(){
      board.createGrid(3)
      expect(board.grid.length).toEqual(9)
    })

  })

})
