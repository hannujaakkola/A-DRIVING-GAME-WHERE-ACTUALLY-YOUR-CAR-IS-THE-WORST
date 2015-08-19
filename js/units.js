function copyObject(oldObject) {
  var newObject = {}
  for (var key in oldObject) {
    newObject[key] = oldObject[key]
  }

  return newObject
}

function createEnemy() {
  var enemy = copyObject(unit)
  enemy.speed = Math.random() * 4
  enemy.color = colors[Math.floor(Math.random() * 8)]
  enemy.lane = Math.floor(Math.random() * 5)

  return enemy
}

var unitSize = 2

var unit = {
  x : 0,
  y : screen.height,
  sizeX : 50,
  sizeY : 80,
  lane : 2,
  speed : 0,
  maxSpeed : 3,
  color : '#cc0000'
}
console.log(unit)
player = copyObject(unit)
player.camera = true
player.y = screen.height - 300

var colors = ['#0cc', '#0c0', '#00c']

var enemies = []

for (var i = 0; i < 10; i++) {
  enemies.push(createEnemy())
}

