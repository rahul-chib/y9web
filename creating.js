console.log(data);
var countries = [];

for(let i = 0; i < data.length; i++) {
    if(i % 5 == 0) {
        countries.push(data[i].dims.COUNTRY)
    }
}

console.log(countries)
var select = document.getElementById("myselect");

for(i = 0; i < countries.length; i++) {
    select.options[select.options.length] = new Option(countries[i], countries[i]);
}