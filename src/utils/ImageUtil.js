const drawCanvasImage = (image,_callback) =>{
    const _self = this;
    const initSize = image.src.length;

    // 绘制图片
    let width = image.width
    let height = image.height
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下，大于500k则压缩
    debugger
    let ratio = width * height / 500000
    if (ratio > 1) {
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
    } else {
        ratio = 1
    }

    _callback(onloadCanvas(image,width,height));
}

function onloadCanvas(image,width,height,ratio) {
    // 用于压缩图片的canvas
    debugger
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 瓦片canvas
    const tCanvas = document.createElement('canvas')
    const tctx = tCanvas.getContext('2d')
    // canvas 清屏
    ctx.fillStyle = '#fff'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
        // 重置canvas宽高
    canvas.width = width
    canvas.height = height
    // 绘制
    // 如果图片像素大于100万则使用瓦片绘制
    debugger
    let count = width * height / 500000
    if (count > 1) {
        // 计算要分成多少块瓦片
        count = ~~(Math.sqrt(count) + 1)
        // 计算每块瓦片的宽和高
        const nw = ~~(width / count)
        const nh = ~~(height / count)

        tCanvas.width = nw
        tCanvas.height = nh

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                tctx.drawImage(image, i * nw * ratio, j * nh * ratio,
                    nw * ratio, nh * ratio, 0, 0, nw, nh)

                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
            }
        }
    } else {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
    const imgSrcData = canvas.toDataURL('image/jpg',1)
    // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    debugger
    console.log('压缩前：' + image.src.length);  
    console.log('压缩后：' + imgSrcData.length);  
    console.log('压缩率：' + ~~(100 * (image.src.length - imgSrcData.length) / image.src.length) + "%"); 
    
    //TODO 上传图片
    // _self.setState({
    //   uploadSrc: imgSrcData
    // })
    return imgSrcData;
}

const loadImage = (src, onload,_callback)=>{
    const img = new Image()
    img.src = src
    img.onload = () => {
        onload(img,_callback)
    }
    img.onerror = () => {
        onload(false)
    }
}

const readImage = function(src,_callback){
  // 创建 FileReader 对象 并调用 render 函数来完成渲染
  // src.type
  const reader = new FileReader()
  reader.onload = function(e) {
    // that.drawImage(e.target.result)
    loadImage(e.target.result,drawCanvasImage,_callback);
  }
  // 读取文件内容
  reader.readAsDataURL(src)
}

export default {
  readImage
}

// module.exports = ()=>{
//   readImage:(src)=>{
//     // 创建 FileReader 对象 并调用 render 函数来完成渲染
//     // src.type
//     debugger
//     const reader = new FileReader()
//     reader.onload = function(e) {
//       // that.drawImage(e.target.result)
//       loadImage(e.target.result, drawCanvasImage)
//     }
//     // 读取文件内容
//     reader.readAsDataURL(src)
//   }
// }
