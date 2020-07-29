$('document').ready(function () {
    // HTML linked Variables
    const countryInput = $('#countryInput');
    const countryInputButton = $('#countryInputButton');

    // NY Times API Object
    const apiNYTimes = {
        apiKey: `9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
        searchTerm: `q=${userInputTerm}`,  // default to 'Coronavirus'
        searchSort: `&sort=${userInputSort}`,  // default to 'newest'
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?${this.searchTerm}${this.searchSort}&api-key=${this.apiKey}`,
        call() {
            $.ajax({
                url: this.url,
                method: "GET"
            }).then(function (response) {
                console.log(response.response.docs);  // r.r.docs accesses 10 first articles to match search criteria
            });
        }
    }

    apiNYTimes.call();



    const btn = $("#button");

    btn.on("click", function () {

        console.log("click");

        $.ajax({
            url: 'https://api.covid19api.com/world/total?from=2020-07-27T00:00:00Z&to=2020-07-28T00:00:00Z',
            method: "GET",
            timeout: 0,
        }).done(function (response) {
            console.log(response);
        });

        // $.ajax({
        //     url: 'https://api.covid19api.com/united-states/total/date/2020-07-27T00:00:00Z',
        //     method: "GET",
        //     timeout: 0,
        // }).done(function (response) {
        //     console.log(response);
        // }); 

    });
});
