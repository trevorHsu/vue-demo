import observe from './src/observe'
import Watcher from './src/Watcher'


let obj:any = {
  a: {
    aa: {
      aaa: [1, 2, {tt: 88}]
    },
    aa1: 456
  },
  b: {
    bb: {
      bbb: 789
    }
  },
  c: 1111
}


observe(obj)

new Watcher(obj, 'a.aa.aaa', function(newVal, oldVal) {
  console.log('watcher', newVal)
})

new Watcher(obj, 'c', function(newVal, oldVal) {
  console.log('watcher 2', newVal)
})


obj.c = 3

obj.a.aa.aaa.push({ddd: 55})
obj.a.aa.aaa.push({ddd: 66})
