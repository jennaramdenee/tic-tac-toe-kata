function Board(){
  this.grid = []
}

Board.prototype.addField = function(field){
  this.grid.push(field)
}

Board.prototype.createGrid = function(size){
  numberOfFields = size * size
  for(var i=0; i<numberOfFields; i++){
    this.addField(new Field(i+1))
  }
}
