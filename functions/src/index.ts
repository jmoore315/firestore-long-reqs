import axios from "axios"
import * as functions from "firebase-functions"

import moment = require("moment")
import express = require("express")
const cors = require("cors")
const https = require("https")

const api = express()
api.use(cors())

const httpsAgent = new https.Agent({ keepAlive: true })

api.post("/send-requests", (req, res) => {
  const promise = sendRequests()
  res.sendStatus(200)
  return promise
})

const sendRequests = async () => {
  for (let i = 0; i < 5; i++) {
    const beforeExampleReq = moment()
    await axios.request({
      url: "https://www.example.com",
      httpsAgent,
    })
    const afterExampleReq = moment()
    console.log(
      `Example.com req time: ${afterExampleReq.diff(beforeExampleReq, "ms")} ms`
    )
  }
}

exports.api = functions.https.onRequest(api)
