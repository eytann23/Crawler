const axios=require('axios');
const jsdom=require('jsdom');
const Page=require("../models/pageModel");

// scrapePageByURL using recursive function getAllDataFromURL
// at the end of every page scraping, the data saved
// data: {url,title,currentDepth,currentPagesCount,links}
exports.scrapePageByURL= async (url,maxDepth,maxPages)=>{
    let pagesCounter=0;
    const getAllDataFromURL=async (url,currentDepth=1)=>{
        if (currentDepth>maxDepth) return;
        axios.get(url)
            .then(async (res)=>{
                const dom=new jsdom.JSDOM(res.data)
                const data={
                    title:dom.window.document.title,
                    depth:currentDepth,
                    currentPagesCount:pagesCounter,
                    url,
                    links:[]
                };
                dom.window.document.querySelectorAll('a').forEach(link => {
                    data.links.push(link.href)
                    pagesCounter++;
                    if (pagesCounter>=maxPages) return;
                    getAllDataFromURL(link.href,currentDepth+1)
                });
                return data;
            })
            .then(async(data)=>{
                const page = new Page({...data})
                await page.save();
            })
            .catch(err=>{
                console.log(err.message)
            })
    }
    getAllDataFromURL(url)
}