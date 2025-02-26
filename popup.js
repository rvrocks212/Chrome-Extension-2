document.addEventListener('DOMContentLoaded', function () {
  fetchNews();

  // Refresh news every hour
  setInterval(fetchNews, 3600000);
});

function fetchNews() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '<li class="loading">Loading news...</li>';

  const apiKey = "8b8fd76488bbdbdea4f3d5a882db5ed2";
  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=in&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      newsList.innerHTML = '';

      if (data && data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = article.url;
          link.textContent = article.title;
          link.target = '_blank';
          listItem.appendChild(link);

          if (article.image) {
            const image = document.createElement('img');
            image.src = article.image;
            image.alt = "News Image";
            listItem.appendChild(image);
          }

          newsList.appendChild(listItem);
        });
      } else {
        const errorListItem = document.createElement('li');
        errorListItem.textContent = 'No news articles available at the moment.';
        newsList.appendChild(errorListItem);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      newsList.innerHTML = '';
      const errorListItem = document.createElement('li');
      errorListItem.textContent = 'Failed to fetch news.';
      errorListItem.className = 'error';
      newsList.appendChild(errorListItem);
    });
}


