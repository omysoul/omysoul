const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const run = cmd => {
  console.log(cmd)
  execSync(cmd, {
  //  cwd: path.join(__dirname, '..', 'packages', PACKAGE)
  } ,function (error, stdout, stderr) {
    util.print('stdout: ' + stdout);
    util.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}

run('rm -rf docs-temp')
run('mkdir docs-temp')
run('cp dist/bundle-vendor.js docs-temp')
run('cp dist/bundle-dist.js docs-temp')
run('cp examples/index-dist.html docs-temp/index.html')
run('rm -rf ../../docs/bible-react')
run('mv docs-temp ../../docs/bible-react')