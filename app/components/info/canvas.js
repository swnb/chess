class Line {
    constructor(ctx, w, h, startPosi, long, speed = 10) {
        this.w = w
        this.h = h
        this.startW = startPosi[0]
        this.startH = startPosi[1]
        this.width = long;
        this.speed = speed;
        this.ctx = ctx
    }
    update() {
        //如果点出现在左边
        if (this.startW === 0) {
            if (this.startH >= this.speed) {
                this.startH -= this.speed
            } else if (this.startH < this.speed) {
                this.startH = 0 //上边
                this.startW = this.speed - this.startH
            }
        } else if (this.startH === 0) { //上边
            if (this.w - this.startW >= this.speed) {
                this.startW += this.speed
            } else if (this.w - this.startW < this.speed) {
                this.startW = this.w //右边
                this.startH = this.speed + this.startH - this.w
            }
        } else if (this.startW === this.w) { //右边
            if (this.h - this.startH >= this.speed) {
                this.startH += this.speed
            } else if (this.h - this.startH < this.speed) {
                this.startH = this.h //下边
                this.startW = this.w - this.speed - this.startH + this.h
            }
        } else if (this.startH === this.h) { //下边
            if (this.startW >= this.speed) {
                this.startW -= this.speed
            } else if (this.startW < this.speed) {
                this.startW = 0 //左边
                this.startH = this.h - this.speed + this.startW
            }
        }
    }
    draw() {
        //左边
        if (this.startW === 0) {
            if (this.startH < this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //左边顶点
                this.ctx.lineTo(0, 0)
                this.ctx.lineTo(this.long - this.startH, 0)
            } else if (this.startH > this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                this.ctx.lineTo(0, this.startH - this.long)
            } else if (this.startH === this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //左边顶点
                this.ctx.lineTo(0, 0)
            }
        } else if (this.startH === 0) { //上边
            //没有超过
            if (this.w - this.startW > this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                this.ctx.lineTo(this.startW + this.long, 0)
            } else if (this.w - this.startW < this.long) { //超过了
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //右边顶点
                this.ctx.lineTo(this.w, 0)
                if (this.long - this.w + this.startW < this.h) { //没有超过
                    this.ctx.lineTo(this.w, this.long - this.w + this.startW)
                } else {
                    //顶点
                    this.ctx.lineTo(this.w, this.h)
                    this.ctx.lineTo(this.long + this.startW - this.h, this.h)
                }
            } else if (this.w - this.startW === this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //左边顶点 
                this.ctx.lineTo(this.w, 0)
            }
        } else if (this.startW === this.w) { //右边
            if (this.h - this.startH < this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //左边顶点
                this.ctx.lineTo(this.w, this.h)
                this.ctx.lineTo(this.w - this.long - this.startH + this.h, this.h)
            } else if (this.h - this.startH > this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                this.ctx.lineTo(0, this.startH + this.long)
            } else if (this.h - this.startH === this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //左边顶点 
                this.ctx.lineTo(this.w, this.h)
            }
        } else if (this.startH === this.h) { //底部
            //没有超过
            if (this.w - this.startW > this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                this.ctx.lineTo(this.startW + this.long, 0)
            } else if (this.w - this.startW < this.long) { //超过了
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //右边顶点
                this.ctx.lineTo(this.w, 0)
                if (this.long - this.w + this.startW < this.h) { //没有超过
                    this.ctx.lineTo(this.w, this.long - this.w + this.startW)
                } else {
                    //顶点
                    this.ctx.lineTo(this.w, this.h)
                    this.ctx.lineTo(this.long + this.startW - this.h, this.h)
                }
            } else if (this.w - this.startW === this.long) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.startW, this.startH)
                //左边顶点 
                this.ctx.lineTo(this.w, 0)
            }
        }

    }
    clear() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    run() {
        requestAnimationFrame(() => {
            this.clear()
            this.draw()
            this.update()
            this.run()
        })
    }
}

export default (w, h) => {
    [...document.querySelectorAll('canvas')].map(canvas => {
        canvas.width = w
        canvas.height = h
        return canvas.getContext('2d')
    }).forEach(ctx => {
        ctx.strokeStyle = 'grey'
        ctx.lineCap = 'round'
        ctx.lineJoin = "round"
        ctx.lineWidth = 2
        ctx.beginPath()
        const line = new Line(ctx, parseInt(w, 10), parseInt(h, 10), [0, 0], 50, 5)
        line.run()
        ctx.closePath()
    })
}