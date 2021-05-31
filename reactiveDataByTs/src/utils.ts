import { PATH_VAL_GETTER_TYPE } from './types'


type defConfig = {
  get?: <T>(value: T) => void,
  set?: <T, K>(newVal: T, oldVal: T|K) => void
}


function def(
  data: object, 
  key: string|number, 
  value: unknown, 
  enumerable:boolean = true, 
  defConfig?: defConfig
): void {
  const { get, set } = defConfig || {}

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

function parsePath(expression: string): PATH_VAL_GETTER_TYPE {
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
