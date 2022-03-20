console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);


let randDec = function(){
    return Math.random();
};
//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0, 0, pWidth, pHeight);
bgRect.attr({ fill: "black" });



var allDisks = [];
var diskIndex = 0;

// // Add some properties to disk just to keep track of it's "state"
// disk.xpos = pWidth / 2;
// disk.ypos = pHeight / 2;
// // Add properties to keep track of the rate the disk is moving
// disk.xrate = 5;
// disk.yrate = 5;

var initialiseDisks = function () {
  for (let i = 0; i < 50; i++) {
    var disk = paper.circle(pWidth / 2, pHeight / 2, 20);
    disk.attr({ fill: "green" });
    disk.xpos = pWidth / 2;
    disk.ypos = pHeight / 2;
    // Add properties to keep track of the rate the disk is moving
    disk.xrate = 5 * randDec();
    disk.yrate = 5 * randDec();

    allDisks.push(disk);
  }
};



// our drawing routine, will use as a callback for the interval timer
var draw = function () {
  // console.log("disk pos is ["+disk.xpos + "," + disk.ypos + "]");

  // for (; diskIndex < allDisks.length; diskIndex ++) {
  while (diskIndex < allDisks.length) {
    // break;

    disk = allDisks[diskIndex];
    console.log(disk.xpos)

    // Update the position where we want our disk to be
    disk.xpos += disk.xrate;
    disk.ypos += disk.yrate;

    // Now actually move the disk using our 'state' variables
    disk.attr({ cx: disk.xpos, cy: disk.ypos });

    // keep the object on the paper
    if (disk.xpos > pWidth) {
      disk.xrate = -disk.xrate;
    }
    if (disk.ypos > pHeight) {
      disk.yrate = -disk.yrate;
    }
    if (disk.xpos < 0) {
      disk.xrate = -disk.xrate;
    }
    if (disk.ypos < 0) disk.yrate = -disk.yrate;
    diskIndex++;
  }
  diskIndex = 0;
};

initialiseDisks();

// Call draw() periodically
// We startthe animation last thing as the module loads
setInterval(draw, 20);
