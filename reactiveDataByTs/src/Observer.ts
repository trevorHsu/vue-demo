import defineReactive from './defineReactive'
import observe from './observe'
import { def } from './utils'
import { arrayMethods } from './array'
import Dep from './Dep'

import { OBJECT_DATA_TYPE, ARRAY_DATA_TYPE } from './types'


class Observer {
  public dep: Dep

  constructor(data: OBJECT_DATA_TYPE|ARRAY_DATA_TYPE) {
    this.dep = new Dep()
    def(data, '__ob__', this, false)

    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, arrayMethods)
      this.observeArray(data)
    } else {
      this.walk(data)
    }

  }
  walk(data: OBJECT_DATA_TYPE) {
    for (let key in data) {
      defineReactive(data, key)
    }
  }
  observeArray(data: ARRAY_DATA_TYPE) {
    for (let i = 0, len = data.length; i < len; i++) {
      observe(data[i])
    }
  }
}

export default Observer
