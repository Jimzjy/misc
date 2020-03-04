let videoPre, canvasVideoAfter, videoInput, colorInput, videoWidth, videoHeight, canvasVideoAfterCtx

function init() {
  videoPre = document.querySelector('#video-pre')
  canvasVideoAfter = document.querySelector('#video-after')
  canvasVideoAfterCtx = canvasVideoAfter.getContext('2d')
  videoInput = document.querySelector('#video-input')
  colorInput = document.querySelectorAll('.color-input')

  const { width, height } = videoPre.getBoundingClientRect()
  videoWidth = width
  videoHeight = height
  videoPre.addEventListener('play', cutout)
}

function onUpload() {
  const file = videoInput.files[0]
  videoPre.src = URL.createObjectURL(file)
  const { width, height } = videoPre.getBoundingClientRect()
  videoWidth = width
  videoHeight = height
  canvasVideoAfter.setAttribute('width', width)
}

function cutout() {
  const colors = sortColors(Array.prototype.map.call(colorInput, item => (Number(item.value) || 0)))
  canvasVideoAfterCtx.drawImage(videoPre, 0, 0, videoWidth, videoHeight)

  const imgData = canvasVideoAfterCtx.getImageData(0, 0, videoWidth, videoHeight)
  for (let i = 0; i < imgData.data.length / 4; i++) {
    let r = imgData.data[i * 4 + 0]
    let g = imgData.data[i * 4 + 1]
    let b = imgData.data[i * 4 + 2]

    if (r >= colors[0] && r <= colors[1] && g >= colors[2] && g <= colors[3] && b >= colors[4] && b <= colors[5]) {
      imgData.data[i * 4 + 0] = 255
      imgData.data[i * 4 + 1] = 255
      imgData.data[i * 4 + 2] = 255
    }
  }
  canvasVideoAfterCtx.putImageData(imgData, 0, 0)
  setTimeout(cutout)
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