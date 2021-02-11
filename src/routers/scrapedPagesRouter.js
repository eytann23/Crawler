const express = require("express");
const Page=require("../models/pageModel");
const ScrapingRequest=require("../models/scrapingRequestModel");
const { scrapePageByURL } = require("../utils/crawler");

const router = new express.Router();

//scraping router - getting {url,maxDepth,maxPages} from client
router.post("/scrape", async (req, res) => {
	const {url,maxDepth,maxPages} = {...req.body};
	try {
		//saving request details to db
		const newScrapingRequest=new ScrapingRequest({url,maxDepth,maxPages});
		await newScrapingRequest.save();
		await scrapePageByURL(url,maxDepth,maxPages);
		await ScrapingRequest.updateOne(
			{_id:newScrapingRequest._id},
			{$set: {isFinished:true}}
		);
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get("/pages/get-all", async (req, res) => {
	try {
		const pages=await Page.find({});
		if(!pages){
			return res.send({
				status:404,
				message:"No pages data found"
			})
		}
		res.status(200).send(pages);
	} catch (err) {
		res.status(400).send(err);
	}
});


module.exports = router;