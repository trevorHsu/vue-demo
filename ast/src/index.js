import parse from './parse'

let templateStr = `
  <div>
    <h3>hello</h3>
  </div>
`

const ast = parse(templateStr)

console.log(ast)
