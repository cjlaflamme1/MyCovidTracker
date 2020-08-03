
let countries = [];
let countryNames = null;
let currentCountry = "";
let countrySlugs = {};
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

    function setCountrySlugsAndAutofill(response){

        countrySlugs = countries.reduce(function (accumulator, currentValue) {
                accumulator[currentValue.Country] = currentValue.Country.Slug;
                return accumulator;
            }, {});

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

    function populateCountryData(response) {

        //use response to populate DOM

    }

    function initApp(){
        getCovidCountries().then(setCountrySlugsAndAutofill).then(function (response){
            //check URL to determine if in data.html, call populateCountryData(response)
            if(window.location.pathname.includes("data.html")){
                populateCountryData(response);
             //if(get currentCountry) 

             let urlParams = new URLSearchParams(window.location.search);
                
             populateDataPage(urlParams.get("current_country"));
            }

        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems, options);
    });

    countryInputButton.on("click", function () {
        currentCountry = countryInput.val();

        console.log("click");

        let countryInputText = countryInput.val();

        let queryLogic = countries.find(country => country.Country === currentCountry).Slug;

        let queryString = `https://api.covid19api.com/live/country/${queryLogic}`;

        $.ajax({
            url: queryString,
            method: "GET",
            timeout: 0,
        }).done(function (response) {
            console.log(countryInputText);
            console.log(response);
        });

        location.href = "data.html?current_country=" + currentCountry;
        populateDataPage(currentCountry);

    });

    function populateDataPage(country){
        countryEl.text(country);
    }
    $('.modal').modal();
    $('.sidenav').sidenav();
    initApp();

});
