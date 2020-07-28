$('document').ready(function () {
    // HTML linked Variables


    // NY Times API Object
    const apiNYTimes = {
        apiKey: `9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
        searchTerm: `q=${userInputTerm}`,
        searchSort: `&sort=${userInputSort}`,
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?${this.searchTerm}${this.searchSort}&api-key=${this.apiKey}`,
        call() {
            $.ajax({
                method: "GET"
            }).then(function (response) {
                console.log(response.response.docs);
            });
        }
    }

    apiNYTimes.call();
});

