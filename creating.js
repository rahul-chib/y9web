var countries = [];
var currentCountry = "Afghanistan";

for(let i = 0; i < data.length; i++) {
    if(countries.includes(data[i].dims.COUNTRY)) {
        continue;
    } else {
        countries.push(data[i].dims.COUNTRY);
    }
}

console.log(countries);

var select = document.getElementById("myselect");
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

for(i = 0; i < countries.length; i++) {
    select.options[select.options.length] = new Option(countries[i], countries[i]);
}

function change_myselect() {
    currentCountry = select.value;
    console.log(currentCountry)
    for (i=0;data.length;i=i+1) {
            if (data[i].dims.COUNTRY == currentCountry) {
                var dumbnum = data[i].Value;
                if(dumbnum == "No data") {
                    ctx.fillText("This country does not have rabies", 20, 20, 200);
                    break;
                }
                var smartstr = dumbnum.replace("","");
                var myint = parseInt(smartstr);
                ctx.clearRect(1, 1, canvas.width, canvas.height);
                ctx.fillStyle = "blue";
                ctx.fillRect(0,0,myint + 0,50);
                break;
                }
        }
}
