const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const blockW = 1200
const blockH = 100

function renderRect(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
  var path = new Path2D()
  path.moveTo(x1, y1)
  path.lineTo(x2, y2)
  path.lineTo(x3, y3)
  path.lineTo(x4, y4)

  ctx.fill(path)
}

var colors = {
  1 : '#000',
  2 : '#fff',
  3 : '#00f'
}
console.log(colors)

var lanes = [80, 160, 240, 320, 400]

function drawSprite(unit, size) {
  ctx.fillStyle = unit.color
  ctx.fillRect(unit.x, unit.y, unit.sizeX, unit.sizeY)

  ctx.fillStyle = '#000'
  ctx.fillRect(unit.x, unit.y + unit.sizeY / 3, unit.sizeX, unit.sizeY / 2)

  ctx.fillStyle = '#0f0'
  ctx.fillRect(unit.x, unit.y, 1, 1)
}

function updatePosition(unit) {
  if (!unit.camera) {
    unit.y -= unit.speed
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
  switch (e.keyCode) {
    // left
    case 37:
      if (player.lane > 0) {
        player.lane--
      }
      break
    // right
    case 39:
      if (player.lane < lanes.length-1) {
        player.lane++
      }
      break
    // up
    case 38:
      if (player.speed < player.maxSpeed) {
        player.speed += player.maxSpeed / 5
      }
      break
    // down
    case 40:
      player.speed -= player.maxSpeed / 10
      player.speed = Math.max(player.speed, 0)
      break
  }

}

var grass = document.getElementById('grass')
grass.style.top = -100
var grassTop

function render() {
  grassTop = parseInt(grass.style.top, 10) + player.speed * 2
  if (grassTop > -50) {
    grassTop -= 50;
  }
  grass.style.top = grassTop

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  updatePosition(player)

  enemies.forEach(function(enemy) {
    updatePosition(enemy)
  })
}

(function animloop(){
  window.requestAnimationFrame(animloop);
  render();
})();
  render();


