var http = require('http')
var parseUrl = require('parseurl')
var send = require('send')
var glob = require('glob')
var path = require('path')
var fs = require('fs')

fs.writeFileSync(path.join(__dirname, 'index.html'),
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>emnapi examples</title>
</head>
<body>
  <h2>Open your DevTools console</h2>
  <ul>
${glob.sync('**/*.html', { ignore: 'index.html' }).map(p => `<li><a href="./${p}">${p}</li>`).join('\n')}
  </ul>
</body>
</html>
`, 'utf8')

var server = http.createServer(function onRequest (req, res) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  send(req, parseUrl(req).pathname, { root: __dirname })
    .pipe(res)
})

const port = 3000
server.listen(port, () => {
  console.log(`Server listen: http://localhost:${port}`)
})
