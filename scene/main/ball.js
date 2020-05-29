var Ball = function(game) {
    // var image = imageFromPath('./ball.png')
    var img = game.imageByName('ball').image
    var o = {
        image: img,
        x: 170,
        y: 200,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.w = img.width
    o.h = img.height
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            // 撞墙换方向
            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + 10 > 300) {
                o.speedY *= -1
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.back = function() {
        o.speedY *= -1
    }
    return o
}
