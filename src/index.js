const scrapedPageRouter=require("./routers/scrapedPagesRouter");
const { finishLastScrape } = require('./utils/finishLastScrape');

const path = require('path')
const express = require ('express');
const cors = require ('cors');

require('./db/mongoose');
const app = express();

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
app.use(cors());
app.use(express.json());


app.use(scrapedPageRouter);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

finishLastScrape();