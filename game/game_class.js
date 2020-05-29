class Game {
    constructor(images, runCallback) {
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.images = images
        this.runCallback = runCallback
        this.paused = false

        // events 把事件和函数注册进g的数据中
        // 存储keydown事件
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

        this.init()
    }

    drawImage(obj) {
        this.context.drawImage(obj.image, obj.x, obj.y)
    }

    update() {
        if (this.paused) {
            return
        }
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    pause() {
        this.paused = !this.paused
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    replaceScene(scene) {
        this.scene = scene
    }

    // timer
    runloop (){
        let self = this
        let actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            // 如果按键被按下, 调用注册的action
            if (this.keydowns[key] === true) {
                this.actions[key]()
            }
        }
        // update
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()
        // next run loop
        setTimeout(function() {
            self.runloop(fps)
        }, 1000/window.fps)
    }

    // 预先载入所有图片
    init() {
        let self = this
        let names = Object.keys(this.images)
        let num = 0
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // log('img', img, this.images)
                self.images[name] = img
                num ++
                if (num === names.length) {
                    // runCallback(g)
                    // 所有图片都成功载入之后, 调用 run
                    self.run()
                }
            }
        }
    }

    // imageByName 传入 图片名字, 返回图片对象
    imageByName(name) {
        let o = {}
        o.image = this.images[name]
        o.width = o.image.width
        o.height = o.image.height
        return o
    }

    // 开始运行程序
    run() {
        let self = this
        this.scene = this.runCallback(this)
        setTimeout(
            function() {self.runloop()},
            1000/window.fps
        )
    }



}
