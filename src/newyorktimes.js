$('document').ready(function () {
    // 
    //  VARIABLES
    // 
    const searchedCountryNameDisplay = $('#searchedCountryNameDisplay');
    const newsArticles = $('#newsArticles');
    const savedArticlesDisplay = $('#savedArticlesDisplay');
    let savedNewsArticles = JSON.parse(localStorage.getItem("savedNewsArticles"));
    let searchLocation = '';
    // 
    // NY Times API Object
    // 
    const apiNYTimes = {
        newestArticles: [],
        refactorSearchTerm(string) {
            trimmedString = string.trim();
            stringArray = trimmedString.split(' ');
            newString = stringArray.join('+');
            return newString;
        },
        call() {
            const userInputSearchTerm = $('#search');
            if (searchedCountryNameDisplay.text().length !== 0 && searchedCountryNameDisplay.text() !== 'Country') {
                searchLocation = `&fq=glocations:${searchedCountryNameDisplay.text()}`;
            }
            let term = '';
            if (userInputSearchTerm.val().length <= 0) {
                term = 'Coronavirus';
            } else {
                term = `Coronavirus+${userInputSearchTerm.val()}`;
                console.log(`concatenated users term input`);
            }
            let searchTerm = '';
            searchTerm = apiNYTimes.refactorSearchTerm(term);
            console.log("type of searchTerm =" + typeof(searchTerm));
            console.log(`search term length => ${searchTerm.length}`);
            console.log(`searchTerm => ${searchTerm}`);
            console.log(`userInputSearchTerm => ${userInputSearchTerm.val()}`);
            console.log(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}${searchLocation}&sort=newest&api-key=9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`);
            $.ajax({
                url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}${searchLocation}&sort=newest&api-key=9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.response.docs);  // r.r.docs accesses 10 first articles to match search criteria
                if (response.response.docs.length > 0) {
                    apiNYTimes.displayRecentArticles(response.response.docs);
                } else {
                    apiNYTimes.displayErrorMessage();
                }
                
            });
        },
        callNew() {
            $('.articles').remove();
            apiNYTimes.call();
        },
        displayRecentArticles(response) {
            for (i = 0; i < 6; i++) {
                num = i + 1;
                const headlineText = response[i].headline.main;
                const articleLinkURL = response[i].web_url;

                const headline = $("<h3>").addClass(`article-title card-content`).text(headlineText).attr("data-name", `headline${i}`);
                const articleLink = $("<a>").addClass(`article-link card-content`).text('Read Full Article').attr('href', articleLinkURL).attr('target', '_blank').attr("data-name", `link${i}`);
                const saveButton = $("<button>").addClass('button waves-effect waves-light btn-small').attr('type', 'button').attr('id', 'saveButton').text('Save').attr("data-name", `${i}`);

                const newsArticleDiv = $("<div>").addClass(`articles card-content col s12 m4`).attr("data-name", `article${i}`);
                newsArticleDiv.append(headline, articleLink, saveButton);
                newsArticles.append(newsArticleDiv);
                const recentArticleObject = {
                    title: headlineText,
                    link: articleLinkURL
                }
                apiNYTimes.newestArticles.push(recentArticleObject);
            }
        },
        displayErrorMessage() {
            const country = searchedCountryNameDisplay.text();
            const errorMessage = $('<div>').addClass('articles').text(`There are no search results for ${country}`)
            newsArticles.append(errorMessage);
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


                const articleDiv = $('<div>').addClass('col card s12 m4 articles white-text card-content contentSections articleBlock').attr('data-name', `article-${i}`);
                const titleHeader = $("<h2>").addClass(`article-title`).text(savedNewsArticles[i].title);
                const articleLink = $("<a>").addClass(`article-link card-content`).text('Read Full Article').attr('href', savedNewsArticles[i].link).attr('target', '_blank');
                const deleteButton = $("<button>").addClass('button waves-effect waves-light btn-small').attr('type', 'button').attr('id', 'deleteButton').text('Delete').attr("data-name", `${i}`);
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

    // 
    //  EVENT LISTENERS - click clack pow, another function down
    //     
    $(document).on("click", "#saveButton", apiNYTimes.saveArticle);
    $(document).on("click", "#deleteButton", apiNYTimes.deleteArticle);
    $(document).on('click', '.newContentBtn', apiNYTimes.callNew);
    $('.newSearchBtn').on('click', apiNYTimes.callNew);
    // 
    //  RUN ON PAGE LOAD
    //     
    if (window.location.pathname.includes("data.html")) {
        $(window).on('load', apiNYTimes.call);
    }
    if (Array.isArray(savedNewsArticles)) {  // does an array already exist in local storage?
        apiNYTimes.loadSavedArticles();  // if so, load it
    } else {
        savedNewsArticles = [];  // else, create a new array to be saved
    }
});