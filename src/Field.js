function Field(id){
  this.empty = true
  this.id = id
}

Field.prototype.isEmpty = function(){
  return this.empty
}

Field.prototype.fill = function(){
  this.empty = false
}
