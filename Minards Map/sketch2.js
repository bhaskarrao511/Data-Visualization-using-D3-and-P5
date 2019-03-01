var table;

function preload() {
  table = loadTable("minard-data.csv","csv","header");

}
function setup() {
  //table = loadTable("minard-data.csv","csv","header");
  createCanvas(1280, 720);
  background(200);
}


function draw() {
	background (255);
  var xprev="";
  var yprev="";

  var rows = table.getRows();
  
  //For Survivors
  for (var r = 0; r < rows.length ,r<47; r++) {
    var lonc = rows[r].getNum("LONP");
    var latc = rows[r].getNum("LATP");
    var surv = rows[r].getString("SURV");
    var dir = rows[r].getString("DIR");
    
    var x = map(lonc,23,38,0,640);
    var y = map(latc,53,56,480,0);
    if(xprev==""){
      xprev=x;
      yprev=y;
      dirPrev=dir
    }
    var strokesize = map(surv,6000,340000,4,50);
    strokeWeight(strokesize);
    if(dirPrev=='A')
      stroke(144,197,197);
    else if(dirPrev =='R')
      stroke(255,213,79);
    else
      stroke(255,255,255);
    line(xprev,yprev,x,y);
    xprev=x;
    yprev=y;
    dirPrev=dir;
  }
  //For City
  for (var r = 0; r < rows.length ,r<20; r++) {
    var lonc = rows[r].getNum("LONC");
    var latc = rows[r].getNum("LATC");
    var city = rows[r].getString("CITY");
    var x = map(lonc,23,38,0,640);
    var y = map(latc,53,56,480,0);
    strokeWeight(5);
    stroke(200,0,15);
    if(x!=null&&x!=""&&y!=null&&y!=""){
      point(x,y);
      strokeWeight(0);
      stroke(255,0,0);
      text(city,x+3,y+3)
    }
  }
  
  //For Temp
  x1prev="";
  y1prev="";
  y1axisprev="";
  for (var r = 0; r < rows.length ,r<9; r++) {
    var lont = rows[r].getNum("LONT");
    var temp = rows[r].getString("TEMP");
    var y1=parseInt(temp);
    var day = rows[r].getString("DAY");
    var month = rows[r].getString("MON");
    //var year = rows[r].getNum("DAYS");
    var x1 = map(lont,23,38,0,640);
    var y1 = map(y1,-30,0,200,0);
    var date = day+" "+month;
    y1=y1+380
    
    if(x1prev==""){
      x1prev=x1;
      y1prev=y1;
      y1axisprev=y1;
    }
	
	//Make Horizontal lines on temperature graph
    strokeWeight(1);
    stroke(150);
    line(70,y1,650,y1);
	
    strokeWeight(1);
    stroke(0,0,0);
    line(x1prev,y1prev,x1,y1)
    strokeWeight(5);
    
    //Actual Temperature DataPoint
    point(x1,y1);
    
    //To put a point of the left of the teperature graph to represent y axis
    //strokeWeight(3);
    //point(70,y1);
    
    //Make vertical lines from temperature points to the map    
    stroke(170);
    strokeWeight(1);
    line(x1,y1,x1,10);
    line(70,y1,70,y1prev);
    
        
    //Date text on temperature graph
    strokeWeight(0);
    textSize(12);
    text(date,x1+3,y1-5)
    text(temp,50,y1)
    
    x1prev=x1;
    y1prev=y1;
    
    //line(95,yprev,95,y);
    
  }
 
}
