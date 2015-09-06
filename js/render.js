function renderRect(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
  var path = new Path2D()
  path.moveTo(x1, y1)
  path.lineTo(x2, y2)
  path.lineTo(x3, y3)
  path.lineTo(x4, y4)

  ctx.fill(path)
}

var drawCar = {
  player: function(unit, size) {
    // beginpath
    ctx.fillRect(unit.x, unit.y + 15, unit.sizeX, 15)
    ctx.fillRect(unit.x, unit.y + unit.sizeY - 10, unit.sizeX, 10)
  },
  basic: function(unit, size) {
    ctx.fillRect(unit.x, unit.y + 25, unit.sizeX, 20)
    ctx.fillRect(unit.x, unit.y + 65, unit.sizeX, 10)
  },
}

function drawSprite(unit, size) {
  ctx.fillStyle = unit.color
  ctx.fillRect(unit.x, unit.y, unit.sizeX, unit.sizeY)

  ctx.fillStyle = '#222'
  drawCar[unit.car](unit, size)
}
