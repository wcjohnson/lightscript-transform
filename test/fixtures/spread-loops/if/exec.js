b = [ ...for let i=0; i<10; i++: if i > 5: [i] ]
assert.deepEqual(b, [6, 7, 8, 9])

c = [ ...for let i=0; i<10; i++: if i > 5: [i] elif i > 3: [i * 2] ]
assert.deepEqual(c, [8, 10, 6, 7, 8, 9])

d = [ ...for let i=0; i<10; i++: if i > 5: [i] else if i > 3: [i * 2] ]
assert.deepEqual(d, [8, 10, 6, 7, 8, 9])

e = [ ...for let i=0; i<10; i++: if i > 5: [i] else: [0] ]
assert.deepEqual(e, [0, 0, 0, 0, 0, 0, 6, 7, 8, 9])

obj = {...for idx i in Array(10): if i > 8: ({[i]: i}) }
assert.deepEqual(obj, { "9": 9 })
