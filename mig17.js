let liveryobjmig

async function init(){
    document.getElementById("liverybutton").setAttribute("onclick", "listMig()");
    geofs.debug.loadMiG17GearDown();
    geofs.debug.loadMiG17GearUp();
    await fetch("https://raw.githubusercontent.com/kolos26/LiverySelector_MiG17_addon_aircraft/main/mig17.json").then(res => res.json()).then(data => liveryobjmig = data)
}

function loadMigLivery(textures){
    geofs.api.changeModelTexture(geofs.debug.MiG17GearDown.model._model, textures[0], 21);
    geofs.api.changeModelTexture(geofs.debug.MiG17GearDown.model._model, textures[1], 0);
    geofs.api.changeModelTexture(geofs.debug.MiG17GearDown.model._model, textures[2], 20);
    geofs.api.changeModelTexture(geofs.debug.MiG17GearUp.model._model, textures[0], 17);
    geofs.api.changeModelTexture(geofs.debug.MiG17GearUp.model._model, textures[1], 0);
    geofs.api.changeModelTexture(geofs.debug.MiG17GearUp.model._model, textures[2], 16);
}

function listMig(){
    if (geofs.addonAircraft.isMig17 == 1){
        document.getElementById("liverylist").innerHTML = "";

        liveryobjmig.liveries.forEach(function(e){
            var dropdown = document.createElement('li');
            dropdown.setAttribute("onpointerenter", "this.style.background='#dedede'");
            dropdown.setAttribute("onpointerleave", "this.style.background='#ffffff'");
            dropdown.innerHTML = e.name;
            let star = document.createElement("span");
            star.setAttribute("class", "fa fa-star nocheck");
            star.setAttribute("id", geofs.aircraft.instance.id + "_" + e.name);
            star.setAttribute("onclick", "star(this)");
            star.setAttribute("style", "float: right; padding-top: 15px;")
            dropdown.appendChild(star);
            dropdown.style.display = "block";
            dropdown.setAttribute("id", geofs.aircraft.instance.id + "_" + e.name + "_button");
            document.getElementById("liverylist").appendChild(dropdown);
            dropdown.setAttribute("onclick", "loadMigLivery(['"+ e.texture.toString().replaceAll(',', "','") +"'])");
        })
        sortList("liverylist");
        loadFavorites();
        sortList("favorites");
    } else {
        listLiveries();
    }
}

init();