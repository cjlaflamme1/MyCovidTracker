$('document').ready(function () {

let userInputTerm = 'Coronavirus';
let userInputSort = 'newest';

// NY Times API Object
const apiNYTimes = {
    searchTerm: userInputTerm,  // default to 'Coronavirus'
    searchSort: userInputSort,  // default to 'newest'
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.searchTerm}&sort=${this.searchSort}&api-key=9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
    checkInputs() {
        if (userInputTerm === '') {
            userInputTerm = 'Coronavirus';
        }
        if (userInputSort === '') {
            userInputSort = 'newest';
        }
    },
    call() {
        $.ajax({
            url: this.url,
            method: "GET"
        }).then(function (response) {
            console.log(response.response.docs);  // r.r.docs accesses 10 first articles to match search criteria
        });
    },
    
}

apiNYTimes.call();
console.log(apiNYTimes.url);

});