bad() -/>
  throw new Error("bad")

good() -/>
  1

f() -/>
  [result, err] <!- bad()
  assert(result == undefined)
  assert(err.message == "bad")

g() -/>
  [result, err] <!- good()
  assert(result == 1)
  assert(err == undefined)

f().catch((err) -> throw err)
g().catch((err) -> throw err)
