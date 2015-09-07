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

  enemy.car = carPool[enemy.lane - Math.round(Math.random())]
  
  enemy.y += Math.random() * 200
  enemy.x = lanes[enemy.lane]
  enemy.speed = Math.random() * (12 - enemy.lane * 2) + cars[enemy.car].speed
  enemy.sizeY = cars[enemy.car].sizeY

  enemies[enemy.lane].push(enemy)
}

var cars = {
  'player': {
    speed: 4,
    sizeY: 70
  },
  'sport': {
    speed: 15,
    sizeY: 70
  },
  'sedan': {
    speed: 9,
    sizeY: 80
  },
  'wagon': {
    speed: 8,
    sizeY: 85
  },
  'truck': {
    speed: 5,
    sizeY: 100
  },
}

var carPool = ['sport', 'sedan', 'sedan', 'wagon', 'truck', 'wagon']

var unit = {
  y : 600,
  sizeX : 60,
  speed : 0,
}

function unitInit() {
  player = copyObject(unit)
  player.maxSpeed = 4
  player.car = 'player'
  player.lane = 6
  player.camera = true
  player.color = '#B38A51'
  player.x = lanes[6]
  player.y = 200
  player.sizeY = 55

  // array for every lane
  enemies = [
    0, [], [], [], [], []
  ]

  var enemiesToCreate = 5
  var enemyInterval = window.setInterval(function() {
    if (enemiesToCreate) {
      createEnemy()
      enemiesToCreate--
    } else {
      clearInterval(enemyInterval)
    }
  }, 2000)
}
