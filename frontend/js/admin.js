// VARIABLES
let numqs = 0;
// const addr = "https://brianseo.mywhc.ca/COMP4537/asn1/quotes"
const addr = "http://localhost:3000/quotes";

function readFromDB(quote) {
    let qid = quote.QuoteID;
    let text = quote.Body;
    let source = quote.Source;

    // quote related elements
    let qdiv = document.createElement("div");
    let qtext = document.createElement("textarea");
    let qlabel = document.createElement("label");

    qdiv.id = "quote" + qid;
    
    qtext.id = "qtext" + qid;
    qtext.name = "quote" + qid;
    qtext.rows = 3;
    qtext.innerHTML = text;

    qlabel.htmlFor = "quote" + qid;
    qlabel.innerHTML = "Quote " + qid;

    // author related elements
    let adiv = document.createElement("div");
    let atext = document.createElement("textarea");
    let alabel = document.createElement("label");

    adiv.id = "source" + qid;

    atext.id = "atext" + qid;
    atext.name = "source" + qid;
    atext.rows = 3;
    atext.innerHTML = source;

    alabel.htmlFor = "source" + qid;
    alabel.innerHTML = "source" + qid;

    let bdiv = document.createElement("div");
    bdiv.id = "bdiv" + qid;

    let updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update in DB";
    updateBtn.id = "update" + qid;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete Quote";
    deleteBtn.id = "delete" + qid;

    // appending elements
    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    adiv.appendChild(alabel);
    adiv.appendChild(atext);

    bdiv.appendChild(updateBtn);
    bdiv.appendChild(deleteBtn);
    updateBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        update(id);
    });

    deleteBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        remove(id);
    });

    document.getElementById("quotesContainer").appendChild(qdiv);
    document.getElementById("quotesContainer").appendChild(adiv);
    document.getElementById("quotesContainer").appendChild(bdiv);
    numqs = qid;
}


function renderBlank(){
    numqs++;

    let qdiv = document.createElement("div");
    let qtext = document.createElement("textarea");
    let qlabel = document.createElement("label");

    qdiv.id = "quote" + numqs;
    
    qtext.id = "qtext" + numqs;
    qtext.name = "quote" + numqs;
    qtext.rows = 3;

    qlabel.htmlFor = "quote" + numqs;
    qlabel.innerHTML = "Quote " + numqs;

    let adiv = document.createElement("div");
    let atext = document.createElement("textarea");
    let alabel = document.createElement("label");

    adiv.id = "source" + numqs;

    atext.id = "atext" + numqs;
    atext.name = "source" + numqs;
    atext.rows = 3;

    alabel.htmlFor = "source" + numqs;
    alabel.innerHTML = "Source " + numqs;

    let bdiv = document.createElement("div");
    bdiv.id = "bdiv" + numqs;

    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save in DB";
    saveBtn.id = "save" + numqs;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete" + numqs;

    // appending elements
    qdiv.appendChild(qlabel);
    qdiv.appendChild(qtext);
    adiv.appendChild(alabel);
    adiv.appendChild(atext);

    bdiv.appendChild(saveBtn);
    bdiv.appendChild(deleteBtn);
    saveBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        save(id);
    });

    deleteBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        console.log(id);
        removeBlank(id);
    });

    document.getElementById("quotesContainer").appendChild(qdiv);
    document.getElementById("quotesContainer").appendChild(adiv);
    document.getElementById("quotesContainer").appendChild(bdiv);
}

// calls PUT request to update an existing quote
function update(qid) {
    let qtext = document.getElementById("qtext" + qid);
    let atext = document.getElementById("atext" + qid);
    let quote = qtext.value;
    let source = atext.value;
    let xhttp = new XMLHttpRequest();

    xhttp.open("PUT", addr, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    console.log(quote);

    let data = {QuoteID: qid, QuoteText: quote, Source: source};

    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 201) {
	    	console.log("put success!");
		    console.log(this.responseText);
    	}
    }
}

function remove(qid) {
    let xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", addr, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    let data = {QuoteID: qid};

    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = function(){
    	if (this.readyState == 4 && this.status == 200) {
	    	document.getElementById("quote"+qid).remove();
            document.getElementById("author"+qid).remove();
            document.getElementById("bdiv"+qid).remove();
    	}
    }
}

function removeBlank(qid) {
    let qdiv = document.getElementById("quote"+qid);
    let adiv = document.getElementById("author"+qid);
    let bdiv = document.getElementById("bdiv"+qid);
    qdiv.remove();
    adiv.remove();
    bdiv.remove();
    numqs--;
}

function save(qid) {
    let qtext = document.getElementById("qtext" + qid);
    let atext = document.getElementById("atext" + qid);
    let quote = qtext.value;
    let author = atext.value;
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", addr, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    let data = {QuoteText: quote, Source: author};

    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
		    console.log(this.response.insertId);
    	}
    }

    let bdiv = document.getElementById("bdiv" + qid);
    
    document.getElementById("save"+ qid).remove();
    let updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update in DB";
    updateBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        update(id);
    });

    document.getElementById("delete" + qid).remove();
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete" + qid;
    deleteBtn.addEventListener('click', function(e) {
        let id = e.currentTarget.id
        id = id.substr(id.length - 1);
        remove(id);
    });
    
    bdiv.appendChild(updateBtn);
    bdiv.appendChild(deleteBtn);
}

document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
		    console.log(this.responseText);
		    let arr = JSON.parse(this.responseText);
	    	console.log(arr);

    		for(let i = 0; i < arr.length; i++) {
                readFromDB(arr[i]);
     		}
    	}
    }

    // Send the GET request
    xhttp.open("GET", addr, true);
    xhttp.send();
})