
let countries = [];
let countryNames = null;
let currentCountry = "";
let currentCountrySlug = "";
let date = null;
$('document').ready(function () {
    // index Variables
    const countryInput = $('#countryInput');
    const countryInputButton = $('#countryInputButton');
    const dataField = $(".contentSections .card-content");

    //data.html
    const countryEl = $('div.populatedCountry h3');
    date = moment();

    //CovidAPI stuff here

    function getCovidCountries(){
        return $.ajax({
            url: 'https://api.covid19api.com/countries',
            method: "GET",
            timeout: 0,
        });
    }

    function setCountrysAndAutofill(response){


            countries = response;
            //console.log(countries.find(country => country.Country === "United States of America").Slug);

            countryNames = countries.reduce(function (accumulator, currentValue) {
                accumulator[currentValue.Country] = null;
                return accumulator;
            }, {});

            console.log(countryNames);
            $('input.autocomplete').autocomplete({
                data: countryNames,
                limit: Infinity
            });
            countryInputButton.prop("disabled", false);

            return Promise.resolve(response);
    }

    function getCountryData(slug) {

        

        let queryString = `https://api.covid19api.com/live/country/${slug}/status/confirmed`;

        $.ajax({
            url: queryString,
            method: "GET",
            timeout: 0,
        }).done(function (response) {
            var highest = response[ Object.keys(response).sort().pop() ];
            console.log(highest);
        });

    }

    function initApp(){
        getCovidCountries().then(setCountrysAndAutofill).then(function (response){

            if(window.location.pathname.includes("data.html")){
                

             let urlParams = new URLSearchParams(window.location.search);
                
             populateDataPage(urlParams.get("current_country"), urlParams.get("slug"));
            }

        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems, options);
    });

    countryInputButton.on("click", function () {

        

        currentCountry = countryInput.val();
        let queryLogic = countries.find(country => country.Country === currentCountry).Slug;
        currentCountrySlug = queryLogic;
        console.log("click");

        let countryInputText = countryInput.val();

        

        let queryString = `https://api.covid19api.com/live/country/${queryLogic}`;

        $.ajax({
            url: queryString,
            method: "GET",
            timeout: 0,
        }).done(function (response) {
            console.log(countryInputText);
            console.log(response);
        });

        location.href = `data.html?current_country=${currentCountry}&slug=${currentCountrySlug}`;

    });

    function populateDataPage(country, slug){

        getCountryData(slug);

        countryEl.text(country);
        console.log(slug);
    }
    $('.modal').modal();
    $('.sidenav').sidenav();
    initApp();

});
