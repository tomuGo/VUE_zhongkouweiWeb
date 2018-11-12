const timeFlier = (val, fmt) => {
  let date

  if (!val) {
    return val
  }
  // 当传入的是时间戳或国际时间等 单独处理
  if (typeof val === 'number') {
    date = new Date(val)
  } else if (typeof val === 'string' && val.indexOf('-') > -1) {
    date = new Date(val.replace(/-/g, '/'))
  } else {
    date = val
  }

  if (typeof date === 'object' && typeof date.getDate !== 'function') {
    return val
  }

  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }

  Object.keys(o).forEach((key) => {
    if (new RegExp(`(${key})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[key]) : ((`00${o[key]}`).substr((`${o[key]}`).length)))
    }
  })
  return fmt
}

export default timeFlier
