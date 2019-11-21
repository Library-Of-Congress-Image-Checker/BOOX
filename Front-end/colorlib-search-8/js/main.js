/*
const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)
*/
var input = '';
function searchBar() {
  input = document.getElementById("search").value;
  var API_KEY = '14295459-b24a70ecc8e1fafb8a48535b2';

  var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(input);
  var request = new XMLHttpRequest()
  $.getJSON(URL, function(data){
  if (parseInt(data.totalHits) > 0)
      $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
  else
      console.log('No hits');
  });

}
