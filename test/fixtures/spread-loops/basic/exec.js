arr = [4, 5, 6]

c = [ ...for idx i, elem x in arr: [[i, x]] ]
assert.deepEqual(c, [[0, 4], [1, 5], [2, 6]])

d = [ ...for let i = 0; i < arr.length; i++: [[i, arr[i]]] ]
assert.deepEqual(d, [[0, 4], [1, 5], [2, 6]])

x = [ ...for const i in arr: [parseInt(i)] ]
assert.deepEqual(x, [0, 1, 2])

y = [ ...for const i in arr: [parseInt(i) + 1] ]
assert.deepEqual(y, [1, 2, 3])

z = [ ...for const x of arr: [x] ]
assert.deepEqual(z, [4, 5, 6])

w = [ ...for const y of arr: [y + 1] ]
assert.deepEqual(w, [5, 6, 7])
