$('document').ready(function () {

    const newsArticles = $('#newsArticles');

    // NY Times API Object
    const apiNYTimes = {
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

                apiNYTimes.displayArticles(response.response.docs);
            });
        },
        displayArticles(response) {
            for (i = 0; i < 6; i++) {
                num = i + 1;
                const headline = $("<div>").addClass(`article-headline card-content`).text(response[i].headline.main);
                const abstract = $("<div>").addClass(`article-abstract card-content`).text(response[i].abstract);
                const articleLink = $("<a>").addClass(`article-link card-content`).text('Read Full Article').attr('href', response[i].web_url).attr('target', '_blank');
                const saveButton = $("<button>").addClass('button').attr('type', 'button').attr('id', 'saveButton').text('Save');

                const newsArticleDiv = $("<div>").addClass(`articles card-content col s12 m5`).attr("data-name", `article${i}`);
                newsArticleDiv.append(headline, abstract, articleLink, saveButton);
                newsArticles.append(newsArticleDiv);
            }
        },
        saveArticle() {
            const article = $("<div>").attr('data-name');
            console.log(article);
        }
    }

    apiNYTimes.call();

    $(document).on("click", "#saveButton", function () {
        apiNYTimes.saveArticle();
    });

});