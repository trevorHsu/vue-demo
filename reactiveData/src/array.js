import { def } from './utils'

const arrayPrototype = Array.prototype
const arrayMethods = Object.create(arrayPrototype)
const methodsToBeChanged = [
  'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
]

methodsToBeChanged.forEach(method => {
  const original = arrayMethods[method]

  def(arrayMethods, method, function() {
    const ob = this.__ob__
    let args = [...arguments]
    let result = original.apply(this, args)
    let inserted = null

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
