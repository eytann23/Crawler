import DataComponent from "./dataComponent.js";

const startScrape=(url,maxDepth,maxPages)=>{
    if (url && maxDepth && maxPages){
        //Updating scrape data in real time every 5 seconds
        const updateScrapedData=setInterval(()=>{
            updateDOM()
            },5000)

        fetch("http://localhost:3000/scrape",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url,maxPages,maxDepth})
        })
        .then(response => {
            clearInterval(updateScrapedData);
            updateDOM();
        })
        .catch((err)=>console.log(err))

    }
}

const form=document.getElementById("scraping__form");
const button=document.getElementById("scrape__button");
button.addEventListener("click",(e)=>{
    e.preventDefault();
    const url=form.elements[0].value;
    const maxDepth=form.elements[1].value;
    const maxPages=form.elements[2].value;
    startScrape(url,maxDepth,maxPages);
})

function updateDOM (){
    try{
        fetch("http://localhost:3000/pages/get-all")
        .then(response => response.json())
        .then(data => {
            if(data){
                const dataContainer=document.getElementById("data__container");
                dataContainer.innerHTML="";
                data.forEach(({url,depth,title,links}) => {
                    const dataComp=new DataComponent(url,title,depth,links)
                    dataContainer.appendChild(dataComp.createDOMcomponent());
                });
            }
        })   
    }catch(err){
        console.log(err)
    }
}