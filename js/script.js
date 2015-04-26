
var geocoder;
var map;
var markers = Array();
var infos = Array();

function initialize() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    // set initial position (New York)
    var myLatlng = new google.maps.LatLng(12.9667,77.5667);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
   // var mc = new MarkerClusterer(map);
}

// clear overlays function
var i=0,flag=0,flag1=0,l1,l2,l3, a = [0],c=[0],b=["North Indian","Chinese","Continental","South Indian","Italian","Thai", "Lounge","Cafe","supermarket","mall","hospital","school","hotel","atm","police","swimming","bank","worship"];
function lolmax(x){
    
    if(a[x-1]==1)
        a[x-1]=0;
    else
        a[x-1]=1;
    
    
    //alert(a[x]);
    
}
function print1(){
    if(flag1==0){
    var j=0,count=0,ans="";
    for (j=0;j<=17;j++)
        if(a[j]==1) c[count++]=b[j];
    else
        ans=ans+" 0 ";
    flag1=1;
    }

    //for(j=0;j<3;j++)
        //console.log(c[j]);
}
function setval(){
    if(flag==0)
    {
        l1=c[1];
        l2=c[2];
        l3=c[0];
        flag=1;
    }
}

function print2(){
    for(var j=0;j<3;j++)
        console.log(c[j]);
}

function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}

// clear infos function
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}

// find address function
function findAddress() {
    var address = document.getElementById("gmap_where").value;
    console.log("hihi "+address);
    // script uses our 'geocoder' in order to find location by address name
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok

            // we will center map
            var addrLocation = results[0].geometry.location;
            map.setCenter(addrLocation);

            // store current coordinates into hidden variables
            // document.getElementById('lat').value = results[0].geometry.location.Xa;
            // document.getElementById('lng').value = results[0].geometry.location.Ya;
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();
            console.log(results);

            // and then - add new custom marker
            var addrMarker = new google.maps.Marker({
                position: addrLocation,
                map: map,
                title: results[0].formatted_address,
                icon: 'marker1.png'
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// find custom places function
function findPlaces() {
    var type=[];
    // prepare variables (filter)
   
   //type.push(document.getElementById('gmap_type').value);
   print1();
   setval();
   //print2();
   var type = "food";
   var type1 = "hospital";
   var type2 = l2;
   //console.log(l1+" "+l2);
   console.log(type+" "+type1+" "+type2+"lol");
    var radius = document.getElementById('gmap_radius').value;
    var keyword = l3;
    console.log(" "+keyword);

    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
    var cur_location = new google.maps.LatLng(lat, lng);

    // prepare request to Places
    var request = {
        location: cur_location,
        radius: radius,
        types: [type,type1,type2]
    };
    if (keyword) {
        request.keyword = [keyword];
    }

    // send request
    service = new google.maps.places.PlacesService(map);
    service.search(request, createMarkers);
}
    var address=[];
    var jay=[]
// create markers (from 'findPlaces' function)
function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // if we have found something - clear map (overlays)
        clearOverlays();

        // and create new markers by search result
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            address.push(results[i].vicinity);
            jay.push(results[i].types[0]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
    
    console.log(results);
    console.log(address);
    console.log(jay);
    var bestplace=[];
    for (var i = 0; i < results.length; i++){
        bestplace.push(address[i].split(","));
    }
    var b=(results.length)/2;
    c=address[Math.floor(b)];
    var xxx="The Suggested Place is " + c.split(",");
    var yyy="The Second Suggested Place is " + address[Math.floor(b)-1].split(",");
    var element=document.getElementById("suggested");
    element.innerHTML=xxx+"<br>"+yyy;
    console.log("The Suggested Place is " + c.split(","));
    console.log("The Second Suggested Place is " + address[Math.floor(b)-1].split(","));
   
    //console.log(bestplace);
   // console.log(bestplace[9][2]);
}

// creare single marker function
function createMarker(obj) {

    // prepare new Marker object
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name
    });
    markers.push(mark);

    // prepare info window
    var infowindow = new google.maps.InfoWindow({
        content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name + 
        '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
    });

    // add event handler to current marker
    google.maps.event.addListener(mark, 'click', function() {
        clearInfos();
        infowindow.open(map,mark);
    });

//var markerCluster = new MarkerClusterer(map, markers);
    infos.push(infowindow);
    //console.log(infos);
}

// initialization
google.maps.event.addDomListener(window, 'load', initialize);
//console.log(infos);
