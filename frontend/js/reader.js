const xhttp = new XMLHttpRequest();
const path = "http://localhost:3000";

// makes get request for getting all quotes
function getAllQuotes(){
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
            let arr = JSON.parse(this.responseText);
            document.getElementById("quotesdiv").innerHTML = "";

    		for(let i = 0; i < arr.length; i++) {
                render(arr[i]);
     		}
    	}
    }
	
    xhttp.open("GET", path + "/quotes", true);
    xhttp.send();
}

// makes get request for getting the most recent quote
function getRecentQuotes(){
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
		    let arr = JSON.parse(this.responseText);
            document.getElementById("quotesdiv").innerHTML = ""; 

    		for(let i = 0; i < arr.length; i++) {
         		render(arr[i])
     		}
    	}
    }
	
    xhttp.open("GET", path + "/quotes/recent", true);
    xhttp.send();
}

// renders dom elements for each quote/author
function render(arr){
    let qid = arr.QuoteID;
    let text = arr.Body;
    let source = arr.Source;

    let qdiv = document.createElement("div");
    let qtext = document.createElement("textarea");
    let qlabel = document.createElement("label");

    qdiv.id = "quote" + qid;
    
    qtext.id = "qtext" + qid;
    qtext.name = "quote" + qid;
    qtext.rows = 3;
    qtext.innerHTML = text;
    qtext.readOnly = true;

    qlabel.htmlFor = "quote" + qid;
    qlabel.innerHTML = "Quote " + qid;

    let sdiv = document.createElement("div");
    let stext = document.createElement("textarea");
    let slabel = document.createElement("label");

    sdiv.id = "source" + source;

    stext.id = "stext" + qid;
    stext.name = "source" + qid;
    stext.rows = 3;
    stext.innerHTML = source;
    stext.readOnly = true;

    slabel.innerHTML = "Source " + qid;

    // appending elements
    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    sdiv.appendChild(slabel);
    sdiv.appendChild(stext);

    document.getElementById("quotesdiv").appendChild(qdiv);
    document.getElementById("quotesdiv").appendChild(sdiv);
}