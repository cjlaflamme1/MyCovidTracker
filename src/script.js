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
