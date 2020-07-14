flag = true

g() -/> 1

f() -/>
  if flag:
    res <- g()
    res
  else:
    'fail'

f()
  .then(
    (x) ->
      assert(x == 1)
  ).catch(
    (err) -> throw err
  )
