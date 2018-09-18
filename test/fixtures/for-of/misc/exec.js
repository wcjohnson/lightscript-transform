let y
for const [ x ] of [ [1], [4, 0] ]:
  now y = x

assert.equal(y, 4)

let z
for const { x } of [{ x: 8 }, { x: 4 }]:
  now z = x

assert.equal(z, 4)

let w
for const x of [4]:
  now w = x

assert.equal(w, 4)
