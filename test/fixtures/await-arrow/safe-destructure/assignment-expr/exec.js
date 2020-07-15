g() -/> 1

f() -/>
  let result, err
  now [result, err] <!- g()
  assert(result == 1)
  assert(err == undefined)

f().catch((err) -> throw err)
