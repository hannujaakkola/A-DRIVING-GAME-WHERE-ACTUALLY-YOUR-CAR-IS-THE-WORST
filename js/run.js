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
  } else if (e.keyCode == 39) {
    // right
    player.lane++ 
  }

  if (e.keyCode == 38 && player.speed < player.maxSpeed) {
    // up
    playerThrottle = player.maxSpeed / 10
  } else if (e.keyCode == 40) {
    // down
    player.speed -= player.maxSpeed / 10
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
}, 1000)

function render() {
  grassTop = parseInt(grass.style.top, 10) + player.speed * 2
  if (grassTop > -50) {
    grassTop -= 50;
  }
  grass.style.top = grassTop

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.speed += playerThrottle
  player.speed = Math.min(player.maxSpeed, player.speed)
  player.speed = Math.max(0, player.speed)
  updatePosition(player)

  enemies.forEach(function(enemiesInLane, lane) {
    enemiesInLane.forEach(function(enemy, index) {
      if (enemies[lane][index-1] && enemy.y - enemies[lane][index-1].y < 100) {
        if (enemy.x === lanes[lane-1]) {
          enemies[lane].splice(index, 1)
          enemies[lane-1].push(enemy)
          enemies[lane-1].sort(function(a, b) {
            return a.y - b.y
          }) 
        } else if (enemy.x === lanes[0]) {
          enemy.speed -= enemy.speed - enemies[lane][index-1].speed
        } else if (enemy.lane === lane && enemy.speed > enemies[lane][index-1].speed) {
          enemy.lane--
        }
        // } else {
        // }
      }

      updatePosition(enemy)

      if (enemy.y + enemy.sizeY < 0) {
        enemies[lane].splice(index, 1)
        createEnemy()
      }
    })
  })
}

(function animloop(){
  window.requestAnimationFrame(animloop);
  render();
})();
  // render();


