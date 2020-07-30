
let countries = [];
let countryNames = {};
$('document').ready(function () {
    // HTML linked Variables
    const countryInput = $('#countryInput');
    const countryInputButton = $('#countryInputButton');

    

    populateCountryList();


    //CovidAPI stuff here

    function populateCountryList() {
        $.ajax({
            url: 'https://api.covid19api.com/countries',
            method: "GET",
            timeout: 0,
        }).then(function (response) {

            
            countries = response;
            console.log(countries.find(country => country.Country === "United States of America").Slug);

            countryNames = countries.reduce(function(accumulator, currentValue) {
                accumulator[currentValue.Country] = null;
                return accumulator;
               // return [...accumulator, currentValue.Country]
              }, {});

            console.log(countryNames);

            $('input.autocomplete').autocomplete({
                data: countryNames,
                limit: Infinity
            });


            countryInputButton.prop("disabled", false);
        });

        //console.log(countries);
    }

    

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems, options);
      });


    countryInputButton.on("click", function () {

        console.log("click");

        let countryInputText = countryInput.val();

        let queryString = `https://api.covid19api.com/country${countryInputText}`;

        $.ajax({
            url: 'https://api.covid19api.com/world/total?from=2020-07-27T00:00:00Z&to=2020-07-28T00:00:00Z',
            method: "GET",
            timeout: 0,
        }).done(function (response) {
            console.log(response);
        });

    });
    $('.modal').modal();
});
