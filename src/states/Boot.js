export default class Boot {
  preload() {
    console.log("Boot -> preload");
    // Optionally load a loading bar or minimal assets
  }

  create() {
    console.log("Boot -> create");
    this.state.start("Preload");
  }
}
