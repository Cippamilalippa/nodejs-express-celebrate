/*
Use this folder for all shared helper functions
 */

function cleanUrl () {
  let url = '/'
  // Check if first part is http/https
  if (arguments[0].substring(0, 4) === 'http') {
    url = ''
  }

  // Build up url string
  for (let i in arguments) {
    url += arguments[i] + '/'
  }

  // Remove all wrong double slash //
  while (url.search(/(?<!:)(\/\/)/) !== -1) {
    url = url.replace(/(?<!:)(\/\/)/, '/')
  }

  // Remove trailing slash
  url = url.replace(/(\/)$/, '')

  return url
}

module.exports = { cleanUrl }