

$(document).ready(function(){


const btn = $("#button");

btn.on("click",function(){

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

