var newHighScore = prompt('Please enter your initials: ')
alert(localStorage.getItem('timeRemaining'))
localStorage.setItem(newHighScore, localStorage.getItem('timeRemaining'))

var highScores = [
    {name: "js", score: 22},
    {name: "bs", score: 21},
    {name: "os", score: 30},
];

localStorage.setItem("highscores", JSON.stringify(highScores));

var retrievedScores = JSON.parse(localStorage.getItem("highscores"));

for (var i = 0; i < retrievedScores.length; i++) {
    hst.innerHTML += "<tr><td>" + retrievedScores[i].name + "</td><td>" + retrievedScores[i].score + "</td></tr>";
}