import observe from './observe'
import { def } from './utils'
import Dep from './Dep'


export default function defineReactive(data, key, value) {
  const dep = new Dep()

  if (arguments.length === 2) {
    value = data[key]
  }

  let childOb = observe(value)

  def(data, key, value, true, {
    get(curVal) {
      dep.depend()
      childOb && childOb.dep.depend() // 当value为对象时，也要将依赖存入value的依赖收集器，因为改变value内容时，也要通知
    },
    set(oldVal, newVal) {
      if (oldVal !== newVal) {
        childOb = observe(newVal)
        dep.notify()
      }
    }
  })
}
