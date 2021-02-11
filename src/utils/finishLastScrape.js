const Page=require("../models/pageModel");
const ScrapingRequest=require("../models/scrapingRequestModel");
const { scrapePageByURL } = require("./crawler");

//continue from last page if the scraping process failed
exports.finishLastScrape=async ()=>{
    //get the last scraping request
    const lastScrapingRequest=await ScrapingRequest.findOne({},{}, { sort: { 'created_at' : -1 } });

    if (lastScrapingRequest && !lastScrapingRequest.isFinished){
        //get last the last scraped page
        const lastPageScraped=await Page.findOne({},{}, { sort: { 'created_at' : -1 } });
        
        //continue scraping from the point the process stopped
        const url=lastPageScraped.url;
        const maxDepth=lastScrapingRequest.maxDepth-lastPageScraped.depth;
        const maxPages=lastScrapingRequest.maxPages-lastPageScraped.currentPagesCount;
        await scrapePageByURL(url,maxDepth,maxPages)
        await ScrapingRequest.updateOne({_id:lastScrapingRequest._id} , {$set: {isFinished:true}})
    }
}