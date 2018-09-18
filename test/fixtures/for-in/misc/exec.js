arr = [4, 5, 6]
let x
for idx i in arr:
  now x = i

assert.equal(x, 2)

let y, z
for idx i, elem e in arr:
  now y = i
  now z = e

assert.equal(y, 2)
assert.equal(z, 6)

let w
for const k in { x: 8 }:
  now w = k

assert.equal(w, "x")
