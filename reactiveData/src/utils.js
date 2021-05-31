function def(data, key, value, enumerable = true, { get, set } = {}) {
  Object.defineProperty(data, key, {
    enumerable,
    configurable: true,
    get() {
      get && get(value)
      return value
    },
    set(newVal) {
      let oldVal = value
      value = newVal

      set && set(newVal, oldVal)

      return value
    }
  })
}

function parsePath(expression) {
  let segments = expression.split('.')

  return target => {

    for (let i = 0; i < segments.length; i++) {
      target = target[segments[i]]

      if (typeof target === 'undefined') {
        return
      }
    }

    return target
  }
}

export { def, parsePath }
