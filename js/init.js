var canvas = document.getElementById('canvas')

canvas.width = 800
canvas.height = 500

var ctx = canvas.getContext('2d')

var blockW = 1200
var blockH = 100

var score = document.getElementById('score')
var speed = document.getElementById('speed')
var distance = 0


// margin 200px + lane 80px + border 2px + car margin 10px
var lanes = [132, 212, 292, 372, 452, 532, 612]
var colors = ['#2ee', '#2e2', '#22e', '#ee2', '#e22', '#e2e',]

// array for every lane
var enemies = [
  0, [], [], [], [], []
]
var enemiesToCreate = 5
