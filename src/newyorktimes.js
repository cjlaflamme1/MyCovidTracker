$('document').ready(function () {

let userInputTerm = '';
let userInputSort = '';

// NY Times API Object
const apiNYTimes = {
    apiKey: `9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
    searchTerm: `q=${userInputTerm}`,  // default to 'Coronavirus'
    searchSort: `&sort=${userInputSort}`,  // default to 'newest'
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?${apiNYTimes.searchTerm}${apiNYTimes.searchSort}&api-key=${apiNYTimes.apiKey}`,
    call() {
        this.checkInputs();
        $.ajax({
            url: this.url,
            method: "GET"
        }).then(function (response) {
            console.log(response.response.docs);  // r.r.docs accesses 10 first articles to match search criteria
        });
    },
    checkInputs() {
        if (userInputTerm === '') {
            userInputTerm = 'Coronavirus';
        }
        if (userInputSort === '') {
            userInputSort = 'newest';
        }
    }
}

apiNYTimes.call();

});