export default class DataComponent{
    constructor(url,title,depth,links){
        this.url=url;
        this.title=title;
        this.depth=depth;
        this.links=links;
    }

    createDOMcomponent(){
        const DOMcomponent=document.createElement('div');
        DOMcomponent.classList.add("data-item");
        const url = document.createElement('div');
        url.innerHTML=`URL: ${this.url}`;
        const title = document.createElement('div');
        title.innerHTML=`Title: ${this.title}`;
        const depth = document.createElement('div');
        depth.innerHTML=`Depth: ${this.depth}`;
        const links = document.createElement('div');
        links.innerHTML="Links: "
        this.links.forEach((link,index) => {
            const linkElement = document.createElement('div');
            linkElement.innerHTML=`${index+1}. ${link}`;
            links.appendChild(linkElement);
        });
        
        DOMcomponent.appendChild(url)
        DOMcomponent.appendChild(title)
        DOMcomponent.appendChild(depth)
        DOMcomponent.appendChild(links)

        return DOMcomponent;
    }
    
}