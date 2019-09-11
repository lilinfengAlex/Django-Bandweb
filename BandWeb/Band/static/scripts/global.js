/**
 * Created by Alex on 2017/2/20.
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof  window.onload != "function"){
        window.onload=func;
    }else {
        window.onload=function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {


    var parent= targetElement.parentNode;

    if (parent.lastChild===targetElement){
        parent.appendChild(newElement);

    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);

    }
}

function addClass(element,value) {

    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}


//当前页突出显示
function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers =document.getElementsByTagName("header");
    if  (headers.length === 0) return false;
    var navs =headers[0].getElementsByTagName("nav");
    if (navs.length === 0) return false;

    var links =navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) !==-1){
            links[i].className="here";

            //给body添加特有的id属性
            var linktext =links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);

function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem =document.getElementById(elementID);
    if (elem.movement){
        clearTimeout(elem.movement);
    }
    if (!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos =parseInt(elem.style.left);
    var ypos =parseInt(elem.style.top);
    var dist =0;
    if(xpos ===final_x && ypos===final_y){
        return true;
    }
    if(xpos<final_x){
        dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if (xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if (ypos>final_y){
        dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+ "px";
    var repeat ="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,20);
}

addLoadEvent(moveElement);

function prepareSlideshow() {
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("intro")) return false;

    var intro =document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");

    var frame = document.createElement("img");
    frame.setAttribute("src","/static/images/frame.png");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);

    var preview = document.createElement("img");
    preview.setAttribute("src","/static/images/slideshow.png");
    preview.setAttribute("alt","RotkRotkRotk");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    var links = intro.getElementsByTagName("a");
    var destination;
    for(var i=0; i<links.length;i++){
        links[i].onmouseover =function () {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") !==-1){
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") !==-1){
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") !==-1){
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") !==-1){
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") !==-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);

function showSection(id) {
    var sections =  document.getElementsByTagName("section");
    for(var i=0; i<sections.length;i++){
        if(sections[i].getAttribute("id") !== id){
            sections[i].style.display ="none";
            }else {
            sections[i].style.display ="block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles =document.getElementsByTagName("article");
    if (articles.length === 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length===0) return false;

    var nav = navs[0];
    var links =nav.getElementsByTagName("a");

    for (var i=0; i<links.length;i++){
        var sectionId =links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;

        document.getElementById(sectionId).style.display="none";
        links[i].destination = sectionId;

        links[i].onclick =function () {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);


function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source =whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    var text;
    if (whichpic.getAttribute("title")){
        text =whichpic.getAttribute("title");
    }else {
        text ="";
    }
    var description=document.getElementById("description");
    if (description.firstChild.nodeType===3){
        description.firstChild.nodeValue=text;
    }
    return false;
}

function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var placeholder =document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","/static/images/photos/placeholder.png");
    placeholder.setAttribute("alt","my image gallery");

    var description =document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links =gallery.getElementsByTagName("a");
    for (var i = 0; i<links.length; i++){
        links[i].onclick = function () {
            return showPic(this);
        }
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function stripeTables() {

    if (!document.getElementsByTagName) return false;
    var tables =document.getElementsByTagName("table");
    for (var i=0 ;i<tables.length;i++){
        var odd =false;
        var rows = tables[i].getElementsByTagName("tr");

        for (var j=0; j<rows.length;j++){
            if (odd===true){
                addClass(rows[j],"odd");
                odd = false;
            }else {
                odd = true;
            }
        }
    }
}


function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");

    for (var i=0; i<rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this,"highlight");
        };
        rows[i].onmouseout =function () {
            this.className=this.oldClassName;
        }
    }
}

function displayAbbreviations(){

    var defination;
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode)
        return false;
    //取得所有缩略词
    var abbreviations =document.getElementsByTagName("abbr");
    if (abbreviations.length<1) return false;
    var defs =[];
    //遍历所有缩略词
    for (var i=0;i<abbreviations.length;i++){
        var current_abbr =abbreviations[i];
        if(current_abbr.childNodes.length<1) continue;
        defination = current_abbr.getAttribute("title");
        var key= current_abbr.lastChild.nodeValue;
        defs[key] =defination;
    }
    // 创建定义列表
    var dlist=document.createElement("dl");
    // 遍历定义列表
    for(key in defs){
        defination=defs[key];
        // 创建定义标题
        var dtitle =document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        // 创建定义描述
        var ddesc =document.createElement("dd");
        var ddesc_text=document.createTextNode(defination);
        ddesc.appendChild(ddesc_text);
        // 把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length<1) return false;
    // 创建标题
    var header =document.createElement("h3");
    var header_text =document.createTextNode("Abbreviations");
    header.appendChild(header_text);

    var articles = document.getElementsByTagName("article");
    if (articles.length===0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);


function focusLabels() {
    if(!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i=0; i<labels.length;i++){
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick =function () {
            var id = this.getAttribute("for");
            if(!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}
addLoadEvent(focusLabels);

function resetFields(whichform) {

    for (var i=0; i<whichform.elements.length;i++){
        var element =whichform.elements[i];
        if(element.type === "submit") continue;
        var check = element.placeholder ||element.getAttribute("placeholder");
        if (!check) continue;
        element.onfocus =function () {
            var text = this.placeholder || this.getAttribute("placeholder");
            if(this.value===text){
            this.className="";
            this.value="";
            }

        };
        element.onblur = function () {
            if (this.value===""){
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }

        };
        element.onblur();
    }
}

function prepareForms() {
    for (var i=0; i<document.forms.length;i++){
        var thisform =document.forms[i];
        resetFields(thisform);
    }
}

addLoadEvent(prepareForms);