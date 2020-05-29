const e = self => document.querySelector(self)

const log = console.log.bind(console)
// const log = function(s) {
//     e('#id-text-log').value += '\n' + s
// }



var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

// 判断相交
var rectInsects = function(a, b) {
    if (a.x > b.x && a.x < b.x + b.image.width) {
        if (a.y > b.y && a.y < b.y + b.image.height) {
            return true
        }
    }
    return false
}

// 判断一个点是否在矩形里
var pointInRect = function(x, y, o) {
    var a = x > o.x && x < o.x + o.w
    var b = y > o.y && y < o.y + o.h
    return a&&b
}
