import defineReactive from './defineReactive'
import observe from './observe'
import { def } from './utils'
import { arrayMethods } from './array'
import Dep from './Dep'


export default class Observer {
  constructor(data) {
    this.dep = new Dep()
    def(data, '__ob__', this, false)

    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, arrayMethods)
      this.observeArray(data)
    } else {
      this.walk(data)
    }

  }
  walk(data) {
    for (let key in data) {
      defineReactive(data, key)
    }
  }
  observeArray(data) {
    for (let i = 0, len = data.length; i < len; i++) {
      observe(data[i])
    }
  }
}
