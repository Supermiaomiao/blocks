var Block = function (game, position) {
    // position eg. [0, 0, 1]
    var p = position
    // var image = imageFromPath('./block.png')
    var img = game.imageByName('block').image
    var o = {
        image: img,
        x: p[0] || 0,
        y: p[1] || 50,
        w: 50,
        h: 20,
        alive: true,
        lifes: p[2] || 1,
        dragable: false,
    }
    o.width = img.width
    o.height = img.height
    o.collide = function(ball) {
        if (!o.alive) {return}
        return (o.alive && (rectInsects(o, ball) || rectInsects(ball, o)))
    }
    o.kill = function() {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }

    }
    return o
}
