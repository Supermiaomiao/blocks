var Game = function(images, runCallback) {

    // images 是一个对象, 存储要加载的图片名字和地址

    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')

    var g = {
        scene: null,
        context: context,
        // 存一下哪些按键是注册了以后有事件的
        actions: {},
        // 存储哪些按键是否被按下
        keydowns: {},
        images: {},
        paused: false,
    }

    g.drawImage = function(obj) {
        g.context.drawImage(obj.image, obj.x, obj.y)
    }

    g.update = function() {
        if (g.paused) {
            return
        }
        g.scene.update()
    }

    g.draw = function() {
        g.scene.draw()
    }

    g.pause = function() {
        g.paused = !g.paused
    }

    // events 把事件和函数注册进g的数据中
    // 存储keydown事件
    window.addEventListener('keydown', event => {
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', event => {
        g.keydowns[event.key] = false
    })

    // 注册事件, 注册按下的键和对应要执行的函数
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }

    // timer
    var runloop = function () {
        let actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            // 如果按键被按下, 调用注册的action
            if (g.keydowns[key] === true) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function() {
            runloop(fps)
        }, 1000/window.fps)
    }

    // 预先载入所有图片
    let names = Object.keys(images)
    let num = 0
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            g.images[name] = img
            num ++
            if (num === names.length) {
                // console.log('try loadImgByName', g.imageByName('paddle'))
                // runCallback(g)
                // 所有图片都成功载入之后, 调用 run
                g.run()
            }
        }
    }

    // imageByName 传入 图片名字, 返回图片对象
    g.imageByName = function(name) {
        let o = {}
        o.image = g.images[name]
        o.width = o.image.width
        o.height = o.image.height

        return o
    }

    // 开始运行程序
    g.run = function() {
        g.scene = runCallback(g)
        setTimeout(
            function() {runloop()},
            1000/window.fps
        )
    }


    return g

}
