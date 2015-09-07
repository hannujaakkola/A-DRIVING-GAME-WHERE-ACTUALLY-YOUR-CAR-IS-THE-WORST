function renderRect(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
  var path = new Path2D()
  path.moveTo(x1, y1)
  path.lineTo(x2, y2)
  path.lineTo(x3, y3)
  path.lineTo(x4, y4)

  ctx.fill(path)
}

var drawCar = {
  player: function(unit, size, color) {
    ctx.fillRect(unit.x, unit.y + 15, unit.sizeX, 45)

    ctx.fillStyle = color
    ctx.fillRect(unit.x + 2.5, unit.y + 30, unit.sizeX - 5, 20)
  },
  sport: function(unit, size, color) {
    ctx.fillRect(unit.x, unit.y + 20, unit.sizeX, 40)

    ctx.fillStyle = color
    ctx.fillRect(unit.x + 5, unit.y + 40, unit.sizeX - 10, 25)
  },
  sedan: function(unit, size, color) {
    ctx.fillRect(unit.x, unit.y + 25, unit.sizeX, 40)

    ctx.fillStyle = color
    ctx.fillRect(unit.x + 2.5, unit.y + 40, unit.sizeX - 5, 20)
  },
  wagon: function(unit, size, color) {
    ctx.fillRect(unit.x, unit.y + 25, unit.sizeX, 60)

    ctx.fillStyle = color
    ctx.fillRect(unit.x + 2.5, unit.y + 40, unit.sizeX - 5, 45)
  },
  van: function(unit, size, color) {
    ctx.fillRect(unit.x, unit.y + 10, unit.sizeX, 25)

    ctx.fillStyle = color
    ctx.fillRect(unit.x + 2.5, unit.y + 20, unit.sizeX - 5, 20)
  },
}

function drawSprite(unit, size) {
  ctx.fillStyle = unit.color
  ctx.fillRect(unit.x, unit.y, unit.sizeX, unit.sizeY)

  ctx.fillStyle = '#222'
  drawCar[unit.car](unit, size, unit.color)
}
