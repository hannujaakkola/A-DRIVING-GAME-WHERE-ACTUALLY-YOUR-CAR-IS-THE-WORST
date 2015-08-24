function renderRect(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
  var path = new Path2D()
  path.moveTo(x1, y1)
  path.lineTo(x2, y2)
  path.lineTo(x3, y3)
  path.lineTo(x4, y4)

  ctx.fill(path)
}

function drawSprite(unit, size) {
  ctx.fillStyle = unit.color
  ctx.fillRect(unit.x, unit.y, unit.sizeX, unit.sizeY)

  ctx.fillStyle = '#000'
  ctx.fillRect(unit.x, unit.y + unit.sizeY / 3, unit.sizeX, unit.sizeY / 2)
}

function updatePosition(unit) {
  if (!unit.camera) {
    unit.y -= unit.speed - player.speed
  }

  // unit.x = lanes[unit.lane]
  if (unit.x < lanes[unit.lane]) {
    unit.x += 10
  } else if (unit.x > lanes[unit.lane]) {
    unit.x -= 10
  }

  drawSprite(unit)
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
    player.speed += player.maxSpeed / 10
  } else if (e.keyCode == 40) {
    // down
    player.speed -= player.maxSpeed / 10
  }
}

var grass = document.getElementById('grass')
grass.style.top = -100
var grassTop

var enemies = []

function render() {
  grassTop = parseInt(grass.style.top, 10) + player.speed * 2
  if (grassTop > -50) {
    grassTop -= 50;
  }
  grass.style.top = grassTop

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.speed = Math.max(player.speed, 0)
  updatePosition(player)

  if (enemies.length < 5) {
    enemies.push(createEnemy())
  }

  enemies.forEach(function(enemy, index) {
    updatePosition(enemy)

    if (enemy.y + enemy.sizeY < 0) {
      enemies.splice(index, 1)
    }
  })
}

(function animloop(){
  window.requestAnimationFrame(animloop);
  render();
})();
  // render();


