var countries = [];
var currentCountry = "Afghanistan";
var malaria = {};
var years = [];

function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}

for(var i = 0; i < data.length; i++) {
    if(countries.includes(data[i].dims.COUNTRY)) {
        continue;
    } else {
        countries.push(data[i].dims.COUNTRY);
    }
}

//for(let i = 0; i < data.length; i++) {
//    if(data[i].dims.COUNTRY == currentCountry) {
//        years.push(data[i].dims.YEAR);
//    }
//}

function propogateMalaria() {
    malaria = {};
    for(let i = 0; i < data.length; i++) {
        if(data[i].dims.COUNTRY == currentCountry) {
            let year = data[i].dims.YEAR;
            malaria[year] = data[i].Value;
        }
    }
    console.log(malaria);
}
propogateMalaria();

//console.log(countries);

var select = document.getElementById("myselect");
var canvas = document.getElementById("mycanvas");
var canvas1 = document.getElementById("mycanvas1");
canvas1.width = 300;
canvas1.height = 300;
var ctx = canvas.getContext("2d");

for(i = 0; i < countries.length; i++) {
    select.options[select.options.length] = new Option(countries[i], countries[i]);
}

function change_myselect() {
    currentCountry = select.value;
    propogateMalaria();
    
    
//    console.log(currentCountry)
    for (i=0;data.length;i=i+1) {
            if (data[i].dims.COUNTRY == currentCountry) {
                var dumbnum = data[i].Value;
                if(dumbnum == "No data") {
                    ctx.fillText("This country does not have rabies", 20, 20, 200);
                    break;
                }
                var smartstr = dumbnum.replace("","");
                var myint = parseInt(smartstr);
                //ctx.clearRect(1, 1, canvas.width, canvas.height);
                //ctx.fillStyle = "blue";
                //ctx.fillRect(0,0,myint + 1,100);
                break;
                }
        }
    
    myBarchart.clear();
    myBarchart.data = malaria;
    myBarchart.draw();
}

var Barchart = function(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.data = options.data;
    
  
    this.clear = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log("hi")
    }
    
    this.draw = function() {
        console.log("hello")
        var maxValue = 0;
        for (var categ in this.data){
            maxValue = Math.max(maxValue,this.data[categ]);
        }
        if (maxValue == 0) { 
            this.ctx.fillText("This country does not have any cases of malaria", 20, 20, 200);
                           
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;
 
        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
             
            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
            if (maxValue != 0) {
               gridValue+= maxValue/10;  
            }
            else {
            gridValue+= this.options.gridScale;
         
                
            }
        }
  
        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;
 
        for (categ in this.data){
            var val = this.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
 
            barIndex++;
        }
  
    }
}


var myBarchart = new Barchart(
    {
        canvas:canvas1,
        padding:40,
        gridScale:10,
        gridColor:"#eeeeee",
        data:malaria,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
);
myBarchart.draw();


//var currentCountry = "Afghanistan";
//
//console.log(data);
//var countries = [];
//
//for(let i = 0; i < data.length; i++) {
//    if(i % 5 == 0) {
//        countries.push(data[i].dims.COUNTRY)
//    }
//}
//
//console.log(countries)
//var select = document.getElementById("myselect");
//var canvas = document.getElementById("mycanvas");
//
//for(i = 0; i < countries.length; i++) {
//    select.options[select.options.length] = new Option(countries[i], countries[i]);
//}
//
//function change_myselect() {
//    currentCountry = select.value;
//    console.log(currentCountry)
//    for (i=0;data.length;i=i+1) {
//            if (data[i].dims.COUNTRY == currentCountry) {
//                var dumbnum = data[i].Value;
//                if(dumbnum == "No data") {
//                    ctx.fillText("This country does not have rabies", 20, 20, 200);
//                    break;
//                }
//                var smartstr = dumbnum.replace("","");
//                var myint = parseInt(smartstr);
////                ctx.fillStyle = '#ffffff'; // or whatever color the background is.
////                ctx.fillText(text, 20, 20);
////                ctx.clearRect(0, 0, canvas.width, canvas.height);
//                ctx.fillStyle = "red";
//                ctx.fillRect(0,0,myint + 100,50);
//                break;
//                }
//            
//        }
//}
