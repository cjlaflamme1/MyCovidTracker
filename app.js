// HTML linked Variables

const apiNYTimes = {
    call(searchTerm) {
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=9dBz5iLUOkToYiTEjcz0mgrNxq65pGzm`,
            method: "GET"
        }).then(function (response) {
            console.log(response.response.docs);
        }); 
    }
}

apiNYTimes.call('covid');