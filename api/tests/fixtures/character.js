class CharacterFixture{

  static valid(){
    return {
      id: 123,
      name: "Hulk",
      description: "Strong guy",
      thumbnail: {
        path: "testimage",
        extension: "jpg"
      }
    };
  }
}

module.exports = CharacterFixture;
