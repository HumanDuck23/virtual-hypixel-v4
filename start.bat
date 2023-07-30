@echo off

call tsc

cd src
node deploy-commands.js
node app.js

del .\commands\proxy\modules\cache.json

timeout 2
exit