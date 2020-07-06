//构造函数 自定义对象 点坐标
function coordinate(x, y) {
    this.x = x;
    this.y = y;
}
var canvas = document.getElementById("myCanvas");
// document.getElementById("slide").style.width = canvas.width;
// var rectangle_pos = 
if (canvas.getContext) {
    ctx = canvas.getContext('2d')
    // 四段圆弧

} else {
    console.log('浏览器不支持canvas')
}
var slider = document.getElementById('slide')
function draw_rectangle(ctx, x, y, width, height) {
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    // ctx.fillRect(x, y, width, height)
    ctx.strokeRect(x, y, width, height)
}

function updateSlider(slideAmount) {
    var sliderDiv = document.getElementById("sliderAmount");
    // sliderDiv.innerHTML = slideAmount;
    //clear the canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width
    //外接矩形大小
    rectangle_size_width = 120
    rectangle_size_height = 120
    // var rectangle_x = canvas.width * slideAmount
    var rectangle_cor = new coordinate(canvas.width * slideAmount, canvas.height * 0.5)
    sliderDiv.innerHTML = slideAmount
    var progress = slideAmount
    // let ctx = canvas.getContext('2d')
    //outsideRectSize = 90 * 90
    draw_rectangle(ctx, rectangle_cor.x - rectangle_size_width / 2, rectangle_cor.y - rectangle_size_height / 2, rectangle_size_width, rectangle_size_height)
    //A-C1、B-C2... 的距离，当设置为正方形边长的1/3.6倍时，画出来的圆弧完美贴合圆形
    offset = rectangle_size_width / 3.6
    rectangle_cor.x = rectangle_cor.x - rectangle_size_width / 2
    rectangle_cor.y = rectangle_cor.y - rectangle_size_height / 2
    //A.B.C.D实际需要移动的距离.系数为滑块偏离中点0.5的绝对值再乘以2.当滑到两端的时候，movedDistance为最大值：「外接矩形宽度的1/5」.
    movedDistance = (rectangle_size_width * 1 / 6) * Math.abs(progress - 0.5) * 2

    //方便下方计算各点坐标，先算出外接矩形的中心点坐标
    var rectCenter_cor = new coordinate(rectangle_cor.x + rectangle_size_width / 2, rectangle_cor.y + rectangle_size_height / 2)

    //A,B,C,D四个顶点 
    var pointA = new coordinate(rectCenter_cor.x, rectangle_cor.y + movedDistance)
    var pointC = new coordinate(rectCenter_cor.x, rectCenter_cor.y + rectangle_size_height / 2 - movedDistance)
    var pointB = new coordinate(getDirection(progress) ? rectCenter_cor.x + rectangle_size_width / 2 : rectCenter_cor.x + rectangle_size_width / 2 + movedDistance * 2, rectCenter_cor.y)
    var pointD = new coordinate(getDirection(progress) ? rectangle_cor.x - movedDistance * 2 : rectangle_cor.x, rectCenter_cor.y)

    //c1-c8 八个辅助点
    var c1 = new coordinate(pointA.x + offset , pointA.y)
    var c2 = new coordinate(pointB.x , getDirection(progress) ? pointB.y - offset : pointB.y - offset + movedDistance)

    var c3 = new coordinate(pointB.x , getDirection(progress) ? pointB.y + offset : pointB.y + offset - movedDistance)
    var c4 = new coordinate(pointC.x + offset , pointC.y)

    var c5 = new coordinate(pointC.x - offset , pointC.y)
    var c6 = new coordinate(pointD.x , getDirection(progress) ? pointD.y + offset - movedDistance : pointD.y + offset)

    var c7 = new coordinate(pointD.x , getDirection(progress) ? pointD.y - offset + movedDistance : pointD.y - offset)
    var c8 = new coordinate(pointA.x - offset, pointA.y)

    //绘制贝塞尔曲线
    //左上部分
    ctx.moveTo(pointD.x, pointD.y)
    ctx.bezierCurveTo(c7.x,c7.y,c8.x,c8.y,pointA.x,pointA.y)

    //右上部分
    ctx.moveTo(pointA.x, pointA.y)
    ctx.bezierCurveTo(c1.x,c1.y,c2.x,c2.y,pointB.x,pointB.y)

    //右下部分
    ctx.moveTo(pointB.x,pointB.y)
    ctx.bezierCurveTo(c3.x,c3.y,c4.x,c4.y,pointC.x,pointC.y)

    //左下部分
    ctx.moveTo(pointC.x,pointC.y)
    ctx.bezierCurveTo(c5.x,c5.y,c6.x,c6.y,pointD.x,pointD.y)
    ctx.fillStyle = 'red'
    ctx.stroke()



    // //B 点动 or D 点动
    // if (progress <= 0.5) {
    //     log("B 点动")
    //     //rectCenter.x + self.outsideRect.size.width/2 + movedDistance*2
    //     var pointB = new coordinate(rectCenter_cor.x + rectangle_size_width / 2 + movedDistance * 2, rectCenter_cor.y)
    //     //D点不动
    //     //self.outsideRect.origin.x
    //     var pointD = new coordinate(rectangle_cor.x, rectCenter_cor.y)
    // }
    // else {
    //     log("D点动")
    //     //rectCenter.x + self.outsideRect.size.width/2
    //     var pointB = new coordinate(rectCenter_cor.x + rectangle_size_width / 2, rectCenter_cor.y)
    //     //D点动
    //     //self.outsideRect.origin.x - movedDistance*2
    //     var pointD = new coordinate(rectangle_cor.x - movedDistance * 2, rectCenter_cor.y)
    // }




}
function getDirection(progress){
    if(progress <= 0.5){
        console.log("B点动");
        return false;
    }
    else{
        console.log("D点动")
        return true;
    }
}
function getRads(degrees) {
    return (Math.PI * degrees) / 180;
}
function getDegrees(rads) {
    return (rads * 180) / Math.PI;
}

function drawCurvePath(ctx, start, end, curveness) {
    // 计算中间控制点
    var cp = [
        (start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
        (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness
    ];
    ctx.moveTo(start[0], start[1]);
    ctx.quadraticCurveTo(
        cp[0], cp[1],
        end[0], end[1]
    );

}