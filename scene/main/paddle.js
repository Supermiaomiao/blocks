var Paddle = function(game) {
    // var image = imageFromPath('./paddle.png')
    var img = game.imageByName('paddle')
    console.log('game', img)
    var o = {
        image: img,
        x: 150,
        y: 250,
        speed: 15,
    }
    o.image = img.image
    o.w = img.width
    o.h = img.height

    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
        // o.x -= o.speed
        // log('o.x', o.x)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    // 判断相撞
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        // if (ball.y + ball.h > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.w) {
        //         log('相撞')
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
