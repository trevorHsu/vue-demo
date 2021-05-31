import Watcher from './Watcher'

let uid = 0

export default class Dep {
  public id: number
  public subs: Watcher[]
  static target: Watcher|null

  constructor() {
    this.id = uid++
    this.subs = []
  }

  addSub(sub: Watcher){
    this.subs.push(sub)
  }
  depend() {
    if (Dep.target && this.subs.every(sub => sub.id !== Dep.target.id)) {
      this.addSub(Dep.target)
    }
  }
  notify() {
    const subs = this.subs.slice()

    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}
