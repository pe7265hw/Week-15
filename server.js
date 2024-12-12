const express = require('express')
const apiRoutes = require('./routes/api')
const path = require('path')

const app = express()

const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles) //anytime a request made to home directory, serve static files - the Vue app index.html

app.use(express.json())
app.use('/api', apiRoutes)

//used when a mathcing route can't be found (Cannot GET/...)
app.use(function(req, res, next){
    res.status(404).send('Womp womp, not found.')
    //todo
})

//used to handle errors that could not be handled in api call, sent on from 'next(err)'
app.use(function(err, req, res, next){
    console.log(err.stack)
    res.status(500).send('Server error')
})

//tells server to listen on port 3000 if no other port is specified
const server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port ', server.address().port)
})