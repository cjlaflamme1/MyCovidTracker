// HTML linked Variables

// NY Times API Object
const apiNYTimes = {
    apiKey: `9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
    call() {
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_fields=day_of_week&q=Coronavirus&sort=newest&api-key=${this.apiKey}`,
            method: "GET"
        }).then(function (response) {
            console.log(response.response.docs);
        }); 
    }
}

apiNYTimes.call();