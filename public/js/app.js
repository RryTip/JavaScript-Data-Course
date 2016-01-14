var peopleData = JSON.parse(document.getElementById('peopleData').textContent);
var people = peopleData.people;
var template = document.getElementById('template').textContent;
var peopleList = document.getElementById('peopleList');
var peopleCount = document.getElementById('peopleCount');
var meanAge = document.getElementById('meanAge');

renderPage(people);

function renderPage (people) {
    displayList(people);

    showPeopleCount(people);

    calcMeanAge(people);
}

function displayList (people) {
    var html = '';

    people.forEach(function(person) {
        html += template.replace(/{{ id }}/, person.id)
                        .replace(/{{ id }}/, person.id)
                        .replace(/{{ username }}/, person.username)
                        .replace(/{{ gender }}/, person.gender)
                        .replace(/{{ age }}/, person.age);
    });

    peopleList.innerHTML = html;
}

function showPeopleCount (people) {
    peopleCount.innerHTML = people.length;
}

function calcMeanAge (people) {
    if (! people.length) {
        meanAge.innerHTML = '';

        return;
    }

    var ageArray = getPeopleAge(people);

    meanAge.innerHTML = '(' + getMean(ageArray) + ')';
}

function getMean (numbers) {
    var sum = numbers.reduce(function(initial, number) {
        return initial + number;
    }, 0);

    return formatNumber(sum / numbers.length, 2);
}

function formatNumber (number, place) {
    var factor = Math.pow(10, place);

    return Math.round(number * factor) / factor;
}

function deletePerson (id) {
    // people = people.filter(function(person) {
    //     return person.id != id;
    // });
    var index = getPeopleId().indexOf(id);

    people.splice(index, 1);

    renderPage(people);
}

function getPeopleId () {
    return people.map(function(person) {
        return person.id;
    });
}

function getPeopleAge (people) {
    return people.map(function(person) {
        return person.age;
    });
}
