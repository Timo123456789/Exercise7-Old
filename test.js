
QUnit.test("Valuecheck for Distance Nr 1",
    function (assert) {
        var B1P1 = [7.364959716796874, 51.94130190984729];
        var B1P2 = [7.452850341796876, 51.921402619223514];
        var myfunc = Math.round(distance(change(B1P1), change(B1P2)));

        var turffunc = Math.round((turf.distance(B1P1, B1P2) * 1000)); //*1000, because turffunc returns a value in km and myfunc a value in m
        var d = myfunc - turffunc;
        console.log("d1:"+d);
  console.log("dmyfunc1:"+myfunc);
  console.log("dturffunc1:"+turffunc);
        if (d <= 10 && d >= -5) {
            assert.ok(true);
        }
        else { assert.ok(false) }


    },


);






  QUnit.test( "Valuecheck for Distance Nr 2", function( assert ) {
    var B2P1 = [7.540740966796875,51.991222950124396];
    var B2P2 = [ 7.678756713867187, 51.98107402257654      ];
    var myfunc = Math.round(distance(change(B2P1),  change(B2P2)));

        var turffunc =  Math.round((turf.distance(B2P1,B2P2)*1000));
  var d = myfunc - turffunc;
  console.log("d2:"+d);
  console.log("dmyfunc2:"+myfunc);
  console.log("dturffunc2:"+turffunc);
      if(d<=10 && d>=-5){
         assert.ok( true);
      }
      else{assert.ok(false)}
              
  
  });


 

  QUnit.test( "Valuecheck for Distance Nr 3", function( assert ) {
    var B3P1 = [
        7.627258300781249,
        52.12337138625387
      ];
    var B3P2 = [
        7.6938629150390625,
        52.127165400871284
      ];
    var myfunc = Math.round(distance(change(B3P1),  change(B3P2)));

        var turffunc =  Math.round((turf.distance(B3P1,B3P2)*1000));
  var d = myfunc - turffunc;
  console.log("d3:"+d);
  console.log("dmyfunc3:"+myfunc);
  console.log("dturffunc3:"+turffunc);
      if(d<=10 && d>=-5){
         assert.ok( true);
      }
      else{assert.ok(false)}
              
  
  });



  QUnit.test( "Valuecheck for Distance Nr 4", function( assert ) {
    var B4P1 =             [362.801513671875,  13.859413869074032 ];
    var B4P2 =          [ 355.1824951171875, 12.221917732187263 ];
    var myfunc = Math.round(distance(change(B4P1),  change(B4P2)));

        var turffunc =  Math.round((turf.distance(B4P1,B4P2)*1000));
  var d = myfunc - turffunc;
  console.log("d4:"+d);
  console.log("dmyfunc4:"+myfunc);
  console.log("dturffunc4:"+turffunc);
      if(d<=10 && d>=-5){
         assert.ok( true);
      }
      else{assert.ok(false)}
              
  
  });


  QUnit.test("Valuecheck for Bearing Nr 1",
  function (assert) {
      var B1P1 = [7.364959716796874, 51.94130190984729];
      var B1P2 = [7.452850341796876, 51.921402619223514];
      var myfunc = Math.round(bearing(change(B1P1), change(B1P2)));

      var turffunc = Math.round((turf.bearing(B1P1, B1P2)));
      var d = myfunc - turffunc;
      console.log("b1:"+d);
  console.log("bmyfunc1:"+myfunc);
  console.log("bturffunc1:"+turffunc);
      if (d <= 10 && d >= -5) {
          assert.ok(true);
      }
      else { assert.ok(false) }


  },


);






QUnit.test( "Valuecheck for Bearing Nr 2", function( assert ) {
  var B2P1 = [7.540740966796875,51.991222950124396];
  var B2P2 = [ 7.678756713867187, 51.98107402257654      ];
  var myfunc = Math.round(bearing(change(B2P1),  change(B2P2)));

      var turffunc =  Math.round((turf.bearing(B2P1,B2P2)));
var d = myfunc - turffunc;
console.log("b2:"+d);
console.log("bmyfunc2:"+myfunc);
console.log("bturffunc2:"+turffunc);
    if(d<=10 && d>=-5){
       assert.ok( true);
    }
    else{assert.ok(false)}
            

});




QUnit.test( "Valuecheck for Bearing Nr 3", function( assert ) {
  var B3P1 = [
      7.627258300781249,
      52.12337138625387
    ];
  var B3P2 = [
      7.6938629150390625,
      52.127165400871284
    ];
  var myfunc = Math.round(bearing(change(B3P1),  change(B3P2)));

      var turffunc =  Math.round((turf.bearing(B3P1,B3P2)));
var d = myfunc - turffunc;
console.log("b3:"+d);
console.log("bmyfunc3:"+myfunc);
console.log("bturffunc3:"+turffunc);
    if(d<=10 && d>=-5){
       assert.ok( true);
    }
    else{assert.ok(false)}
            

});



QUnit.test( "Valuecheck for Bearing Nr 4", function( assert ) {
  var B4P1 =             [362.801513671875,  13.859413869074032 ];
  var B4P2 =          [ 355.1824951171875, 12.221917732187263 ];
  var myfunc = Math.round(bearing(change(B4P1),  change(B4P2)));

      var turffunc =  Math.round((turf.bearing(B4P1,B4P2)));
var d = myfunc - turffunc;
console.log("b4:"+d);
console.log("bmyfunc4:"+myfunc);
console.log("bturffunc4:"+turffunc);
    if(d<=10 && d>=-5){
       assert.ok( true);
    }
    else{assert.ok(false)}
            

});

 









































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
*@return bearing value in degree
*Source:  https://www.movable-type.co.uk/scripts/latlong.html
*/

function bearing(p1, p2) {

    var a1 = toRadial(p1[1]);

    var a2 = toRadial(p2[1]);
    var y = Math.sin(toRadial(p2[0] - p1[0])) * Math.cos(a2);
    var x = Math.cos(a1) * Math.sin(a2) -
        Math.sin(a1) * Math.cos(a2) * Math.cos(toRadial(p2[0] - p1[0]));
    var brng = todegree(Math.atan2(y, x));

return brng;



/*
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
*/


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