class SceneTitle extends SceneClass {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })

        game.registerAction('e', function() {
            var s = new SceneEditor(game, levels)
            game.replaceScene(s)
        })


    }



    draw() {
        var ctx = this.game.context
        // background
        ctx.fillStyle = '#827717'
        ctx.fillRect(0, 0, 400, 300)
        // score
        ctx.fillStyle = 'white'
        ctx.font = "12px monospace"
        ctx.fillText('游戏开始,按k开始游戏', 150, 150)
        ctx.fillText('        按E编辑关卡', 150, 170)
    }
}
