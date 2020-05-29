var Scene = function(game) {

    var s = {
        game: game,
    }

    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0

    var end = new SceneEnd(game)
    blocks = loadLevel(game, 1)

    game.registerAction('a', paddle.moveLeft)
    game.registerAction('d', paddle.moveRight)
    game.registerAction('x', ball.fire)

    s.update = function() {
        // if (game.paused) {
        //     return
        // }

        ball.move()


        if (ball.y > paddle.y) {
            game.replaceScene(end)
        }

        if (paddle.collide(ball)) {
            ball.back()
        }
        // 判断 ball 和 blocks 相撞
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.back()
                score += 100
            }
        }
    }

    s.draw = function() {
        // background
        game.context.fillStyle = '#827717'
        game.context.fillRect(0, 0, 400, 300)
        // 游戏主体
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // score
        game.context.fillStyle = 'white'
        game.context.font = "12px monospace"
        game.context.fillText(`score：${score}`, 10, 280)
    }

    // mouse event
    var dragable = false
    // var dragBlock = false

    game.context.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if (pointInRect(x, y, ball)) {
            dragable = true
        }
        // for (let i = 0; i < blocks.length; i++) {
        //     let block = blocks[i]
        //     if (pointInRect(x, y, block)) {
        //         block.dragable = true
        //     }
        // }
    })

    game.context.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if (dragable) {
            ball.x = x
            ball.y = y
        }
        // for (let i = 0; i < blocks.length; i++) {
        //     let block = blocks[i]
        //     if (block.dragable) {
        //         block.x = x
        //         block.y = y
        //     }
        // }
    })

    game.context.canvas.addEventListener('mouseup', function(event) {
        dragable = false
        // for (var i = 0; i < blocks.length; i++) {
        //     let block = blocks[i]
        //     block.dragable = false
        // }
    })

    return s
}
