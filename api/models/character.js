class Character{

  constructor(params){
    this._id = params._id;
    this.characterId = params.characterId;
    this.name = params.name;
    this.description = params.description;
    this.imageUrl = params.imageUrl;
  }
}

module.exports = Character;
