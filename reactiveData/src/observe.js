import Observer from './Observer'

export default function observe(data) {
  if (typeof data !== 'object') {
    return
  }

  let ob = data.__ob__ && data.__ob__ instanceof Observer 
    ? data.__ob__
    : new Observer(data)

  return ob
}
