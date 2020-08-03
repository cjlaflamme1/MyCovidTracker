$('document').ready(function () {

    const newsArticles = $('#newsArticles');
    const savedArticlesDisplay = $('#savedArticlesDisplay');
    let savedNewsArticles = JSON.parse(localStorage.getItem("savedNewsArticles"));

    // NY Times API Object
    const apiNYTimes = {
        newestArticles: [],
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
                const articleLinkURL = response[i].web_url;

                const headline = $("<h3>").addClass(`article-headline card-content`).text(headlineText).attr("data-name", `headline${i}`);
                // const abstract = $("<div>").addClass(`article-abstract card-content`).text(response[i].abstract).attr("data-name", `abstract${i}`);
                const articleLink = $("<a>").addClass(`article-link card-content`).text('Read Full Article').attr('href', articleLinkURL).attr('target', '_blank').attr("data-name", `link${i}`);
                const saveButton = $("<button>").addClass('button').attr('type', 'button').attr('id','saveButton').text('Save').attr("data-name", `${i}`);

                const newsArticleDiv = $("<div>").addClass(`articles card-content col s12 m5`).attr("data-name", `article${i}`);
                newsArticleDiv.append(headline, articleLink, saveButton);
                newsArticles.append(newsArticleDiv);
                const recentArticleObject = {
                        title: headlineText,
                        link: articleLinkURL
                }
                apiNYTimes.newestArticles.push(recentArticleObject);
            }
        },
        saveArticle() {
            let articleNumber = $(this).attr('data-name');
            console.log(articleNumber);
            console.log(apiNYTimes.newestArticles);
            savedNewsArticles.push(apiNYTimes.newestArticles[articleNumber]);
            localStorage.setItem("savedNewsArticles", JSON.stringify(savedNewsArticles));
        },
        loadSavedArticles() {
            savedArticlesDisplay.text('');
            for (i = 0; i < savedNewsArticles.length; i++) {
                console.log(savedNewsArticles[i]);
                
                
                const articleDiv = $('<div>').addClass('col card s12 m4 white-text card-content contentSections articleBlock').attr('data-name', `article-${i}`);
                const titleHeader = $("<h2>").addClass(`article-title`).text(savedNewsArticles[i].title);
                const articleLink = $("<a>").addClass(`article-link`).text('Read Full Article').attr('href', savedNewsArticles[i].link).attr('target', '_blank');
                const deleteButton = $("<button>").addClass('button').attr('type', 'button').attr('id','deleteButton').text('Delete').attr("data-name", `${i}`);
                articleDiv.append(titleHeader, articleLink, deleteButton);
                savedArticlesDisplay.append(articleDiv);
                
            }
        },
        deleteArticle() {
            let articleNumber = $(this).attr('data-name');
            console.log(articleNumber);
            savedNewsArticles.splice(apiNYTimes.newestArticles[articleNumber], 1);
            localStorage.setItem("savedNewsArticles", JSON.stringify(savedNewsArticles));
            apiNYTimes.loadSavedArticles();
        }
    }

    $(document).on("click", "#saveButton", apiNYTimes.saveArticle);
    $(document).on("click", "#deleteButton", apiNYTimes.deleteArticle);

    if (Array.isArray(savedNewsArticles)) {  // does an array already exist in local storage?
        apiNYTimes.loadSavedArticles();  // if so, load it
        console.log(`loading of saved articles should have fired`);
    } else {
        savedNewsArticles = [];  // else, create a new array to be saved
    }

    apiNYTimes.call();

});