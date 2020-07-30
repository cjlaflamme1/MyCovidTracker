$('document').ready(function () {

    let userInputTerm = '';
    let userInputSort = '';

    // NY Times API Object
    const apiNYTimes = {
        searchTerm: userInputTerm,  // default to 'Coronavirus'
        searchSort: userInputSort,  // default to 'newest'
        checkInputs() {
            if (userInputTerm === '') {
                userInputTerm = 'Coronavirus';
            }
            if (userInputSort === '') {
                userInputSort = 'newest';
            }
        },
        call() {
            this.checkInputs();
            $.ajax({
                url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${apiNYTimes.searchTerm}&sort=${apiNYTimes.searchSort}&api-key=9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
                method: "GET"
            }).then(function (response) {
                console.log(response.response.docs);  // r.r.docs accesses 10 first articles to match search criteria
                
            });
            return response;
        },
        topArticles() {
            apiNYTimes.call();
            const articleDataVars = {
                headline: response.response.docs[i].headline.main,
            }
            for (i = 0; i < 5; i++) {
                console.log(articleDataVars.headline);
            }
        }

    }

    // apiNYTimes.call();
    apiNYTimes.topArticles();

});