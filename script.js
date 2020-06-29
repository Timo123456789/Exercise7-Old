


/**
*@author: Timo Lietmeyer, 459 169
*@version: 6,
*
*@desc Main Method
*@param  array_with_calculated_distances, array, which includes the values of the distance between two points
*@param array_with_calculated_bearing, array, which includes the values of the bearing for two points
*@param t1, temporary variable for 'for-loops', 0, because the index of a array starts there
*@param t2, temporary variable for 'for-loops', 0, because the index of a array starts there
*
*/
//****various Linter configs****
// jshint esversion: 6
// jshint browser: true
// jshint node: true
// jshint -W097
"use strict";


var point;
var pointcloud;



function main(point, pointcloud) {
  screen_User_Position(point);





  console.log("Main: point" + JSON.stringify(point));
  console.log("Main: pointcloud" + pointcloud);
  if (typeof pointcloud === 'string') { pointcloud = JSON.parse(pointcloud); }
  if (typeof point === 'string') { point = JSON.parse(point); }








  var array_with_calculated_distances = [pointcloud.features.length];
  var array_with_calculated_bearing = [pointcloud.features.length];

  var length = pointcloud.features.length + 1;
  var t1 = 0;
  var t2 = 0;

  /**
  *@desc 'For-loop' to get the values of the method 'distance' in array array_with_calculated_distances
  *
  */



  for (let i = 0; i < pointcloud.features.length; i++) {
    if (length >= t1) {
      array_with_calculated_distances[t1] = Math.round(distance(change(convert_GJSON_to_Array(point, 0)), convert_GJSON_to_Array(pointcloud, i)));
      t1++;

    }
  }

  /**
  *@desc 'For-loop' to get the values of the method 'bearing' in array array_with_calculated_bearing
  *
  */

  for (let i = 0; i < pointcloud.features.length; i++) {
    if (length >= t2) {
      array_with_calculated_bearing[t2] = bearing(change(convert_GJSON_to_Array(point, 0)), change(convert_GJSON_to_Array(pointcloud, i)));
      t2++;
    }

  }

  /**
  *
  *@desc creates the array array_of_objects
  *creates objects to fill this array, objects consists of values of arrays array_with_calculated_distances and array_with_calculated_bearing
  *@param array_of_objects, array with objects, which includes point 1, point 2, distance between point 1 and point 2 and the bearing of point 1 to point 2
  *
  */

  var array_of_objects = [];
  var number_of_stops = pointcloud.features.length;
  for (let i = 0; i < number_of_stops; i++) {
    var pwb = {

    };

    pwb.point = convert_GJSON_to_Array(point, 0);
    pwb.pointcloud = pointcloud.features[i].properties.lbez + "  (" + pointcloud.features[i].properties.richtung + ")";
    pwb.stopnumber = pointcloud.features[i].properties.nr;
    pwb.array_with_calculated_distances = array_with_calculated_distances[i];
    pwb.array_with_calculated_bearing = array_with_calculated_bearing[i];
    array_of_objects.push(pwb);

  }


  /**
  *
  *@desc runs the method 'sort' with the array array_of_objects to sort this array based on distance
  *@param array_of_objects, array with objects, which includes point 1, point 2, distance between point 1 and point 2 and the bearing of point 1 to point 2
  *
  */



  sort(array_of_objects);


  getXHRObject(array_of_objects[0].stopnumber);

  /**
  *
  *@desc runs the method 'mtable' with the array array_of_objects to create a dynamic table on the HTML site
  *@param array_of_objects, array with objects, which includes point 1, point 2, distance between point 1 and point 2 and the bearing of point 1 to point 2
  *
  */

  mtable(array_of_objects);


}
































/**
*
*@@desc sort of array array_of_objects in ascending order based on the distance with 'bubble sort'
*@param array_of_objects, array with objects, which includes point 1, point 2, distance between point 1 and point 2 and the bearing of point 1 to point 2
*@return array_of_objects sorted based on distance
*/


function sort(array_of_objects) { //Insertion Sort


  var temp;
  for (var i = 1; i < array_of_objects.length; i++) {
    temp = array_of_objects[i];
    var j = i;
    while (j > 0 && array_of_objects[j - 1].array_with_calculated_distances > temp.array_with_calculated_distances) {
      array_of_objects[j] = array_of_objects[j - 1];
      j--;
    }
    array_of_objects[j] = temp;
  }

  return array_of_objects;

}




/**
*
*@desc Creates a table on the HTML Site
*@param array_of_objects, array with objects, which includes point 1, point 2, distance between point 1 and point 2 and the bearing of point 1 to point 2
*/

function mtable(array_of_objects) {

  //Variablendeklaration
  var table = document.getElementById("Table");






  for (var i = 0; i < 10; i++) {


    var row = table.insertRow();  //insert a row
    row.setAttribute("class", "rt1");


    var point = row.insertCell()
    point.innerHTML = array_of_objects[i].point;
    point.setAttribute("class", "t1"); //insert cell at the row variable with the point (point 1) value on place i of array array_of_objects

    var pointcloud = row.insertCell()
    pointcloud.innerHTML = array_of_objects[i].pointcloud;
    pointcloud.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

    var array_with_calculated_distances = row.insertCell();
    array_with_calculated_distances.innerHTML = array_of_objects[i].array_with_calculated_distances; //insert cell at the row variable with the distance value on place i of array array_of_objects
    array_with_calculated_distances.setAttribute("class", "t1");

    var array_with_calculated_bearing = row.insertCell();
    array_with_calculated_bearing.innerHTML = array_of_objects[i].array_with_calculated_bearing; //insert cell at the row variable with the bearing value on place i of array array_of_objects
    array_with_calculated_bearing.setAttribute("class", "t1");


  }




}
/**
*
*@desc Returns the distance between p1 and p2
*@param  p1, first point
*@param p2 second point
*@return d(istance) as var
*Source:  https://www.movable-type.co.uk/scripts/latlong.html
*/


function distance(p1, p2) {
  var R = 6374e3;

  var a1 = toRadial(p1[1]);

  var a2 = toRadial(p2[1]);

  var deltaKA = toRadial(p2[1] - p1[1]);
  var deltaphi = toRadial(p2[0] - p1[0]);


  var a = Math.sin(deltaKA / 2) * Math.sin(deltaKA / 2) +
    Math.cos(a1) * Math.cos(a2) *
    Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;


  return d;


}

/**
*
*@desc Returns the direction in from P1 to P2
*@param  p1, first point
*@param p2 second point
*@return direction as string (N,NE,E,SE,S,SW,W,NW)
*Source:  https://www.movable-type.co.uk/scripts/latlong.html
*/

function bearing(p1, p2) {

  var a1 = toRadial(p1[1]);

  var a2 = toRadial(p2[1]);
  var y = Math.sin(toRadial(p2[0] - p1[0])) * Math.cos(a2);
  var x = Math.cos(a1) * Math.sin(a2) -
    Math.sin(a1) * Math.cos(a2) * Math.cos(toRadial(p2[0] - p1[0]));
  var brng = todegree(Math.atan2(y, x));






  // If Clauses, to return the right strings

  if (brng >= 0) {  //brng is positive (N, NE, E, SE, S)

    if (brng <= 22.5 && brng >= 0) {

      return "N";
    }
    if (brng <= 67.5 && brng >= 22.5) {

      return "NE";
    }
    if (brng <= 112.5 && brng >= 67.5) {

      return "E";
    }
    if (brng <= 157.5 && brng >= 112.5) {

      return "SE";
    }
    if (brng <= 180 && brng >= 157.5) {

      return "S";
    }

  }

  else { //brng is negative (N,NW,W,SW,S)

    if (brng >= 0 && brng <= -22.5) {

      return "N";
    }
    if (brng >= -67.5 & brng <= -22.5) {

      return "NW";
    }
    if ((brng >= -112.5) & (brng <= -67.5)) {

      return "W";
    }
    if (brng >= -157.5 & brng <= -112.5) {

      return "SW";
    }
    if (brng >= -180 && brng <= -157.5) {

      return "S";
    }
  }



}


/**
*@desc calculates a value from  degree to radians
*@param  a = passed variable
*@param pi = 3.14159265359
*@return a in radians with (a*(pi/180))
*/
function toRadial(a) {
  var pi = 3.14159265359;
  return (a * (pi / 180));
}


/**
*@desc calculates a value from  radians to degree
*@param  a = passed variable
*@param pi = 3.14159265359
*@return a in degree with (a*(180/pi))
*/

function todegree(a) {
  var pi = 3.14159265359;
  return (a * (180 / pi));

}






///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ÜBUNG 2////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

//GETLOCATION

/**
*@desc return the user location via Callback function "showPosition"
*@param  t = temporary variable
*
*
*/
var t = document.getElementById("geojsontextarea");
function getLocation() {

  console.log("getlocation");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    t.innerHTML = "Geolocation is not supported by this browser.";
  }

}
/**
*@desc callback function for "getLocatin" function
*@param  position = variable to save the position#
*@param actpos = array for main method with user position and pointcloud array
*
*
*/
function showPosition(position) {

  t.innerHTML = "User position: " + "<br>Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  var actpos = [];
  actpos.push(position.coords.longitude);
  actpos.push(position.coords.latitude);
  actpos = convert_point_to_GJSON(actpos);
  document.getElementById("geojsontextarea").value = JSON.stringify(actpos);
  console.log("Darstellen");

  screen_User_Position(actpos);



}








//GJSON
/**
*@desc convert Array of points in GJSON Feature
*@param  arrayofpoints = temporary variable
*@param featColl = Feature Collection of GeoJSON
*@param featObj = Feature Object of GeoJSON
*@return featColl with values and GeoJSON semantic
*
*/


function convert_arrayofpoints_toGJSON(arrayofpoints) {
  var featColl = { type: "FeatureCollection", features: [] };



  for (let i = 0; i < arrayofpoints.length; i++) {
    var FeatObj = {
      type: "Feature",
      properties: []
    };

    FeatObj.geometry = {
      type: "Point",
      coordinates: arrayofpoints[i]




    }; featColl.features.push(FeatObj);

  }

  return featColl;
}

/**
*@desc convert point in GJSON Feature
*@param  point = temporary variable
*@param GJSONPoint = Feature Collection of GeoJSON
*@param featObj2 = Feature Object of GeoJSON
*@return GJSONPoint with values and GeoJSON semantic
*
*/

function convert_point_to_GJSON(point) {
  var GJSONPoint = { type: "FeatureCollection", features: [] };
  var FeatObj2 = {
    type: "Feature",
    properties: []
  };

  FeatObj2.geometry = {
    type: "Point",
    coordinates: point




  };
  GJSONPoint.features.push(FeatObj2);

  return GJSONPoint;


}

/**
*@desc convert GJSON on index i to array
*@param  GJSON = GeoJSON Feature
*@param i = index of GeoJSON Feature Array
*@return Array of coordinates at index i of param GJSON
*
*/

function convert_GJSON_to_Array(GJSON, i) {
  return GJSON.features[i].geometry.coordinates;
}

/**
*@desc return true, when test is an GeoJSON Object or false when test is not a GeoJSON Object
*@param  test = object
*
*@return true or false
*
*/

function isGJSON(test) {
  if (test.features != null) { return true; }
  else {
    return false;
  }

}





//InsertText
/**
*@desc convert a inserted text string to GJSON Point and run main methode with this value
*Uses Try-Catch to log an Error Screen, when  the input is not in GeoJSON semantic
*@param readpoint = inserted text string as GeoJSON Point
*
*/
function calculate_with_one_point() {

  var readpoint = document.getElementById("readpoint").value;

  try {
    var t = JSON.parse(readpoint);
    if (convert_GJSON_to_Array(t, 0) != null) {
      main(t, pointcloud);
    }



  } catch (e) {
    window.alert("Insert GeoJSON only");
  }


  /**
  *@desc convert a inserted text strings to GJSON Point and GJSON Multipoint Feature and run main methode with this value
  *Uses Try-Catch to log an Error Screen, when  the input is not in GeoJSON semantic
  *@param readpoint = inserted text string as GeoJSON Point
  *@param readpointcloud = inserted text string as GeoJSON Multipoint
  *
  */
}

function calculate_with_one_point_and_pointcloud() {
  var readpoint = document.getElementById("readpoint").value;
  var readpointcloud = document.getElementById("readpointcloud").value;
  try {
    var point = JSON.parse(readpoint);
    var pointcloud = JSON.parse(readpointcloud);
    if ((convert_GJSON_to_Array(pointcloud, 1) != null) && (convert_GJSON_to_Array(point, 0) != null)) {
      main(point, pointcloud);
    }



  } catch (e) {
    window.alert("Insert GeoJSON only");
  }


}

/**
*@desc running Main Method with origin point and pointcloud values
*@param point
*@param pointcloud
*
*/

function calculate_with_origin_point_and_pointcloud() {
  main(point, pointcloud);
}


///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ÜBUNG 3////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/**
*@desc get a XHR Object and turns this GJSON to the main method via callbackfunctions
*@param ID = Busstop ID, 0 for only busstops and not the arrival times of the lines
*@param ressource = link for the API
*
*/


async function getXHRObject(ID) {
  var Code = "haltestellen";
  var resource = "";
  if (ID == 0) { resource = "https://rest.busradar.conterra.de/prod/" + Code; }
  else { resource = "https://rest.busradar.conterra.de/prod/" + Code + "/" + ID + "/abfahrten?sekunden=1200"; }

  // console.log(resource);

  var x = new XMLHttpRequest();
  var y;
  x.onload = loadcallback;
  x.onerror = errorcallback;
  x.onreadystatechange = statechangecallback;
  x.open("GET", resource, true);
  x.send();
  return x;




  /**
  *@desc callback function for the state of APIs query
  *@param x = API Object
  *
  */



  function statechangecallback(x) {

    //    console.dir(x);


    //  console.log("statusvonx  "+this.status+" xreadystate  "+this.readyState);
    if (x.status == "200" && x.readyState == 4) {
      //  console.log("test1.2");
      //  console.log(x.responseText);
      document.getElementById("content").innerHTML = x.responseText + JSON.stringify(JSON.parse(x.responseText), null, 4);



    }



  }

  /**
  *@desc error function
  *
  */
  function errorcallback(e) {
    console.dir(x);
    console.dir(e);
    document.getElementById("content").innerHTML = "errorcallback: check web-console";
  }


  /**
  *@desc callback method to turn a GJSON Object with all busstops outside of the callback function
  *When  ID is not 0 goes another function further
  *@param x=API Object
  *@param jhaltestellen = GJSON Object with all busstops and their values
  *
  */

  function loadcallback() {
    //  console.dir(x);
    //  console.log(x.status);

    var u = JSON.parse(x.response);

    if (u.features != null) {

      var j = u.features.length;
      var jhaltestellen = { type: "FeatureCollection", features: [] };

      for (var i = 0; i < j; i++) {

        jhaltestellen.features[i] = u.features[i];
      }

      jhaltestellen = JSON.stringify(jhaltestellen);
      console.log(jhaltestellen);
      //screen_busstops(jhaltestellen);
      //calculate_busstops(jhaltestellen);
      return jhaltestellen
    }
    else {


      mtablestops(u);

    }


  }
}


/**
*@desc run main method with busstop object, and point from inserted text field or user location
*@param busstops
*
*/

function calculate_busstops(busstops) {
  var readpoint = document.getElementById("readpoint").value;
  main(readpoint, busstops);
}

/**
*
*@desc Creates a table on the HTML Site
*@param array_of_objects, array with objects, which includes the lines and their departure and arrival times
*/

function mtablestops(array_of_objects) {

  //Variablendeklaration
  var table = document.getElementById("Table2");



  //  console.log("table2");


  for (var i = 0; i < array_of_objects.length; i++) {

    //    console.log("table2for");

    var row = table.insertRow();  //insert a row
    row.setAttribute("class", "rt2");



    var richtungstext = row.insertCell();
    richtungstext.innerHTML = array_of_objects[i].richtungstext;
    richtungstext.setAttribute("class", "t2"); //insert cell at the row variable with the bearing of the line

    var linienid = row.insertCell();
    linienid.innerHTML = array_of_objects[i].linienid;
    linienid.setAttribute("class", "t2"); //insert cell at the row variable with with the lines number


    var ankunftszeit = row.insertCell();
    ankunftszeit.innerHTML = convert_unixtime(array_of_objects[i].ankunftszeit);
    ankunftszeit.setAttribute("class", "t2");//insert cell at the row variable with the arrival time

    var abfahrtszeit = row.insertCell();
    abfahrtszeit.innerHTML = convert_unixtime(array_of_objects[i].abfahrtszeit);
    abfahrtszeit.setAttribute("class", "t2")//insert cell at the row variable with the planned departure time

    var tatabf = row.insertCell();
    tatabf.innerHTML = convert_unixtime(array_of_objects[i].tatsaechliche_abfahrtszeit);
    tatabf.setAttribute("class", "t2");//insert cell at the row variable with the right departure time

  }






}

/**
*
*@desc converts a unix time variable to 24h format and return this
*@param t = unix time variable
*@return converted unix time variable
*/

function convert_unixtime(t) {

  var dt = new Date(t * 1000);
  var hr = dt.getHours();
  var m = "0" + dt.getMinutes();
  var s = "0" + dt.getSeconds();
  return hr + ':' + m.substr(-2) + ':' + s.substr(-2);


}







///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ÜBUNG 4/6 ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

var layergroup = L.layerGroup();


var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



async function create_heatmap() {


  var heatlayer = await screen_busstops();
  console.log("heatlayerexport")

  var heat = L.heatLayer(heatlayer, { radius: 25 });
  var heatlayer = L.layerGroup([heat]);
  var overlayMaps = {
    "heatlayer": heatlayer
  }

  L.control.layers(null, overlayMaps).addTo(map)
}

var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: '',
    iconSize: [19, 47.5],
    shadowSize: [50, 64],
    iconAnchor: [11, 47],
    shadowAnchor: [4, 62],
    popupAnchor: [-1.5, -38]
  }
});


var bicon = new LeafIcon({ iconUrl: 'src/bus-stop-pointer.png' });
L.icon = function (options) {
  return new L.Icon(options);
};




async function screen_busstops(busstops) {


  busstops = await getstops();

  if (typeof busstops === 'string') { busstops = JSON.parse(busstops); }
  //no Heat Map
  /*//for (var i = 0; i < busstops.features.length; i++) {
   //  for (var i = 0; i<20;i++){
 
     L.marker(change(convert_GJSON_to_Array(busstops, i)), { icon: bicon }).addTo(map) // [51.5, -0.09] change(convert_GJSON_to_Array(busstops,i))
       .bindPopup("Bezeichnung:  " + busstops.features[i].properties.lbez + "  (" + busstops.features[i].properties.richtung + ")" + "<br>" + "Nummer: " + busstops.features[i].properties.nr)
   }*/




  var heatarray = [];

  for (var i = 0; i < busstops.features.length; i++) {

    heatarray.push(change(convert_GJSON_to_Array(busstops, i)));

  }




  return heatarray;


}



function screen_User_Position(actpos) {



  L.marker((convert_GJSON_to_Array(actpos, 0)),/*{icon: bicon}*/).addTo(map) // [51.5, -0.09] change(convert_GJSON_to_Array(busstops,i))
    .bindPopup("Selected Point")
}


/**
  *@desc change values of an array
  
  *
  */

function change(array) {
  //  console.log("arrayohnewechsel"+array);
  var temp;
  temp = array[0];
  array[0] = array[1];
  array[1] = temp;

  //console.log("arraygewechselt"+array);
  return array;
}




function inserted_address() {
  var InsertedText = document.getElementById("searchadress").value;
  var APIKey = ""
  var resource = "https://geocode.search.hereapi.com/v1/geocode?q=" + InsertedText/*Invalidenstr+117%2C+Berlin*/ + "&apiKey=" + APIKey

  console.log(resource);

  // console.log(resource);

  var x = new XMLHttpRequest();
  var y;
  x.onload = loadcallback;
  x.onerror = errorcallback;
  x.onreadystatechange = statechangecallback;
  x.open("GET", resource, true);
  x.send();




  /**
  *@desc callback function for the state of APIs query
  *@param x = API Object
  *
  */



  function statechangecallback(x) {

    console.dir(x);


    console.log("statusvonx  " + this.status + " xreadystate  " + this.readyState);
    if (x.status == "200" && x.readyState == 4) {
      console.log("test1.2");
      console.log(x.responseText);
      document.getElementById("content").innerHTML = x.responseText + JSON.stringify(JSON.parse(x.responseText), null, 4);



    }



  }

  /**
  *@desc error function
  *
  */
  function errorcallback(e) {
    console.dir(x);
    console.dir(e);
    document.getElementById("content").innerHTML = "errorcallback: check web-console";
  }


  /**
  *@desc callback method to turn a GJSON Object with all busstops outside of the callback function
  *When  ID is not 0 goes another function further
  *@param x=API Object
  *@param jhaltestellen = GJSON Object with all busstops and their values
  *
  */

  function loadcallback() {
    console.dir(x);
    console.log(x.status);

    var u = JSON.parse(x.response);

    console.log(u);


  }
}










///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ÜBUNG 5////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/**
 *@desc AJAX Function (POST) to Add a GJSON Object from a textfield to the database
 *@param result: GJSON Objet
 *
 */
function Add_GJSON_to_DB() {

  var result = document.getElementById("geojsontextarea").value;
  console.log("result:  " + JSON.stringify(result));

  result = JSON.parse(result);

  return new Promise(function (res, rej) {
    $.ajax({
      url: "/item",
      method: "POST",
      data: result,
      success: function (result) {
        res(result);
        document.getElementById("geojsontextarea").value = " ";
        show_DB();
      },
      error: function (err) { console.log(err) }
    });
  })


}

/**
  *@desc Async Function to display radio buttons on the website
  *
  *
  */

async function screen_favorites() {
  try {
    var result = await load_GJSON_from_db();
    console.log(JSON.stringify(result));

    create_list_of_ratio_buttons(result);

  }
  catch (error) {
    console.dir(error)
  }

}

/**
  *@desc Function to create a list of ratio buttons from a GJSON Object
  *@param GJSON = GJSON Object
  *
  */

function create_list_of_ratio_buttons(GJSON) {
  document.getElementById("radiobuttons").innerHTML = "";



  var list = document.getElementById("radiobuttons");
  for (var i = 0; i < GJSON.length; i++) {
    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = GJSON[i].features[0].geometry.coordinates;


    x.setAttribute(
      "type",
      "radio",
    );
    x.setAttribute(
      "name",
      "value"
    );
    list.appendChild(x);
    list.appendChild(y);
  }

}

/**
  *@desc Async Function to show the actuall database on website. Uses create_list_of_ratio_buttons for getting data
  *@param db = Object of GJSON Data from database
  *
  */

async function show_DB() {
  console.log("showdb");

  var db = await load_GJSON_from_db();
  document.getElementById("radiobuttons").innerHTML = "";
  create_list_of_ratio_buttons(db);

}

/**
  *@desc Function to create a object with  database IDs and their coordinates
  *@param db = Object of GJSON Data from database
  *@param arr_db = Object with IDs and their coordinates
  *
  */

async function create_Object_with_IDs_and_coordinates() {

  var db = await load_GJSON_from_db();
  var arr_db = []
  for (var i = 0; i < db.length; i++) {
    var obj_id_coor = {

    };
    obj_id_coor.id = db[i]._id;
    obj_id_coor.coordinates = db[i].features[0].geometry.coordinates;
    arr_db.push(obj_id_coor);



  }
  console.log(arr_db);

  return arr_db;
}



/**
  *@desc Async Function to get the value of the checked radio button
  *@param radios = node list with all values from radio button list
  *
  */

async function check_radios() {
  var radios = document.getElementsByName("value");
  console.log(radios);
  var db = [];
  db = await create_Object_with_IDs_and_coordinates();
  console.log("db");

  console.log(db);


  for (var i = 0; i < radios.length; i++) {
    console.log("in for");

    if (radios[i].checked == true) {
      console.log("ist radio an " + i + " true");
      console.log("radio_id" + db[i].id + " coor " + db[i].coordinates);
      delete_point_from_DB(db[i]);

    }

  }

}

/**
  *@desc function to delete a value from database
  *@param db = database ID for to deleted object
  *
  *
  */

function delete_point_from_DB(db) {
  var temp = db;
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/item",
      method: "DELETE",
      data: temp,
      success: function (result) {
        res(result);
        show_DB();
      },
      error: function (err) { console.log(err) }
    });
  })


}


/**
  *@desc function to get a value from selected radio button
  *@param db = database ID for object id in database
  *
  *
  */

async function value_from_selected_point(db) {


  var radios = document.getElementsByName("value");
  console.log(radios);

  console.log("db id obj:" + db.id);
  console.log("db id obj:" + db.coordinates);



  var temp = db;

  return new Promise(function (res, rej) {
    $.ajax({
      url: "/item",
      method: "GET",
      data: temp,
      success: function (result) {
        res(result);
      },
      error: function (err) { console.log(err) }
    });
  })





}
/**
  *@desc Async Function to get the value of the checked radio buttons on the main site
  *@param radios = node list with all values from radio button list
  *@param jhalte = list of busstops
  */


async function check_radios_on_main_site() {
  //console.log("tabellen leergeputzt?")
  clean_tables();
  var jhalte = await getstops();

  var radios = document.getElementsByName("value");

  var db = [];
  db = await create_Object_with_IDs_and_coordinates();



  for (var i = 0; i < radios.length; i++) {


    if (radios[i].checked == true) {

      var point = await value_from_selected_point(db[i]);


      var point = convert_point_to_GJSON(change(point[0].features[0].geometry.coordinates));
      create_heatmap();

      main(point, jhalte);

    }

  }

}

/**
  *@desc function to clean rows of all tables
  */

function clean_tables() {

  console.log("cleantables");
  $(".rt1").html(" ");
  $(".rt2").html(" ");


}

/**
  *@desc function to clear textarea
  */


function clear_textarea() {
  document.getElementById("geojsontextarea").value = " ";
}







/**
  *@desc AJAX function to load a GJSON Object from database
  */




function load_GJSON_from_db() {

  return new Promise(function (res, rej) {
    $.ajax({
      url: "/item",
      method: "GET",
      success: function (result) { res(result) },
      error: function (err) { console.log(err) }
    });
  })


}

/**
  *@desc AJAX Function to get all Stops from API with Promise
  *@return data
  */

async function getstops() {
  return new Promise(function (res, rej) {
    $.ajax({
      url: "https://rest.busradar.conterra.de/prod/haltestellen",
      method: "GET",
      success: function (result) { res(result) },
      error: function (err) { console.log(err) }
    });
  })



}



///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ÜBUNG 7////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




