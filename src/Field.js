//Responsible for managing the state of a single field/cell

function Field(id){
  this.empty = true
  this.id = id
}

Field.prototype.isEmpty = function(){
  return this.empty
}

Field.prototype.fill = function(value){
  this.empty = false
  this.value = value
}
