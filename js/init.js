const canvas = document.getElementById('canvas')

canvas.width = 800
canvas.height = 500

const ctx = canvas.getContext('2d')

const blockW = 1200
const blockH = 100

// margin 200px + lane 80px + border 2px + car margin 10px
var lanes = [212, 292, 372, 452, 532]
var colors = ['#0cc', '#0c0', '#00c']
