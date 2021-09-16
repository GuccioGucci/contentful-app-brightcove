const { execSync } = require('child_process')
const packageJson = require('../package.json')
const fs = require('fs')

const version = `v${packageJson.version}`

execSync(`BUILD_PATH=build/${version} GENERATE_SOURCEMAP=false node_modules/.bin/react-scripts build`, { stdio: 'inherit' })

fs.writeFileSync(
  'build/index.html',
  fs.readFileSync('scripts/index.html', 'utf8').replace('#', `${version}/`)
)
