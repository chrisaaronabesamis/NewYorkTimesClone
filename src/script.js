document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuIcon = menuBtn.querySelector('i');
    const sections = ['home', 'politics', 'world', 'technology', 'science', 'sports', 'health', 'arts', 'opinion'];
   
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });
   
    sections.forEach(section => {
        document.getElementById(section).addEventListener('click', () => {
            fetchNews(section);
            menu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    fetchNews('home');
   
    function fetchNews(topic) {
        const url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=rIyJOvMQSvnCYwr4qzNAGROBuWeo2abs`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
               
                const headlinesContainer = document.getElementById("headlines");
                const articleGrid = document.createElement('div');
                articleGrid.classList.add('article-grid');

               
                const topicTitle = topic.charAt(0).toUpperCase() + topic.slice(1);
                document.getElementById('topicTitle').innerText = topicTitle;

               
                const limitedResults = data.results.slice(0, 15);
                if (limitedResults.length === 0) {
                    headlinesContainer.innerHTML = '<p>No articles found for this topic.</p>';
                    return;
                }

               
                headlinesContainer.innerHTML = `<h2 id="topicTitle">${topicTitle}</h2>`;

               
                limitedResults.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('article-item');

                    const articleLink = document.createElement("a");
                    articleLink.setAttribute('href', article.url);
                    articleLink.setAttribute('target', '_blank');
                    articleLink.innerHTML = article.title;

                    const articleDesc = document.createElement("p");
                    articleDesc.innerHTML = article.abstract || 'No description available';

                    const articleImage = document.createElement("img");
                    articleImage.setAttribute('src', article.multimedia && article.multimedia[0] ? article.multimedia[0].url : 'default-image.jpg');
                    articleImage.setAttribute('alt', article.title);

                   
                    articleElement.appendChild(articleImage);
                    articleElement.appendChild(articleLink);
                    articleElement.appendChild(articleDesc);

                   
                    articleGrid.appendChild(articleElement);
                });

               
                headlinesContainer.appendChild(articleGrid);
            })
            .catch(error => {
                const headlinesContainer = document.getElementById("headlines");
                headlinesContainer.innerHTML = `<p>Please Connect to the Internet.</p>`;
            });
    }
});