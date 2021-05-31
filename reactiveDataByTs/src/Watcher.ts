import Dep from './Dep'
import { parsePath } from './utils'

import { DATA_TYPE, PATH_VAL_GETTER_TYPE } from './types'


type WATCHER_CB_TYPE = <T, K>(newVal: T|K, oldVal: K) => void

let uid = 0

class Watcher {
  public id: number
  public target: DATA_TYPE
  public getter: PATH_VAL_GETTER_TYPE
  public callback: WATCHER_CB_TYPE
  public value: unknown
  static target: Watcher|null

  constructor(target: DATA_TYPE, expression: string, callback: WATCHER_CB_TYPE) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get() // 实例化 Watcher 类时，会访问一次属性，从而触发属性数据收集依赖，将该Watcher实例作为依赖存入Dep实例
  }

  get() {
    let value: unknown
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
  getAndInvoke(callback: WATCHER_CB_TYPE) {
    const value = this.get()

    if (value !== this.value || typeof value === 'object') {
      let oldVal = this.value
      this.value = value
      callback && callback.call(this.target, value, oldVal) // 注意调用的作用域
    }
  }
}


export default Watcher
