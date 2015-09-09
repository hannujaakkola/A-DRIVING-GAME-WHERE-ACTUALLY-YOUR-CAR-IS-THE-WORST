var playerThrottle = 0

function updatePosition(unit) {
  if (!unit.camera) {
    unit.y -= unit.speed - player.speed
  }

  if (unit.x < lanes[unit.lane]) {
    unit.x += 10
  } else if (unit.x > lanes[unit.lane]) {
    unit.x -= 10
  }

  drawSprite(unit)

  return unit
}

var started
var gameOver = false
document.onkeydown = function(e) {
  if (!started) {
    start()
    started = true
    message.style.display = 'none'
  } else if (gameOver) {
    newGame()
    gameOver = false
  }

  if (e.keyCode == 37 && player.lane > 0) {
    // left
    player.lane--
  } else if (e.keyCode == 39 && player.lane < 6) {
    // right
    player.lane++ 
  }

  if (e.keyCode == 38 && player.speed < player.maxSpeed) {
    // up
    playerThrottle = player.maxSpeed / 60
  } else if (e.keyCode == 40) {
    // down
    player.speed -= player.maxSpeed / 20
  }
}

document.onkeyup = function(e) {
  if (e.keyCode == 38) {
    playerThrottle = 0
  }
}

var grass = document.getElementById('grass')
grass.style.top = -100
var grassTop

function render() {
  grassTop = parseInt(grass.style.top, 10) + player.speed * 3
  if (grassTop > -50) {
    grassTop -= 50;
  }
  grass.style.top = grassTop

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if ((player.lane === 0 || player.lane === 6) && player.speed > 1) {
    // if (distance > 5) {
    //   distance -= 1
    // }

    player.speed *= .95    

    player.maxSpeed -= player.speed / 200
  }

  if (playerThrottle) {
    player.speed += playerThrottle - Math.random() / 10

    if (player.maxSpeed > .5) {
      player.maxSpeed -= .0005
    }
  } else {
    player.speed -= .01
  }

  player.speed = Math.min(player.maxSpeed, player.speed)
  player.speed = Math.max(0, player.speed)
  updatePosition(player)
    
  distance += player.speed / 5

  var distanceString = String(Math.round(distance))
  var zeroes = ''
  for (var i = 6; i > distanceString.length; i--) {
    zeroes += '0'
  }

  score.innerHTML = zeroes + distanceString

  ctx.beginPath();
  ctx.moveTo(100, 400);
  ctx.lineTo(100 - Math.cos(player.speed - .25) * 40, 400 - Math.sin(player.speed - .25) * 40);
  ctx.stroke();

  for (lane = 5; lane >= 1; lane--) {
    for (i = enemies[lane].length - 1; i >= 0; i--) {
      var enemy = enemies[lane][i]

      if (enemies[lane][i-1] && enemy.y - enemies[lane][i-1].y < 100) {
        if (enemy.x === lanes[lane-1]) {
          enemies[lane].splice(i, 1)
          enemies[lane-1].push(enemy)
          enemies[lane-1].sort(function(a, b) {
            return a.y - b.y
          }) 
        } else if (enemy.x === lanes[1]) {
          enemy.speed -= enemy.speed - enemies[lane][i-1].speed
        } else if (enemy.lane === lane) {
          enemy.lane--
        }
      }

      // if (enemy.lane === 1 && enemy.speed < 10) {
      //   enemy.lane++
      // }

      updatePosition(enemy)

      // collision detection
      if (player.lane === lane
      && enemy.y < 260
      && enemy.y + enemy.sizeY > 205) {
      // && (enemy.x < player.x + player.sizeX || enemy.x + enemy.sizeX < player.x)) {
        console.log(player.x, player.y)
        console.log(enemy.x, enemy.y)
        window.cancelAnimationFrame(gameloop)
        message.innerHTML = 'OH NO!<br>YOU CRASHED!<br><br>YOU DROVE ' + Math.round(distance) + ' METERS'
        message.style.display = 'block'
        window.setTimeout(function() {
          message.innerHTML += '<br><br>press any key to play again'
          gameOver = true
        }, 500)
      }

      // kill the enemy if it goes away from the screen
      if (enemy.y + enemy.sizeY < 0) {
        enemies[lane].splice(i, 1)
        createEnemy()
      }
    }
  }
}

function start() {
  (function animloop(){
    gameloop = window.requestAnimationFrame(animloop)
    render()
  })()
}

function newGame() {
  message.innerHTML = 'A DRIVING GAME WHERE ACTUALLY YOUR CAR IS THE WORST<br><br><br>use arrow keys to drive'
  started = false
  distance = 0
  unitInit()

  render()
}

newGame()
