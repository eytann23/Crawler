const mongoose = require("mongoose");

//Request model - every scraping request saved into the db
const scrapingRequestSchema = new mongoose.Schema(
	{
        url:{
            type: String,
            required:true
        },
        maxPages:{
            type: String,
            trim: true
        },
        maxDepth:{
            type: Number,
            required:true,
            min:0
        },
        isFinished:{
            type:Boolean,
            default:false
        },		
	},{
        timestamps: { 
            createdAt: 'created_at'
        } 
    }
);

const ScrapingRequest = mongoose.model("ScrapingRequest", scrapingRequestSchema);

module.exports = ScrapingRequest;