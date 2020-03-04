let imgPre, imgInput, arrow, colorInput, canvas, reader

function init() {
  imgPre = document.querySelector('#img-pre')
  imgOut = document.querySelector('#img-cutted')
  imgInput = document.querySelector('#img-input')
  arrow = document.querySelector('.arrow-right')
  colorInput = document.querySelectorAll('.color-input')
  canvas = document.querySelector('#img-canvas')
  reader = new FileReader()

  reader.addEventListener("load", function () {
    imgPre.src = reader.result
    arrow.style = 'display: visible;'
  }, false)
}

function onPreImageUpload() {
  const file = imgInput.files[0]
  file && reader.readAsDataURL(file)
}

function onArrowClick() {
  const colors = sortColors(Array.prototype.map.call(colorInput, item => (Number(item.value) || 255)))
  canvas.setAttribute('width', imgPre.width)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(imgPre, 0, 0, imgPre.width, imgPre.height)

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < imgData.data.length / 4; i++) {
    let r = imgData.data[i * 4 + 0]
    let g = imgData.data[i * 4 + 1]
    let b = imgData.data[i * 4 + 2]

    if (r >= colors[0] && r <= colors[1] && g >= colors[2] && g <= colors[3] && b >= colors[4] && b <= colors[5]) {
      imgData.data[i * 4 + 3] = 0
    }
  }
  ctx.putImageData(imgData, 0, 0)
  imgOut.src = canvas.toDataURL()
}

function sortColors(colors) {
  for (let i = 0; i < 6; i += 2) {
    if (colors[i] > colors[i + 1]) {
      [colors[i], colors[i + 1]] = [colors[i + 1], colors[i]]
    }
  }
  return colors
}

document.addEventListener('DOMContentLoaded', () => init())