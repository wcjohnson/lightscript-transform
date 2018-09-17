c = [...for let i=0; i<4; i++: [ [...for let i=0; i<3; i++: [2]] ]]
assert.deepEqual(c, [ [2, 2, 2], [2, 2, 2], [2, 2, 2], [2, 2, 2] ])

d = [ ...for let i=0;i<3;i++: for let j=5;j<7;j++: [[i, j]] ]
assert.deepEqual(d, [ [0, 5], [0, 6], [1, 5], [1, 6], [2, 5], [2, 6] ])

e = [ ...for let i=0;i<3;i++: for let j=5;j<7;j++: if i > 1: [[i, j]] ]
assert.deepEqual(e, [ [2, 5], [2, 6] ])

obj = { ...for idx i in Array(3): for idx j in Array(2): if i < 2: ({[`${i}*${j}`]: i*j}) }
assert.deepEqual(obj, {"0*0": 0, "0*1": 0, "1*0": 0, "1*1": 1})
