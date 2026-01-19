const newsContainer = document.getElementById("news-container");


window.onload = function () {
    getNews("technology");
};

function getNews(category) {
    newsContainer.innerHTML = `
        <div class="text-center my-4">
            <div class="spinner-border text-primary"></div>
            <p class="mt-2">Loading ${category} news...</p>
        </div>
    `;


    fetch(`/.netlify/functions/news?category=${category}`)
        .then(res => res.json())
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                showNews(data.articles);
            } else {
                newsContainer.innerHTML = `
                    <p class="text-center text-muted">
                        No news found for this category.
                    </p>
                `;
            }
        })
        .catch(err => {
            newsContainer.innerHTML = `
                <p class="text-danger text-center">
                    Unable to load news. Check API key.
                </p>
            `;
            console.error(err);
        });
}

function showNews(articles) {
    newsContainer.innerHTML = "";

    articles.forEach(article => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        
        const imageUrl = article.urlToImage 
            ? article.urlToImage 
            : "https://via.placeholder.com/300x180?text=No+Image";

        col.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img 
                    src="${imageUrl}" 
                    class="card-img-top"
                    style="height:180px;object-fit:cover;"
                    onerror="this.src='https://via.placeholder.com/300x180?text=No+Image';"
                >
                <div class="card-body">
                    <h6 class="card-title">${article.title}</h6>
                    <p class="card-text">${article.description || "No description available."}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-sm btn-primary">
                        Read More
                    </a>
                </div>
            </div>
        `;

        newsContainer.appendChild(col);
    });
}

