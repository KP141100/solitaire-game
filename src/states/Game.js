export default class Game { //export or defines a 'Game' class that contains all logic
  constructor() { // initializes variables for game phases, score, elements and card management
    this.score = 95000;//game starts with score of 95000
    this.displayedScore = 95000; //for smooth animation of score
    this.timerStarted = false;//tracks whether timer has started or not
    this.hand = null;//hand is the pointer sprite 
    this.handFrameIndex = 0;//handFrameIndex tracks its current frame
    this.fullFlow = ["diamonds8", "heart7", "clubs6", "wildCard","heart3", "spades2_left", "diamondsA", "spades2_right"];//flow of cards that needs to be followed by the player 
    this.handStep = 0;//tracks current index in fullFlow
    this.counter = 10;//countdown from 10 seconds
    this.timerText = null;//text showing countdown
    this.bomb = null;//bomb image that fades on timeOut
    this.timerEvent = null;//timerloop reference for clearing
    this.flippedCards = new Set();//Track flipped card
    this.streakIcons = [];//to hold references to overlay 4 icons
    this.cardSprites = {}; //stores references to all card sprites
  }

  create() { // initializes everything
    const centerX = this.world.centerX;//calculates horizontal center of the screen
    this.add.sprite(0, 0, "background").scale.setTo(0.72);//add the background image for game
    
    // UI Elements
    // LOGO
    //adds logo at top
    const logo = this.add.sprite(centerX - 85, 20, "logo");
    logo.scale.setTo(0.6);

    // SCOREPANEL
    //add scorepanel on left
    const scorePanel = this.add.sprite(30, 100, "hudPanel");
    scorePanel.scale.setTo(0.6);
    scorePanel.anchor.set(0, 0);

    const panelWidth = scorePanel.width;
    const panelHeight = scorePanel.height;
    //add the scoetext at the center of the scorepanel
    this.scoreText = this.add.text(0, 0, this.displayedScore.toLocaleString(), { 
      font: "24px Arial",
      fill: "#FFA500"
    });
    this.scoreText.anchor.set(0.5);
    this.scoreText.x =  scorePanel.x + panelWidth / 2;
    this.scoreText.y =  scorePanel.y + panelHeight / 2;

    // STREAK METER
    const streak = this.add.sprite(centerX + 155, 100, "hudStreak");
    streak.scale.setTo(0.65);
    // Add 4 overlay icon placeholders (invisible initially)
    const iconSpacing = 35 // Adjust based on your asset layout
    const startX = streak.x + 36.5; // Adjust these offsets if icons don't align perfectly
    const startY = streak.y + 27;

    const iconPositions = [
      { x: startX, y: startY },       // 1st icon
      { x: startX + iconSpacing, y: startY }, // 2nd icon
      { x: startX + iconSpacing * 2, y: startY }, // 3rd icon
      { x: startX + iconSpacing * 3, y: startY }  // 4th icon
    ];

    iconPositions.forEach(pos => {
    const icon = this.add.sprite(pos.x, pos.y, null); // empty at start
    icon.anchor.set(0.5);
    icon.scale.setTo(0.5);
    icon.visible = false;
    this.streakIcons.push(icon); // store reference
    });

    // TOP CARDS
    const topCards = [
      { key: "heart3",   x:centerX - 90, y: 240, angle: 14},
      { key: "wildCard", x:centerX,       y: 250, angle: 0 },
      { key: "diamondsA", x:centerX + 90, y: 240, angle: -14},
    ];
    topCards.forEach(card => this.addCard(card.key, card.x, card.y, card.angle));//adds card using the coordinates and angles

    // PHASE 2 CARDS
    const phase2 = [
      { key: "spades2_left",   x: centerX - 140, y: 440, angle: 15 },
      { key: "spades2_right",   x: centerX + 140, y: 440, angle: -15 }
    ];
    phase2.forEach(card => this.addCard(card.key, card.x, card.y, card.angle));//adds cards using coordinates and angles

    //PHASE 1 CARDS
    const phase1Fronts = [
      { key: "diamonds8", x: centerX - 115, y: 340, angle: 15 },
      { key: "heart7",    x: centerX,       y: 355, angle:  0 },
      { key: "clubs6",    x: centerX + 115, y: 340, angle: -15 }
    ];
    phase1Fronts.forEach(card => this.addCard(card.key, card.x, card.y, card.angle));//adds card using the coordinates and angles

    // BOMB ICON
    //adds bomb icon
    this.bomb = this.add.sprite(centerX + 40, 410, "000");
    this.bomb.anchor.set(0.5);
    this.bomb.scale.setTo(0.4);

    this.bombFrames = ["000", "001", "002"];
    this.bombFrameIndex = 0;

    this.bombAnimationLoop = this.game.time.events.loop(200, () => {
      this.bombFrameIndex = (this.bombFrameIndex + 1) % this.bombFrames.length;
      const nextFrameKey = this.bombFrames[this.bombFrameIndex];

      if (this.bomb && this.bomb.alive && this.cache.checkImageKey(nextFrameKey)) {
        this.bomb.loadTexture(nextFrameKey);
      } else {
        console.warn("Bomb missing or frame not found in cache:", nextFrameKey);
      }  
    });

    // TIMER
    //adds timer text to represent the countdown 
    this.timerText = this.add.text(this.bomb.x , this.bomb.y + 8, "10", {
      font: " bold 24px Courier",
      fill: "#FFFFFF",  
    });
    this.timerText.anchor.set(0.5);
    this.timerText.visible = true;

    //RED OUTLINE BOX
    const talonOutline = this.add.sprite(centerX, 570,"talon" );
    talonOutline.anchor.set(0.5);
    talonOutline.scale.setTo(0.6);

    // ACTIVE CARD
    this.activeCard = this.add.sprite(centerX, 570, "heart7");
    this.activeCard.anchor.set(0.5);
    this.activeCard.scale.setTo(0.27);

    // PHASE FLOWS
    this.phase1Flow1 = ["diamonds8", "heart7", "clubs6"];
    this.phase1Flow2 = ["spades2_left", "spades2_right"];
    
    // INPUT SETUP AFTER ALL CARDS ADDED
    this.setCardInput();

    // HAND POINTER
    this.hand = this.add.sprite(0, 0, "h000");
    this.hand.anchor.set(0.5);
    this.hand.scale.setTo(0.3);

    // Animate hand frames
    this.handAnimationLoop = this.game.time.events.loop (120, () => {
      if (!this.hand || !this.hand.exists || !this.hand.alive) return;
      this.handFrameIndex = (this.handFrameIndex + 1) % 11;
      const frameKey = `h${this.handFrameIndex.toString().padStart(3, '0')}`;
      if (this.cache.checkImageKey(frameKey)) {
        this.hand.loadTexture(frameKey);
      } else {
        console.warn("Missing frame:", frameKey);
      }
    }, this);
    //moves hand to the card in fullFlow
    this.moveHandToNextInFlow();

    // MUSIC
    this.music = this.add.audio("bgMusic");
    this.music.loop = true;
    this.music.play(); 
  }

  moveHandToNextInFlow() { //move hand to first card according to fullFlow
      const nextKey = this.fullFlow[this.handStep];
      console.log("Moving to next in flow:", nextKey, "handStep:", this.handStep);
      if (!nextKey) return;//stop if there is no next card

      this.revealNextCard(nextKey);

      this.game.time.events.add(300, () => {//wait 300ms then move the hand pointer to next card
      this.moveHandToCard(nextKey);
      }, this);
 }
  //add card on the screen at a given position with angle
  addCard(key, x, y, angle = 0) {
    const sprite = this.add.sprite(x, y, key);
    sprite.anchor.set(0.5);
    sprite.angle = angle;
    sprite.scale.setTo(0.4);

    const shouldBeVisible = ['diamonds8', 'heart7', 'clubs6', 'wildCard'].includes(key);//cards which have their front face shown up
    sprite.visible = shouldBeVisible;
    //hides the actual card by replacing it with a cardback
    if (!shouldBeVisible) { 
      sprite._trueKey = key;
      sprite.loadTexture("cardBack");
      sprite.key = "cardBack";
    } 
      sprite.visible = true;
      sprite.inputEnabled = true;
      sprite.input.useHandCursor = true;
      //save the sprite or image by its name
      this.cardSprites[key] = sprite;
  }
  // makes each card interactive by adding click to each card so that handleCardClick() runs when clciked
  setCardInput() {
    this.fullFlow.forEach(key => {
      const card = this.cardSprites[key];
      if (card) {
        card.events.onInputDown.add(() => this.handleCardClick(key), this);
      }
    });
  }

  handleCardClick(key) { //triggered when a card id clciked
    const expectedKey = this.fullFlow[this.handStep];

    if (key !== expectedKey) { //ignore unsuitable or incorrect click
      console.log(`Wrong card clicked. Expected: ${expectedKey}`);

      const wrongCard = this.cardSprites[key];
      if (wrongCard) {
        const originalAngle = wrongCard.angle;
        this.game.add.tween(wrongCard)
          .to({ angle: originalAngle - 10}, 50)
          .to({ angle: originalAngle + 10}, 50)
          .to({ angle: originalAngle - 5}, 50)
          .to({ angle: originalAngle + 5}, 50)
          .to({ angle: originalAngle}, 50)
          .start();
      }
      return;
    }
    const clickedCard = this.cardSprites[key];

    const jumpUpTween = this.game.add.tween(clickedCard).to({y: clickedCard.y - 40}, 150, Phaser.Easing.Quadratic.Out);
    //spin+move
    const moveDownAndRotate = this.game.add.tween(clickedCard).to({
      x: this.activeCard.x,
      y: this.activeCard.y,
      angle: 360
    }, 350, Phaser.Easing.Quadratic.In);

    //chain the tweens
    jumpUpTween.chain(moveDownAndRotate);
    jumpUpTween.start();
    
    //On complete: update activeCard and cleanup
    moveDownAndRotate.onComplete.add(() => {
      clickedCard.destroy();
      this.activeCard.loadTexture(key);
      this.updateScore();

      if (key === "diamonds8" && !this.timerStarted) {
        this.timerStarted = true;
        this.startCountdown();
      }

      if (key === "heart7" && this.timerEvent) {
        this.game.time.events.remove(this.timerEvent);
        if (this.timerText) this.timerText.visible = false;
        if (this.bomb) {
          this.bomb.destroy();
          this.bomb = null;
        }
        if (this.bombAnimationLoop) {
          this.game.time.events.remove(this.bombAnimationLoop);
          this.bombAnimationLoop = null;
        }
      }

      if (key === "diamonds8") {
        this.revealNextCard("spades2_left");
      }
      if (key === "clubs6") {
        this.revealNextCard("spades2_right");
      }
      if (key === "wildCard") {
        this.revealNextCard("heart3");
        this.revealNextCard("diamondsA");
      }

      console.log("Card clicked:", key, "| Next handStep:", this.handStep + 1);

      this.handStep++;
      // ✅ Update streak meter icons
      if (key === "heart3") {
        this.showStreakIcon(0, "hudRed"); // yellow overlay
      }
      if (key === "spades2_left") {
        this.showStreakIcon(1, "hudBlack"); // purple overlay
      }
      if (key === "diamondsA") {
        this.showStreakIcon(2, "hudRed"); // yellow overlay
      }
      if (key === "spades2_right") {
        this.showStreakIcon(3, "hudBlack"); // purple overlay
      }

      //ends the game once all cards are completed
      if (this.handStep >= this.fullFlow.length) {
        console.log("All cards completed! Game over.");
      //Make the hand disappear
      if (this.hand) {
        this.hand.visible = false;
        this.hand.destroy();
        this.hand = null;
      }
        if (this.handAnimationLoop) {
          this.game.time.events.remove(this.handAnimationLoop);
          this.handAnimationLoop = null;
        }
        return;
      }
      //moves the hand pointer to next card after 300ms
      this.game.time.events.add(300, () => {
        this.moveHandToNextInFlow();
        }, this);
      }, this);
    }

  // update score by 1000
  updateScore() {
    const targetScore = this.score + 1000;
    this.score = targetScore;
    //increase score gradually
    this.game.time.events.loop(Phaser.Timer.SECOND / 60, () => {
      if (this.displayedScore < this.score) {
        this.displayedScore += 25; //+25 means it takes, 40 frames to reach the next 1000
        if (this.displayedScore > this.score) {
          this.displayedScore = this.score;
        }
        this.scoreText.text = Math.floor(this.displayedScore).toLocaleString(); //Math.floor(..) ensures clean display of the integers //toLocaleString() formats it with commas, e.g, 95,200
      }
    }, this);
  }
  // countdown for bomb
  startCountdown() {
    this.timerText.visible = true;
    this.timerText.text = this.counter.toString();
    this.timerEvent = this.game.time.events.loop(Phaser.Timer.SECOND, () => {
      this.counter--;
      if(this.counter >= 0) {
        this.timerText.text = this.counter.toString();
      }
      
      if(this.counter <= 0) {
        this.game.time.events.remove(this.timerEvent);
      }
    }, this);
  }

  //moves pointer to card
  moveHandToCard(cardKey) {
    const targetCard = this.cardSprites[cardKey];
    console.log("MOving hand to:", cardKey, targetCard);
    if (!targetCard) return; /*{
      console.warn(`cannot move hand - card '${cardKey}'not found or not visible yet.`);
      return;
    }*/
    //places the hand below the card
    this.hand.x = targetCard.x + 10;
    this.hand.y = targetCard.y + 60;
  }

  //Flips or reveal the card 
  revealNextCard(cardKey) {
    //prevent duplicate flips
    if (this.flippedCards.has(cardKey)) return;
    const card = this.cardSprites[cardKey];
    if (card) {
      //flip card by loading the real texture
      if (card._trueKey) {
        card.loadTexture(card._trueKey);
      }
      card.visible = true;
      card.inputEnabled = true;
      card.input.useHandCursor = true;
      //mark this card as flipped
      this.flippedCards.add(cardKey);
      //adds a quick flip animation
      const flipKeys = ['heart3', 'spades2_left', 'diamondsA', 'spades2_right'];
      if (flipKeys.includes(cardKey)) {
        this.game.add.tween(card.scale).from({ x: 0}, 200, Phaser.Easing.Linear.None, true);
      }
    } else {
      console.warn(`Tried to reveal missing card: ${cardKey}`);
    }
 }
 showStreakIcon(position, key) {
  const icon = this.streakIcons[position];
  if (icon) {
    icon.loadTexture(key);
    icon.visible = true;
  }
}
}
