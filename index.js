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
const vueInstance = new Vue({
    el : '#app'
})
