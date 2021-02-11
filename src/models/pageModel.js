const mongoose = require("mongoose");

//Page model
const pageSchema = new mongoose.Schema(
	{
        title:{
            type: String,
            trim: true
        },
        depth:{
            type: Number,
            required:true,
            min:0
        },
        currentPagesCount:{
            type: Number,
            required:true,
            min:0
        },
        url:{
            type: String,
            required:true
        },
        links:{
            type: Array,
            default:[]
        }
		
	},{
        timestamps: { 
            createdAt: 'created_at'
        } 
    }
);

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;