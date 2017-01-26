describe("Field", function(){

  var field;

  describe("Creation", function(){

    beforeEach(function(){
      field = new Field(1)
    })

    it("is empty by default", function(){
      expect(field.empty).toEqual(true)
    })

    it("is created with an id", function(){
      expect(field.id).toEqual(1)
    })

  })

  describe("Empty or filled", function(){

    it("can indicate whether a field is empty", function(){
      expect(field.isEmpty()).toEqual(true)
    })

    it("can change the state of a field if it is filled", function(){
      field.fill()
      expect(field.empty).toEqual(false)
    })

  })



})
