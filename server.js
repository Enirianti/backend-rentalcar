const express = require(`express`)
const app = express()
const port = process.env.PORT || 5000
const dbconnection = require(`./db`)

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", // allow only your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())

app.use('/api/users/', require('./routes/userRoute'))
app.use('/api/booking/', require('./routes/bookingRoute'))
app.use('/api/cars/', require('./routes/carRoute'))
app.get(`/`, (req, res) => res.send(`Hello World`))
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))