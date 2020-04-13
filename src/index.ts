import express from 'express'
import {} from 'epics'

const port = isNaN(parseInt(process.env['PORT'])) ? 3000 : parseInt(process.env['PORT'])

const app = express()

app.get('*',(req,res)=>{
})

app.listen(port, ()=>console.log(`listening on port ${port}`))
