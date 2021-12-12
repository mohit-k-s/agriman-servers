const {globalserver} = require('./global-server')

globalserver().catch(err=>{
    console.log(err)
}) 