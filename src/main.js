const urlApi = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCNbIPRUOGNzPiPITSHFj3ZA&part=snippet%2Cid&order=date&maxResults=10';
const urlYoutube = 'https://www.youtube.com/channel';

const cards = document.getElementById('cards');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3c22fb365amsh345c675e99a06bbp169d90jsnb15955d2432b',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

/* fetch(urlApi, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
 */

 async function fetchData() {
   const response = await fetch(urlApi, options);
   const data = await response.json();
   return data;
 }

 const getVideos = async () => {
   try {
     const videos = await fetchData(urlApi);
     console.log(videos);
   } catch (error) {
     console.log(error);
   }
 }

 //sentencia que va a permitir automaticamente cuando está cargando el archivo ejecutar esta función

 (async () => {
  try {
    const videos = await fetchData(urlApi);
    const listVideos = videos.items;
    if(listVideos.length != 0) {
      listVideos.map((item) => {
        const src = item.snippet.thumbnails.high.url;
        const title = item.snippet.title;
        const description = item.snippet.description;
        const channelId = item.snippet.channelId;
        let view = `
          <div class="card">
            <img class="img-video" src=${src} alt="video-image">
            <h1>${title}</h1>
            <p>${description}</p>
            <a href=${urlYoutube}/${channelId}>link </a>
          </div>
        `
        cards.innerHTML += view;
      })
    }
   
  } catch (error) {
    console.log(error);
  }
 })();
