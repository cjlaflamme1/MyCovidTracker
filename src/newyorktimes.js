$('document').ready(function () {

    const newsArticles = $('#newsArticles');
    let savedNewsArticles = JSON.parse(localStorage.getItem("savedNewsArticles"));

    // NY Times API Object
    const apiNYTimes = {
        newArticleArray: [
            {

            }
        ],
        refactorInputLocation() {
            console.log('placeholder');
        },
        call() {
            const test = '';
            let userInputLocation = `+${test}`;
            $.ajax({
                url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Coronavirus+COVID+COVID19${userInputLocation}&sort=newest&api-key=9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
                method: "GET"
            }).then(function (response) {
                console.log(response.response.docs);  // r.r.docs accesses 10 first articles to match search criteria
                apiNYTimes.displayRecentArticles(response.response.docs);
            });
        },
        displayRecentArticles(response) {
            for (i = 0; i < 6; i++) {
                num = i + 1;
                const headlineText = response[i].headline.main;
                const abstract

                const headline = $("<div>").addClass(`article-headline card-content`).text(headlineText).attr("data-name", `headline${i}`);
                // const abstract = $("<div>").addClass(`article-abstract card-content`).text(response[i].abstract).attr("data-name", `abstract${i}`);
                const articleLink = $("<a>").addClass(`article-link card-content`).text('Read Full Article').attr('href', response[i].web_url).attr('target', '_blank').attr("data-name", `link${i}`);
                const saveButton = $("<button>").addClass('button').attr('type', 'button').attr('id','saveButton').text('Save').attr("data-name", `${i}`);

                const newsArticleDiv = $("<div>").addClass(`articles card-content col s12 m5`).attr("data-name", `article${i}`);
                newsArticleDiv.append(headline, articleLink, saveButton);
                newsArticles.append(newsArticleDiv);
            }
        },
        saveArticle() {
            let articleNumber = $(this).attr('data-name');
            console.log(articleNumber);
            const article = $('div').attr('data-name', `headline${articleNumber}`);
            console.log(article);
        },
        loadSavedArticles() {
            for (i = 0; i < savedNewsArticles.length; i++) {
                console.log(savedNewsArticles[i]);
            }
        },
    }
    
    function saveArticle() {
        let article = $(this).attr('data-name');
        console.log(article);
    }

    $(document).on("click", ".button", apiNYTimes.saveArticle);

    if (Array.isArray(savedNewsArticles)) {  // does an array already exist in local storage?
        apiNYTimes.loadSavedArticles();  // if so, load it
    } else {
        savedNewsArticles = [];  // else, create a new array to be saved
    }

    apiNYTimes.call();

});