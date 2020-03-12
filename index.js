const w = window.innerWidth, h = window.innerHeight, scGap = 0.02, delay = 40

class State {

    scale = 0

    update(cb) {
        this.scale += scGap
        if (this.scale > 1) {
            this.scale = 0
            cb()
        }
    }
}

class Animator {

    aniamted = false
    interval

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, delay)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

const maxScale = (scale, i, n) => Math.max(0, scale - i / n)

const divideScale = (scale, i, n) =>  Math.min(1 / n, maxScale(scale, i, n)) * n

Vue.component('right-angle-circle-component', {
    data() {
        const animator = new Animator()
        const state = new State()
        const sf = 0
        return {animator, state, sf}
    },
    methods : {
        start() {
            this.animator.start(() => {
                this.sf = Math.sin(this.state.scale * Math.PI)
                this.state.update(() => {
                    this.animator.stop()
                })
            })
        },
        getCommonStyle(i, sf) {
            const lSize = Math.min(w, h) / 3
            const position = 'absolute'
            const fx = w / 10
            const fy = 0.9 * h
            const x = fx + lSize * sf * i
            const y = fy - lSize * sf * (1 - i)
            const background = '#3F51B5'
            const circleSize = Math.min(w, h) / 10
            const strokeWidth = Math.min(w, h) / 70
            return {background, x, y, position, circleSize, strokeWidth, fx, fy}
        }
    },
    computed: {
        ballStyleY() {
            const {background, x, y, position, circleSize} = this.getCommonStyle(0, this.sf)
            const left = `${x}px`
            const top = `${y}px`
            const borderRadius = '50%'
            const width = `${circleSize}px`
            const height = `${circleSize}px`
            return {position, background, left, top, borderRadius, width, height}
        },
        lineStyleY() {
            const {background, x, y, position, strokeWidth, fx, fy} = this.getCommonStyle(0, this.sf)
            const width = `${strokeWidth}px`
            const height = `${y}px`
            const left = `${fx}px`
            const top = `${fy}px`
            return {background, position, left, top, width, height}
        },
        ballStyleX() {
            const {background, x, y, position, circleSize} = this.getCommonStyle(1, this.sf)
            const left = `${x}px`
            const top = `${y}px`
            const width = `${circleSize}px`
            const height = `${circleSize}px`
            const borderRadius = '50%'
            return {position, left, top, width, height, borderRadius, background}
        },
        lineStyleX() {
            const {background, x, y, position, strokeWidth, fx, fy} = this.getCommonStyle(1, this.sf)
            const left = `${fx}px`
            const top = `${fy}px`
            const width = `${x}px`
            const height = `${strokeWidth}px`
            return {background, left, top, position, width, height}

        }
    }
})
const vueInstance = new Vue({
    el : '#app'
})
