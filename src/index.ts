import express from 'express'
import * as bodyParser from 'body-parser'
import { Channel } from 'epics'

const port = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT)

const app = express()

app.use(bodyParser.text())

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

app.put('*', (req, res) => {
  const pvname = req.path.slice(1)
  const value = req.body
  const pv = new Channel(pvname)
    .connect((err:Error) => {
      if (err) {
        console.log(err)
        res.status(500).send(JSON.stringify(err))
      }
      pv.put(value, (error:Error) => {
        if (error) {
          console.log(error)
          res.status(500).send(JSON.stringify(error))
        }
        res.status(200).send()
      })
    })
})

app.all('*', (req, res) => {
  res.send(`unsupported method ${req.method}`)
})

app.listen(port, () => console.log(`listening on port ${port}`))
