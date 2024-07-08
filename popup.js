document.addEventListener('DOMContentLoaded', function () {
  // Fetch news from the News API
  fetchNews();

  // Refresh news every hour
  setInterval(fetchNews, 3600000);
});

function fetchNews() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '<li class="loading">Loading news...</li>';

  fetch('https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=9129dd2a32a94098aa31dc1b581ceb86')
    .then(response => response.json())
    .then(data => {
      newsList.innerHTML = '';

      if (data && data.articles && data.articles.length > 0) {
        // Iterate over the articles and create list items
        data.articles.forEach(article => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = article.url;
          link.textContent = article.title;
          link.target = '_blank'; // Open link in a new tab
          listItem.appendChild(link);

          if (article.urlToImage) {
            // Create image element
            const image = document.createElement('img');
            image.src = article.urlToImage;
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


