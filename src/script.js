//COVID-19 API implementation for MyCovidTracker
//written by Dwayne Risley 
//if you have a bug to report, fight me.

let countries = [];
let data = [];

//list of countries
let countryNames = null;

//selected country variables
let currentCountry = "";
let currentCountrySlug = "";
let confirmedCases = "";
let activeCases = "";
let recoveredCases = "";
let deathCases = "";

//CODIV-19 API key
const apiKeyHeaderValue = "?X-Access-Token=019519e3-a704-4f40-9b74-82b632cd0c22";


$('document').ready(function () {
    // index Variables
    const countryInput = $('.autocomplete');
    const countryInputButton = $('#countryInputButton');
    const dataNav = $('#dataNav');

    //data.html Variables
    const countryEl = $('div.populatedCountry h3');
    const confirmedCasesEl = $("#confirmed");
    const activeCasesEl = $("#active");
    const recoveredCasesEl = $("#recovered");
    const deathCasesEl = $("#deaths");



    //get countries from API to populate list
    function getCovidCountries() {
        return $.ajax({
            url: `https://api.covid19api.com/countries${apiKeyHeaderValue}`,
            method: "GET",
            timeout: 0,
        });
    }

    //populate country list with proper names and API slugs
    function setCountrysAndAutofill(response) {

        countries = response;

        countryNames = countries.reduce(function (accumulator, currentValue) {
            accumulator[currentValue.Country] = null;
            return accumulator;
        }, {});

        $('input.autocomplete').autocomplete({
            data: countryNames,
            limit: Infinity
        });
        countryInputButton.prop("disabled", false);

        return Promise.resolve(response);
    }

    //populate data page
    function getCountryData(country, slug) {

        currentCountry = country;
        currentCountrySlug = slug;

        let queryString = `https://api.covid19api.com/total/country/${slug}${apiKeyHeaderValue}`;

        $.ajax({
            url: queryString,
            method: "GET",
            timeout: 0,
        }).done(function (response) {

            data = response;

            let { Active, Confirmed, Deaths, Recovered } = data.reverse().find(response => response.Province === "");

            confirmedCases = Confirmed;
            activeCases = Active;
            recoveredCases = Recovered;
            deathCases = Deaths;

            countryEl.text(country);

            confirmedCasesEl.text(`Confirmed: ${formatNumbers(confirmedCases)}`);
            activeCasesEl.text(`Active: ${formatNumbers(activeCases)}`);
            recoveredCasesEl.text(`Recovered: ${formatNumbers(recoveredCases)}`);
            deathCasesEl.text(`Deaths: ${formatNumbers(deathCases)}`);
        });

    }

    //display global data if no country has been selected
    function getWorldData() {
        let queryString = `https://api.covid19api.com/world/total${apiKeyHeaderValue}`;


        $.ajax({
            url: queryString,
            method: "GET",
            timeout: 0,
        }).done(function (response) {

            confirmedCases = response.TotalConfirmed;
            activeCases = response.TotalConfirmed - response.TotalRecovered - response.TotalDeaths;
            recoveredCases = response.TotalRecovered;
            deathCases = response.TotalDeaths;

            countryEl.text("World Totals");

            confirmedCasesEl.text(`Confirmed: ${formatNumbers(confirmedCases)}`);
            activeCasesEl.text(`Active: ${formatNumbers(activeCases)}`);
            recoveredCasesEl.text(`Recovered: ${formatNumbers(recoveredCases)}`);
            deathCasesEl.text(`Deaths: ${formatNumbers(deathCases)}`);
        });

    }

    //formats numbers with commas 
    //(via https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
    function formatNumbers(theseNumbers) {
        return theseNumbers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //check for stored country to display, or get it from URL
    function initApp() {
        getCovidCountries().then(setCountrysAndAutofill).then(function (response) {

            if (currentCountry === "") {
                localStorage.setItem("country", "");
                //currentCountry = "";
                getWorldData();
            }

            let storedCountry = localStorage.getItem("country");
            let storedCountrySlug = localStorage.getItem("slug");

            if (window.location.pathname.includes("data.html")) {

                if (storedCountry !== "") {

                    getCountryData(storedCountry, storedCountrySlug);

                } else {
                    let urlParams = new URLSearchParams(window.location.search);

                    getCountryData(urlParams.get("current_country"), urlParams.get("slug"));

                }
            }

        });
    }

    //materialize autocomplete
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems, options);
    });
    //listeners
    countryInputButton.on("click", function () {

        currentCountry = countryInput.val();
        let { Slug } = countries.find(country => country.Country === currentCountry);

        currentCountrySlug = Slug;

        localStorage.setItem("country", currentCountry);
        localStorage.setItem("slug", currentCountrySlug);

        //set data.html URL to have slug
        location.href = `data.html?current_country=${currentCountry}&slug=${currentCountrySlug}`;

    });

    dataNav.on('click', function () {
        if (currentCountry === "") {
            localStorage.setItem("country", "");
            //currentCountry = "";
            getWorldData();
        } else {
            getCountryData(currentCountry, currentCountrySlug);
        }

    });

    // Brendan added this for the new country search button on data.html
    $('.newSearchBtn').on('click', function () {

        let newCountry = $('#newCountrySearch').val()
        let { Slug } = countries.find(country => country.Country === newCountry);

        localStorage.setItem("country", newCountry);
        localStorage.setItem("slug", Slug);

        getCountryData(newCountry, Slug);
    });

    //materialize modal
    $('.modal').modal();
    $('.sidenav').sidenav();

    initApp();

});
