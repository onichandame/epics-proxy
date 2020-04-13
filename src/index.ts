import express from 'express'
import { Channel } from 'epics'

const port = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

const app = express()

app.get('*', (req, res) => {
  const pvname = req.path.slice(1)
  const pv = new Channel(pvname)
    .connect((err:Error) => {
      if (err) {
        console.log(err)
        res.status(500).send(JSON.stringify(err))
      }
      pv.get((error, data) => {
        if (error) {
          console.log(error)
          res.status(500).send(JSON.stringify(error))
        }
        res.status(200).send(JSON.stringify(data))
      })
    })
})

app.listen(port, () => console.log(`listening on port ${port}`))
