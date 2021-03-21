const addr = "https://brianseo.mywhc.ca/COMP4537/asn1/quotes/quotes";

function getAllQuotes(){
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", addr, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
            let arr = JSON.parse(this.responseText);
            document.getElementById("quotesdiv").innerHTML = "";

    		for(let i = 0; i < arr.length; i++) {
                readFromDB(arr[i]);
     		}
    	}
    }
}

function getRecentQuotes(){
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", addr + "/recent", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
		    let arr = JSON.parse(this.responseText);
            document.getElementById("quotesdiv").innerHTML = ""; 

    		for(let i = 0; i < arr.length; i++) {
         		readFromDB(arr[i])
     		}
    	}
    }
}

function readFromDB(quote){
    let qid = quote.QuoteID;
    let text = quote.Body;
    let source = quote.Source;

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

    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    sdiv.appendChild(slabel);
    sdiv.appendChild(stext);

    document.getElementById("quotesdiv").appendChild(qdiv);
    document.getElementById("quotesdiv").appendChild(sdiv);
}