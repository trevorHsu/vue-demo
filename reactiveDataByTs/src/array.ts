import { def } from './utils'

import Observer from './Observer'

import { ARRAY_DATA_TYPE } from './types'


const arrayPrototype = Array.prototype
const arrayMethods: ARRAY_DATA_TYPE = Object.create(arrayPrototype)
const methodsToBeChanged = [
  'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
]

methodsToBeChanged.forEach(method => {
  const original = arrayMethods[method]

  def(arrayMethods, method, function() {
    const ob = this.__ob__ as Observer
    let args:any[] = [...arguments]
    let result:any = original.apply(this, args)
    let inserted:any = null

    switch (method) {
      case 'push':
      case 'shift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }

    inserted && ob.observeArray(inserted)
    ob.dep.notify()
    
    return result
  }, false)
})

export { arrayMethods }
