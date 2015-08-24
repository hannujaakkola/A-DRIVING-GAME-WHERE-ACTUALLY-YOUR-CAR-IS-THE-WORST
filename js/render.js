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
