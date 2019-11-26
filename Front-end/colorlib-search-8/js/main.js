

MOCK_MODE = false;

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

function getAllPictures(endpoint) {
    if (!endpoint) {
        useMockMode();
        return
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onload = function() {
        if (xhr.status === 200) {
 
            var json = JSON.parse(xhr.responseText);
            console.dir(json.hits);
            if (!json || !json.hits) {
                useMockMode();
            } else if(json.hits.length === 0){
                document.getElementById('no_results_found').classList.add('show');
            } else if (json.hits.length > 1) {
                MOCK_MODE = false;
                var responseArray = json.hits;
                document.getElementById('no_results_found').classList.remove('show');
                makePaginationButtons(responseArray);
                showPictures(responseArray, 1);
            }

        } else {
            console.warn('Request failed:' + xhr.status);
            //mock mode
            useMockMode();
            return
            //
        }
    };
    xhr.send();
}

function useMockMode() {
    MOCK_MODE = true;
    var numArray = [];
    for (var i = 0; i <= 50; i++) {
        numArray.push(i);
    }
    showPictures(numArray, 1);
    makePaginationButtons(numArray);
    MOCK_MODE = false;
    return
}

function Thumbnail(type, src) {
    if (MOCK_MODE) {
        this.html = '<div class="img_container"><image class="fetch_image" src="' + "http://placekitten.com/" + (Math.floor(Math.random() * 5) + 10) + "00/" + (Math.floor(Math.random() * 5) + 8) + "00" + '"></div>';
    } else {
        this.html = '<div class="img_container"><image class="fetch_image" src="' + src + '"></div>';

    }
}

function showPictures(responseArray, page) {
    var currentPics = document.getElementsByClassName('img_container');

    while (currentPics[0]) {
        currentPics[0].parentNode.removeChild(currentPics[0]);
    }

    var picsArray = [];
    for (var i = ((page - 1) * 10); i < ((page * 10)); i++) {
        var thumb = new Thumbnail('image', responseArray[i].largeImageURL)
        picsArray.push(thumb);
        document.getElementById("container_large").innerHTML += thumb.html;
    }

    var picElements = document.getElementsByClassName('fetch_image');
    for (var j = 0; j < picElements.length; j++) {
        picElements[j].onclick = function(e) {
            openViewer(this);
        }

    }

    if (!document.getElementById('page_indicator').innerHTML) {
        document.getElementById('page_indicator').innerHTML = "Page " + 1;
    }

}

function makePaginationButtons(responseArray) {

    if (document.getElementById("pagination_button_container").childNodes.length > 0) {
        document.getElementById("pagination_button_container").innerHTML = '';
    }
    for (var index = 0; index < responseArray.length; index++) {
        if (((index + 1) % 10) === 0) {
            var paginationButtonHtml = '<button data-page="' + parseInt((index / 10) + 1) + '" id="pagination_button_' + parseInt((index / 10) + 1) + '" class="pagination_button">' + parseInt((index / 10) + 1) + '</button>'
            document.getElementById("pagination_button_container").innerHTML += paginationButtonHtml;
        }
    }

    var page_buttons = document.getElementsByClassName('pagination_button');
    if (page_buttons[0]) {
        page_buttons[0].classList.add('disabled');
    }
    for (var i = 0; i < page_buttons.length; i++) {
        var element = page_buttons[i];

        element.onclick = function(e) {
            var page = this.getAttribute('data-page');
            for (var j = 0; j < page_buttons.length; j++) {
                page_buttons[j].classList.remove('disabled');
            }
            console.log("show page: " + page)
            showPictures(responseArray, page);
            this.classList.add('disabled');
            document.getElementById('page_indicator').innerHTML = "Page " + page;
        }
    }

}

function openViewer(picElement) {
    var viewer = '<div id="viewer"><image id="image_closeup" src="' + picElement.getAttribute('src') + '" ></div>'
    document.getElementById('modal').classList.add('open');
    document.getElementById('modal').innerHTML = viewer;
    document.getElementById('viewer').onclick = function(e) {
        closeViewer();
    }
}

function closeViewer() {
    document.getElementById('modal').classList.remove('open');
}

document.addEventListener("DOMContentLoaded", function(event) {
    getAllPictures(init_url);

    document.getElementById('search_button').addEventListener('click', function() {
        var searchQuery = document.getElementById('search_input').value;
        var newUrl = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=10961131-cc3197223dbf7e1e51fa8e690&q=' + searchQuery + '&per_page=50';
        getAllPictures(newUrl);
        document.getElementById('query_term').innerText = searchQuery;
    });
});




module.exports.getAllPictures = getAllPictures;