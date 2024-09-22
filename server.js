//===============inputs================//

const express = reuire('express');
const app = express () ;

//===============Mongoose================//

//===============Middleware================//

//===============Routes================//

app.get("/test", async (req,res) => {
    res.render('server.ejs')
})