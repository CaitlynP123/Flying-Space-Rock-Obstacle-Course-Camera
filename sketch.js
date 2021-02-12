var START = 1
var PLAY = 2
var END = 0
var gameState = START

var score = 0

var asteroid, asteroidImg
var space, spaceImg

var restart, restartImg
var gameOver, gameOverImg

var enemy, enemyImg, enemyGroup
var aliens, alien1, alien2, alien3, alien4, alienGroup
var edge1, edge2

var pebble, pebble1, pebble2, pebbleGroup
var planets, planet1, planet2, planet3, planetGroup

var dieSound, powerUpSound, enemySound

function preload() {

  spaceImg = loadImage("backdrop_space_game.png")
  asteroidImg = loadImage("asteroid_for_infinite_scrolling_game.png")

  enemyImg = loadImage("Enemy.png")

  alien1 = loadImage("alien_1.png")
  alien2 = loadImage("alien_2.png")
  alien3 = loadImage("alien_3.png")
  alien4 = loadImage("alien_4.png")

  pebble1 = loadImage("pebble_power-up.png")
  pebble2 = loadImage("pebble_power-up_2.png")

  planet1 = loadImage("planet_1.png")
  planet2 = loadImage("planet_2.png")
  planet3 = loadImage("planet_3.png")

  restartImg = loadImage("RESTART.png")

  gameOverImg = loadImage("game_over.png")
  
  dieSound = loadSound("die.mp3")
  powerUpSound = loadSound("jump.mp3")
  enemySound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 500)

  /*space = createSprite(displayWidth-40, 200)
  space.addImage("backdrop", spaceImg)*/

  edge1 = createSprite(0, 0, 600, 10)
  edge2 = createSprite(500, 1000, 600, 10)

  asteroid = createSprite(75, 250)
  asteroid.addImage("flyingSpaceRock", asteroidImg)
  asteroid.scale = 0.09
  //asteroid.debug = true
  asteroid.setCollider("circle", 0, 0, 300)

  restart = createSprite(300, 250)
  restart.addImage("restart", restartImg)
  restart.scale = 0.25

  gameOver = createSprite(300, 400)
  gameOver.addImage("game_over", gameOverImg)
  gameOver.scale = 0.5

  enemyGroup = createGroup()
  rocketsGroup = createGroup()
  alienGroup = createGroup()
  pebbleGroup = createGroup()
  planetGroup = createGroup()
}

function draw() {
  background("black")

  camera.position.x = width/2
  camera.position.y = asteroid.y
  
  edge1.visible = false
  edge2.visible = false
  
  asteroid.collide(edge1)
  asteroid.collide(edge2)

  if (gameState == PLAY) {
    restart.visible = false
    gameOver.visible = false
    
    
    asteroid.visible = true
 
    spawnEnemy()
    spawnAliens()
    spawnPowerUps()
    spawnPlanets()

    /*space.velocityX = -4
    if (space.x == 0) {
      space.x = space.width / 2
    }*/ 
    
    if (keyDown("w") || keyDown("up")) {
      asteroid.y = asteroid.y - 5
    }

    if (keyDown("s") || keyDown("down")) {
      asteroid.y = asteroid.y + 5

    }

    if (pebbleGroup.isTouching(asteroid)) {
      pebbleGroup.destroyEach()
      score = score + 5
      powerUpSound.play()
    }

    if (planetGroup.isTouching(asteroid)) {
      planetGroup.destroyEach()
      score = score + 100
      asteroid.scale = asteroid.scale + 0.05
      powerUpSound.play()
    }

    if (alienGroup.isTouching(asteroid)) {
      alienGroup.destroyEach()
      score = score - 25
      asteroid.scale = 0.09
      enemySound.play()
    }

    if (enemyGroup.isTouching(asteroid)) {
      enemyGroup.destroyEach()
      score = score - 75
      asteroid.scale = 0.09
      enemySound.play()
    }

    if (score < 0) {
      gameState = END
      dieSound.play()
    }

  }

  if (gameState == END) {
    reset()
    if (mousePressedOver(restart) || mousePressedOver(gameOver)) {
      gameState = START
    }
  }
  drawSprites()

  stroke("darkblue")
  textSize(17)
  fill("white")
  text("Score:" + score, 25, 475)

  if (gameState == START) {

    score = 0
    
    restart.visible = false
    gameOver.visible = false
    
    //space.velocityX = 0

    asteroid.visible = false

    textSize(15)
    stroke("blue")
    fill("white")
    text("USE UP AND DOWN ARROW KEYS TO MOVE, OR W AND S", 90, 25)

    textSize(22.5)
    stroke("white")
    fill("white")
    text("HELLO THERE MIGHTY ASTEROID ", 100, 150)
    text("YOU HAVE BEEN CHOSEN FOR A MISSION", 50, 175)
    text("YOU MUST FIND AS MANY PLANETS AS YOU CAN", 25, 200)
    text("USE SPECIAL KEYS TO AID YOU IN THIS MISSION", 25, 225)
    text("GOOD LUCK AND GODSPEED", 130, 250)
    text("BEWARE TRICKY ALIENS AND SPACHESHIPS", 25, 275)
    text("THERE ARE PEBBLES & MORE THAT CAN HELP YOU", 10, 300)

    textSize(15)
    stroke("blue")
    fill("white")
    text("Press space to continue", 220, 325)

    if (keyDown("space")) {
      gameState = PLAY
    }
  }
}

function spawnEnemy() {
  if (frameCount % 1000 == 0) {
    enemy = createSprite(725, Math.round(random(100, 400)))
    enemy.addImage("spaceship", enemyImg)
    enemy.scale = 0.2
    enemy.velocityX = -5
    enemy.velocityY = -5

    enemyGroup.add(enemy)
  }

  enemyGroup.bounceOff(edge1)
  enemyGroup.bounceOff(edge2)
}

function spawnAliens() {
  if (frameCount % 100 == 0) {
    aliens = createSprite(625, Math.round(random(75, 425)))
    aliens.velocityX = -8

    var rand = Math.round(random(1, 4))
    switch (rand) {
      case 1:
        aliens.addImage("1", alien1)
        aliens.scale = 0.125
        aliens.setCollider("rectangle", 0, 0, 550, 675)
        break
      case 2:
        aliens.addImage("2", alien2)
        aliens.scale = 0.15
        aliens.setCollider("rectangle", 0, 0, 325, 600)
        break
      case 3:
        aliens.addImage("3", alien3)
        aliens.scale = 0.225
        aliens.setCollider("rectangle", 0, 0, 200, 500)
        break
      case 4:
        aliens.addImage("4", alien4)
        aliens.scale = 0.125
        aliens.setCollider("rectangle", 0, 0, 400, 940)
        break
    }
    aliens.lifetime = 300
    //aliens.debug = true
    alienGroup.add(aliens)
  }
}

function spawnPowerUps() {
  if (frameCount % 200 == 0) {
    pebble = createSprite(600, Math.round(random(20, 480)))
    pebble.velocityX = -(8)
    var r_1 = Math.round(random(1, 2))
    switch (r_1) {
      case 1:
        pebble.addImage("single", pebble1)
        pebble.scale = 0.025
        break
      case 2:
        pebble.addImage("multiple", pebble2)
        pebble.scale = 0.125
    }

    pebble.lifetime = 300

    pebbleGroup.add(pebble)
  }
}

function spawnPlanets() {
  if (frameCount % 450 == 0) {
    planets = createSprite(700, Math.round(random(100, 400)))
    planets.velocityX = -8

    var r = Math.round(random(1, 3))
    switch (r) {
      case 1:
        planets.addImage("blue", planet1)
        planets.scale = 0.21
        planets.setCollider("circle", 0, 0, 290)
        break
      case 2:
        planets.addImage("blue", planet2)
        planets.scale = 0.21
        planets.setCollider("circle", 0, 0, 300)
        break
      case 3:
        planets.addImage("blue", planet3)
        planets.scale = 0.25
        planets.setCollider("circle", 0, 0, 200)
        break

    }

    planets.lifetime = 300
    planetGroup.add(planets)
    planets.debug = true

  }
}
  
function reset(){
    asteroid.visible = false
    asteroid.x = 75
    asteroid.y = 250
  
    enemyGroup.destroyEach()
    alienGroup.destroyEach()
    planetGroup.destroyEach()
    pebbleGroup.destroyEach()

    restart.visible = true
    gameOver.visible = true
}