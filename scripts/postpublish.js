const fs = require('fs')
const path = require('path')
const PACKAGE = process.env.PACKAGE
var execSync = require('child_process').execSync
var util = require('util')

const packagejson = fs.readFileSync(
  path.join(__dirname, '..', 'packages', PACKAGE, 'package.json')
, 'utf8')

fs.writeFileSync(
  path.join(__dirname, '..', 'packages', PACKAGE, 'package.json.old'),
  packagejson,
  'utf8'
)

const json = JSON.parse(packagejson)
const packageName = json.name
const version = json.version
json.version += '-readme'

fs.writeFileSync(
  path.join(__dirname, '..', 'packages', PACKAGE, 'package.json'),
  JSON.stringify(json, null, 2),
  'utf8'
)

const run = cmd => {
  console.log(cmd)
  execSync(cmd, {
    cwd: path.join(__dirname, '..', 'packages', PACKAGE)
  } ,function (error, stdout, stderr) {
    util.print('stdout: ' + stdout);
    util.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}


run('npm publish')
run(`npm dist-tag add "${packageName}@${version}" latest`)
run(`npm unpublish "${packageName}@${version}-readme"`)
run(`rm package.json`)
run(`mv package.json.old package.json`)

console.log('after')
