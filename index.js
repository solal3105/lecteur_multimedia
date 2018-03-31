window.addEventListener("load", function (){
    var button = document.getElementById("valider");
    valider.addEventListener("click", httpGetAsync());
});
function httpGetAsync() {
    //chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
    var url = document.getElementById("txt").value;
    console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, true);
    xmlHttp.responseType = 'document';
    xmlHttp.overrideMimeType('text/xml');

    xmlHttp.onload = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var txt = xmlHttp.responseXML;
            var podcast = [];
            podcast['titre'] = txt.getElementsByTagName('title')[0].innerHTML;
            podcast['image'] = txt.getElementsByTagName('image')[0].getElementsByTagName('url')[0].innerHTML;

            console.log(podcast['titre']);
            console.log(podcast['image']);

            var tabItems = txt.getElementsByTagName('item');
            var item = [];

            for (var i = 0; i < tabItems.length; i++) {
                console.log("i : "+i); 
                item['mp3'] = tabItems[i].getElementsByTagName('guid')[0].innerHTML;
                item['titre'] = tabItems[i].getElementsByTagName('title')[0].innerHTML;
                item['description'] = tabItems[i].getElementsByTagName('description')[0].innerHTML;
                item['auteur'] = tabItems[i].getElementsByTagName('author')[0].innerHTML;
                item['categorie'] = tabItems[i].getElementsByTagName('category')[0].innerHTML;
                podcast.push(item);
                item=[];
            }

            document.getElementById("mainVideo").setAttribute("poster", podcast.image);

            //document.getElementById("img").src = txt.getElementsByTagName("url")[0].childNodes[0].nodeValue;

            for(var i = 0; i<podcast.length; i++){
                console.log("i : "+i);
                console.log("podcast : "+ podcast[6]);
                console.log("i2 :"+ i)
                div = document.createElement("div");
                div.className = 'item';

                text = document.createElement("p");
                text.className = "titre";
                text.innerHTML = podcast[i].titre;
                console.log(podcast[i].titre);
                div.appendChild(text);

                description = document.createElement("p");
                description.className = "description";
                description.innerHTML = podcast[i].description;
                div.appendChild(description);
                description.style.display = "none";

                mp3 = document.createElement("p");
                mp3.innerHTML = podcast[i].mp3;
                div.appendChild(mp3);
                mp3.style.display = "none";

                div.addEventListener("click", addListPodcast);

                document.getElementById("load").appendChild(div);
            }
        }
    }
    xmlHttp.send(null);
}

function myFunction() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("stickyheader");
        content.classList.add("stickycontent");
    } else {
        header.classList.remove("stickyheader");
        content.classList.remove("stickycontent");
    }
}

/*
function playVid() {
    var vid = document.getElementById("mainVideo");
    console.log(vid);
    //vid.poster=txt.getElementsByTagName("url")[0].innerHTML;
    // console.log("txt"+txt);
    //vid.poster="http://media.radiofrance-podcast.net/podcast09/RF_OMM_0000013901_ITE.jpg";
    vid.play();
    var titre = document.getElementById("titre");
}

function pauseVid() {
    var vid = document.getElementById("mainVideo");
    vid.pause();
}
*/
function playVid() {
    player=document.getElementById("mainVideo");
    if (player.paused) {
        if (player.getAttribute('src') === ''){
            console.log("player : ");
            console.log(player);
            var mp3 = document.getElementsByClassName("itemListPodcast")[0].getElementsByTagName("p")[0].innerHTML;
            console.log("mp3 : ");
            console.log(mp3);
            player.setAttribute('src', mp3);
            player.play();

        }
        else{
            player.play();
        }
    }
    else{
        player.play();
    }

}
function pauseVid() {
    player=document.getElementById("mainVideo");
    if (player.played){
        player.pause();
    }

}

function volumeVid() {
    var vol = document.getElementById("volume");
    var vid = document.getElementById("mainVideo");
    vid.volume = vol.value;
    console.log(vol.value);
}

function addListPodcast() {
    var item_podcast = this;
    item_podcast.remove();

    var titre = item_podcast.children[0].innerHTML;
    var description = item_podcast.children[1].innerHTML;
    var mp3 = item_podcast.children[2].innerHTML;

    div = document.createElement("div");
    div.className = 'itemListPodcast';

    h4 = document.createElement("h4");
    h4.innerHTML = titre;
    h4.id = "titre";

    h6 = document.createElement("h6");
    h6.id = "description";
    h6.innerHTML = description;

    btn_haut = document.createElement("button");
    btn_haut.className = "btn btn-primary";
    btn_haut.innerHTML = "Up";
    btn_haut.addEventListener("click", up);

    /*
    button_load = document.createElement("button");
    button_load.className = "btn btn-success";
    button_load.innerHTML = "Charger";
    button_load.addEventListener("click", loadItemInList);
    */
    btn_suppr = document.createElement("button");
    btn_suppr.className = "btn btn-danger";
    btn_suppr.innerHTML = "Delete";
    btn_suppr.addEventListener("click", suppr);

    p = document.createElement("p");
    p.setAttribute("hidden", "hidden");
    p.innerHTML = mp3;

    div.appendChild(h4);
    div.appendChild(h6);
    div.appendChild(p);
    div.appendChild(btn_haut);
    div.appendChild(btn_suppr);

    document.getElementById("player").appendChild(div);
}

function up() {
    var parent = this.parentNode;
    moveUp(parent);
}

function suppr() {
    var parent = this.parentNode;
    parent.remove();
    console.log(parent);
}

function moveUp(item) {
    var suiv = item.previousSibling;

    if (suiv.length === undefined){
        while( suiv && suiv.nodeType !== 1 && (suiv = suiv.previousSibling));
        item.parentNode.insertBefore(item, suiv);
    }

}

    /*var player = document.getElementById('liste');
    console.log(player)
    var newPlayer = document.createElement("div");
    newPlayer.id = "player" + j;
    player.appendChild(newPlayer);
    var selectione = document.getElementById(parent);
    selectione.remove();
    var title = document.createElement('p');
    newPlayer.appendChild(title);
    title.id = "playerTitle" + k;
    var link = document.createElement('p');
    newPlayer.appendChild(link);
    link.id = "playerLink" + k;
    var description = document.createElement('p');
    newPlayer.appendChild(description);
    description.id = "playerDescription" + k;
    var up = document.createElement('button');
    newPlayer.appendChild(up);
    up.id = "up" + k;
    up.innerHTML = "up";
    var down = document.createElement('button');
    newPlayer.appendChild(down);
    down.id = "down" + k;
    down.innerHTML = "down";
    var ecouter = document.createElement('button');
    newPlayer.appendChild(ecouter);
    ecouter.id = "ecouter" + k;
    ecouter.innerHTML = "ecouter";
    
    up.onclick = function(e2) {
        console.log(e2.target);
        var parent2 = e2.target.parentElement.id;
        console.log(parent2);
        idParent2 = document.getElementById(parent2);
        idParent2.parentNode.insertBefore(idParent2, idParent2.previousElementSibling);
        console.log(newPlayer);
    }
    down.onclick = function(e3) {
        console.log(e3.target);
        var parent3 = e3.target.parentElement.id;
        console.log(parent3);
        idParent3 = document.getElementById(parent3);
        idParent3.parentNode.insertBefore(idParent3.nextElementSibling, idParent3);
        console.log(newPlayer);
    }
    suppr.onclick = function(e2) {
        console.log(e2.target);
        var parent2 = e2.target.parentElement.id;
        console.log(parent2);
        idParent2 = document.getElementById(parent2);
        idParent2.parentNode.insertBefore(idParent2, idParent2.previousElementSibling);
        console.log(newPlayer);
    }
    ecouter.onclick = function(e4) {
        var mainVideo = document.getElementById("mainVideo");
        mainVideo.poster = txt.getElementsByTagName("url")[0].innerHTML;
        var parent4 = e4.target.parentElement.id;
        console.log(parent4);
        mainVideo.src = txt.getElementsByTagName("enclosure")[k].getAttribute('url');
        playVid();
    }
    document.getElementById("playerTitle" + k).innerHTML = txt.getElementsByTagName("title")[k].childNodes[0].nodeValue;
    //document.getElementById("playerLink" + k).innerHTML = txt.getElementsByTagName("link")[k].childNodes[0].nodeValue;
    document.getElementById("playerDescription" + k).innerHTML = txt.getElementsByTagName("description")[k].childNodes[0].nodeValue;
    console.log(document.getElementById("mainVideo").src);
    console.log(txt.getElementsByTagName("enclosure")[k].getAttribute('url'));
    //document.getElementById("video" + k).src = txt.getElementsByTagName("enclosure")[k].getAttribute('url');
    //document.getElementById("video" + k).setAttribute("controls", "controls");
    //appendChild(player);
    //newPlayer = document.getElementById(parent);
}*/