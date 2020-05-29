var loadLevel = function(game, n) {
  let a = n - 1
  let level = levels[a]
  let blocks = []
  if (level !== undefined) {
      for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let block = Block(game, p)
        blocks.push(block)
      }
  }
  return blocks
}

var fps = 30
// var blocks = loadLevel(game, 1)


var enableDebugMode = function(enable, game) {
    if (!enable) {
        return
    }

    window.addEventListener('keydown', function(event) {
        let k = event.key
        // console.log('keydown', event.key);
        if (k == 'p') {
            game.pause()
        } else if('1234567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
            // console.log('blocks', blocks)
        }
    })
    // 控制速度
    let input = document.querySelector('#id-input-speed')
    let value = document.querySelector('#id-fps-value')
    input.addEventListener('input', function(event) {
        var target = event.target
        fps = Number(target.value)
        value.innerHTML = 'fps: ' + fps
    })

}

var __main = function() {

var images = {
    paddle: './imgs/paddle.png',
    block: './imgs/block.png',
    ball: './imgs/ball.png',
}

var game = new Game(images, function(g) {

    var scene = new SceneTitle(game)
    return scene

    // game.update = function() {
    //     scene.update()
    // }
    //
    //
    // game.draw = function() {
    //     scene.draw()
    // }

})

enableDebugMode(true, game)


}

__main()
