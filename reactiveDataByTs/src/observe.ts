import Observer from './Observer'

import { OBJECT_DATA_TYPE, ARRAY_DATA_TYPE } from './types'


function observe(data: OBJECT_DATA_TYPE|ARRAY_DATA_TYPE): Observer {
  if (typeof data !== 'object') {
    return
  }

  let ob = data.__ob__ && data.__ob__ instanceof Observer 
    ? data.__ob__
    : new Observer(data)

  return ob
}

export default observe
