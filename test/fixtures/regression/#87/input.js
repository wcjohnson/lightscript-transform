presets = [
  ...if opts.env != false:
    [['@babel/preset-env', opts.env or {}]]
]
