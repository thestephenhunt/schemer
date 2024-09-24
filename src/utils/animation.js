class Animation {
    constructor(ctx) {
        this.ctx = ctx
        this.x = ctx.canvas.width / 2
        this.y = ctx.canvas.height / 2
        this.rMax = Math.min(this.x - 20, this.y - 20, 60)
        this.r = 40
        this.grow = true
        this.run = true

        this.boundAnimate = this.animate.bind(this)
    }

    drawCircle() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        this.ctx.fill()
    }
}