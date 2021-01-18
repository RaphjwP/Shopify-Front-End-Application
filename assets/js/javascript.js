var key = "232c80df"
var url = 'http://www.omdbapi.com/?apikey=232c80df&s='
var counterNominations = 0
var arrMovies = []

window.onload = function() {
    console.log("loaded successfully")
    var cookies = document.cookie
    console.log("Displaying Cookies if any" + cookies)
    if(cookies != ""){
        arrMovies = cookies.split(",")
    }

    console.log(arrMovies)
    if(arrMovies.length > 0){
        arrMovies.forEach(function() {
            var ul = document.getElementById("listNominations")
            var li = document.createElement("li")
            var btn = document.createElement("button")
            btn.innerHTML = "Remove"

            btn.onclick = function(){
                var obj = document.getElementById("rm"+title)
                var info = obj.innerText
                obj.remove();
                var btnEnable = document.getElementById(title)
                btnEnable.disabled = false;
                counterNominations--;
     
                var img = document.getElementById("banner")
                if(img != null){
                    img.remove();
                }
    
                info = info.substring(0, info.length-6);
                // If movie exists in array, remove from array
                arrMovies = arrMovies.filter(m => m !== info)
                document.cookie=arrMovies.join();
            }

            li.appendChild(document.createTextNode(info))
            li.appendChild(btn)
            ul.appendChild(li)
            counterNominations++;
        })
    }

}


function searchMovies(){


    var words = document.getElementById("searchInput").value;
    if(words.length > 0) {
        document.getElementById("searchInput").style.backgroundSize = "0 0";
    } else {
        document.getElementById("searchInput").style.backgroundSize = "30px 30px";
    }
    document.getElementById("results").innerHTML = "Results for " + ' " ' + words + ' " ';
    if(words.length >= 2){
        $.ajax({
            url: url+words,
            type: 'GET',
            success: function(results){
                console.log(results);
                displayMovies(results)
            },
            error: function(error){
                console.log(error);
            }

        })
    }
}

function displayMovies(json){
    var movies = json.Search
    console.log(movies)
    document.getElementById("listMovies").innerHTML =""
    if(movies == null) {
        console.log("No List of Movies")
    } else {
        movies.forEach(appendMovies)
    }
}

function appendMovies(movie){
    var ul = document.getElementById("listMovies")
    // Creates elements needed to be appended to Movies ul
    var li = document.createElement("li")
    var title = movie.Title
    var year = movie.Year
    var info = title + " (" + year + ")"
    var btn = document.createElement("button")
    btn.setAttribute("id", title)
    btn.innerHTML = "Nominate"
    // Adds the onclick function for nominate
    btn.onclick = function(){
        // Creates elements needed to be appended to Nomations ul
        var btn = document.getElementById(title)
        btn.disabled = true;
        var ul = document.getElementById("listNominations")
        var li = document.createElement("li")
        li.setAttribute("id", "rm"+title)
        var btn = document.createElement("button")
        btn.innerHTML = "Remove"
        //Adds the onclick function for remove
        btn.onclick = function(){
            // Remove li
            var obj = document.getElementById("rm"+title)
            var info = obj.innerText
            obj.remove();
            // Re-enable nomination buttons in case it is removed by mistake
            var btnEnable = document.getElementById(title)
            btnEnable.disabled = false;
            counterNominations--;

            
            var img = document.getElementById("banner")
            if(img != null){
                img.remove();
            }

            info = info.substring(0, info.length-6);
            // If movie exists in array, remove from array
            arrMovies = arrMovies.filter(m => m !== info)
            document.cookie=arrMovies.join();
        }
        li.appendChild(document.createTextNode(info))
        li.appendChild(btn)
        ul.appendChild(li)
        counterNominations++;

        if(counterNominations >= 5) {
            showBanner()
        }
        
        // Add Movie to Array in order to save them as cookies
        arrMovies.push(info)
        var string = arrMovies.join();
        document.cookie=string

    }
    li.appendChild(document.createTextNode(info))
    li.appendChild(btn)
    ul.appendChild(li)
}

function showBanner(){
    console.log("Five Nominations have been selected!")
    var img = document.createElement('img');
    img.setAttribute("id", "banner");
    img.src = "./assets/img/banner.png"
    document.getElementById("display").appendChild(img);
}