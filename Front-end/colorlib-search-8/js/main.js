/* const div = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

div.appendChild(container)
*/

var input = '';
function searchBar() {
  input = document.getElementById("search").value;
  var API_KEY = '14295459-b24a70ecc8e1fafb8a48535b2';

  var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(input);
  var request = new XMLHttpRequest()
  $.getJSON(URL, function(data){
  if (parseInt(data.totalHits) > 0)
      $.each(data.hits, function(i, hit){
        var src = hit.webformatURL;
            img = document.createElement('img');
            img.src = src;
            document.body.appendChild(img);
        console.log(hit.pageURL);
      });
  else
      console.log('No hits');
  });

}

  /* Create a div with a card class
 const card = document.createElement('div')
 card.setAttribute('class', 'card')

 // Create a p and set the text content to the film's description
 const p = document.createElement('p')
 movie.description = movie.description.substring(0, 300) // Limit to 300 chars
 p.textContent = `${movie.description}...` // End with an ellipses

 container.appendChild(card)

 card.appendChild(p)
*/
