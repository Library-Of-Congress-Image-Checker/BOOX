/*
const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)
*/
var API_KEY = '14260700-2be5fa852c1142d527bf48083';
var URL = "https://pixabay.com/api/https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent();
var request = new XMLHttpRequest()
request.open('GET', 'https://pixabay.com/api/?key=14260700-2be5fa852c1142d527bf48083', true)
request.send()
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
    console.log('No hits');
});
