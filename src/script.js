
let countries = [];
let data = [];
let countryNames = null;
let currentCountry = "";
let currentCountrySlug = "";
let confirmedCases = "";
let activeCases = "";
let recoveredCases = "";
let deathCases = "";

let date = null;
let apiKeyHeaderValue = "?X-Access-Token=019519e3-a704-4f40-9b74-82b632cd0c22";


$('document').ready(function () {
    // index Variables
    const countryInput = $('.autocomplete');
    const countryInputButton = $('#countryInputButton');
    const dataField = $(".contentSections .card-content");

    //data.html
    const countryEl = $('div.populatedCountry h3');
    const confirmedCasesEl = $("#confirmed");
    const activeCasesEl = $("#active");
    const recoveredCasesEl = $("#recovered");
    const deathCasesEl = $("#deaths");

    date = moment();

    //CovidAPI stuff here

    function getCovidCountries() {
        return $.ajax({
            url: `https://api.covid19api.com/countries${apiKeyHeaderValue}`,
            method: "GET",
            timeout: 0,
        });
    }

    function setCountrysAndAutofill(response) {


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

    function getCountryData(country, slug) {

        currentCountry = country;
        currentCountrySlug = slug;

        let today = moment().format().slice(0, 10);
        console.log(today);
        //https://api.covid19api.com/live/country/south-africa/status/confirmed/date/2020-03-21T13:13:30Z
        // let queryString = `https://api.covid19api.com/live/country/${slug}/status/confirmed/date/${today}T12:00:00Z`
        let queryString = `https://api.covid19api.com/total/country/${slug}${apiKeyHeaderValue}`;

        $.ajax({
            url: queryString,
            method: "GET",
            timeout: 0,
        }).done(function (response) {
            //var highest = response[ Object.keys(response).sort().pop() ];
            data = response;

            console.log(response);
            let { Active, Confirmed, Deaths, Recovered } = data.reverse().find(response => response.Province === "");

            confirmedCases = Confirmed;
            activeCases = Active;
            recoveredCases = Recovered;
            deathCases = Deaths;

            countryEl.text(country);

            confirmedCasesEl.text(`Confirmed: ${confirmedCases}`);
            activeCasesEl.text(`Active: ${activeCases}`);
            recoveredCasesEl.text(`Recovered: ${recoveredCases}`);
            deathCasesEl.text(`Deaths: ${deathCases}`);

            console.log(slug);


            //let thingy = response.find(response => response.Province === "");

            console.log(`${Active},${Confirmed},${Deaths},${Recovered}`);
        });

    }

    function refactorBigNumbers(theseNumbers) {
        return theseNumbers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function initApp() {
        getCovidCountries().then(setCountrysAndAutofill).then(function (response) {

            if (window.location.pathname.includes("data.html")) {

                let urlParams = new URLSearchParams(window.location.search);

                getCountryData(urlParams.get("current_country"), urlParams.get("slug"));

            }

        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems, options);
    });

    countryInputButton.on("click", function () {

        currentCountry = countryInput.val();
        let { Slug } = countries.find(country => country.Country === currentCountry);

        currentCountrySlug = Slug;
        console.log("click");

        let countryInputText = countryInput.val();

        let queryString = `https://api.covid19api.com/live/country/${Slug}${apiKeyHeaderValue}`;

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

    function populateDataPage(country, slug) {




    }
    $('.modal').modal();
    $('.sidenav').sidenav();
    initApp();

    // Brendan added this for the new country search button on data.html
    $('.newSearchBtn').on('click', function () {
        populateDataPage($('#newCountrySearch').val());
    });

});
