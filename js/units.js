function copyObject(oldObject) {
  var newObject = {}
  for (var key in oldObject) {
    newObject[key] = oldObject[key]
  }

  return newObject
}

var previousLane
function createEnemy() {
  var enemy = copyObject(unit)
  enemy.color = colors[Math.floor(Math.random() * colors.length)]
  
  do {
    enemy.lane = Math.floor(Math.random() * 5) + 1
  } while (enemy.lane === previousLane)
  previousLane = enemy.lane
  
  enemy.y += Math.random() * 200
  enemy.x = lanes[enemy.lane]
  enemy.speed = Math.random() * (12 - enemy.lane * 3) + 8

  enemies[enemy.lane].push(enemy)
}

var unitSize = 2

var unit = {
  x : lanes[6],
  y : 500,
  sizeX : 60,
  sizeY : 80,
  lane : false,
  speed : 0,
  maxSpeed : 4,
  car : 'basic'
}

console.log(unit)
player = copyObject(unit)
player.car = 'player'
player.lane = 6
player.camera = true
player.color = '#B38A51'
player.y = 250
player.sizeY = 60
