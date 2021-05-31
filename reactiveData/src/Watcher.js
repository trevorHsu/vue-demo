import Dep from './Dep'
import { parsePath } from './utils'


let uid = 0

export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get() // 实例化 Watcher 类时，会访问一次属性，从而触发属性数据收集依赖，将该Watcher实例作为依赖存入Dep实例
  }

  get() {
    let value
    const obj = this.target
    Dep.target = this // 设置当前依赖

    try {
      value = this.getter(obj) // this.getter访问属性，从而触发属性对象的getter，调用depend
    } finally {
      Dep.target = null
    }

    return value
  }
  update() {
    this.run()
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(callback) {
    const value = this.get()

    if (value !== this.value || typeof value === 'object') {
      let oldVal = this.value
      this.value = value
      callback && callback.call(this.target, value, oldVal) // 注意调用的作用域
    }
  }
}
