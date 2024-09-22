//===============inputs================//

const express = require('express');
const app = express () ;

//===============Mongoose================//

//===============Middleware================//

//===============Routes================//

app.get("/test", async (req,res) => {
    res.render('server.ejs')
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
  });