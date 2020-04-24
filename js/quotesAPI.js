//TIMER
var time = document.getElementById("timer");
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var stop = document.getElementById("stop");
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

var addedSeconds = 0,
  addedMinutes = 0,
  addedHours = 0,
  addedTime = 0.01,
  newTime = 0;

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  time.innerHTML =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

$("#quoteButton").on("click", function() {
  quote();
});

$("#start").on("click", function(event) {
  event.preventDefault();
  $("#start")
    .empty()
    .append("Start");
  clearTimeout(t);
  timer();
  console.log("Start");
});

$("#pause").on("click", function() {
  clearTimeout(t);
  $("#start")
    .empty()
    .append("Start");
});

$("#stop").on("click", function() {
  if (seconds === 0 && minutes === 0 && hours === 0) {
    return;
  }

  quote();
  $("#start")
    .empty()
    .append("Start");
  clearInterval(t);
  time.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
});

function quote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "en",
      format: "jsonp"
    },
    success: function(response) {
      $("#quote").html(response.quoteText);
      $("#author").html("<br/>&dash; " + response.quoteAuthor);
    }
  });
}
