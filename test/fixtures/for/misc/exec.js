let x
for let i=0; i<10; i++:
  for let j=0; j<10; j++:
    now x = i + j
assert.equal(x, 18)

let y
for let i=0; i<10; i++: for let j=0; j<10; j++: now y = i + j
assert.equal(y, 18)

let z;
for let i = 0; i < 10; i++:
  now z = i;

assert.equal(z, 9);

let w
for let i = 0; i < 10; i++ {
  now w = i
}

assert.equal(w, 9)

let v
for (let i = 0; i < 10; i++) {
  now v = i
}

assert.equal(v, 9)
