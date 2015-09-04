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


document.onkeydown = function(e) {
  if (e.keyCode == 37 && player.lane > 0) {
    // left
    player.lane--
  } else if (e.keyCode == 39 && player.lane < 6) {
    // right
    player.lane++ 
  }

  if (e.keyCode == 38 && player.speed < player.maxSpeed) {
    // up
    playerThrottle = player.maxSpeed / 200
  } else if (e.keyCode == 40) {
    // down
    player.speed -= player.maxSpeed / 20
  }
}

document.onkeyup = function(e) {
  if (e.keyCode == 38) {
    playerThrottle = -0.01
  }
}

var grass = document.getElementById('grass')
grass.style.top = -100
var grassTop

var enemyInterval = window.setInterval(function() {
  if (enemiesToCreate) {
    createEnemy()
    enemiesToCreate--
  } else {
    clearInterval(enemyInterval)
  }
}, 2000)

function render() {
  grassTop = parseInt(grass.style.top, 10) + player.speed * 3
  if (grassTop > -50) {
    grassTop -= 50;
  }
  grass.style.top = grassTop

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if ((player.lane === 0 || player.lane === 6) && player.speed > 1) {
    if (distance > 5) {
      distance -= 5
    }

    player.speed *= .95    
  } else {
    player.speed += playerThrottle
  }

  player.speed = Math.min(player.maxSpeed, player.speed)
  player.speed = Math.max(0, player.speed)
  updatePosition(player)
  
  distance += player.speed
  speed.innerHTML = player.speed
  score.innerHTML = Math.round(distance)

  if (player.maxSpeed > .5) {
    player.maxSpeed -= .0003
  }

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

      updatePosition(enemy)

      // collision detection
      if (player.lane === lane
      && enemy.y < 320
      && enemy.y + enemy.sizeY > 255) {
      // && (enemy.x < player.x + player.sizeX || enemy.x + enemy.sizeX < player.x)) {
        console.log('kill')
        // window.cancelAnimationFrame(gameloop)
      }

      // kill the enemy if it goes away from the screen
      if (enemy.y + enemy.sizeY < 0) {
        enemies[lane].splice(i, 1)
        createEnemy()
      }
    }
  }
}

(function animloop(){
  gameloop = window.requestAnimationFrame(animloop);
  render();
})();
  // render();


