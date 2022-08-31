const csvToJson = require('convert-csv-to-json');

const matches = csvToJson.fieldDelimiter(',').getJsonFromCsv('./matches.csv');
const deliveries = csvToJson.fieldDelimiter(',').getJsonFromCsv('./deliveries.csv');

getMatchesPlayedPerYear();
getMatchesWonOfAllTeamOverAllYears();
getExtraRunsConceededPerTeam();
getEconomicalBowlerOf2015();



// 1. Number of matches played per year of all the years in IPL.
function getMatchesPlayedPerYear() {
    matchPlayedPerYear = new Map();
    for (match in matches) {
        if (matchPlayedPerYear.has(matches[match]["season"])) {
            matchCounter = matchPlayedPerYear.get(matches[match]["season"]) + 1;
            matchPlayedPerYear.set(matches[match]["season"], matchCounter);
        }
        else {
            matchPlayedPerYear.set(matches[match]["season"], 1);
        }
    }
    console.log("Number of matches played per year of all the years in IPL.");
    console.log(matchPlayedPerYear);
}

// 2. Number of matches won of all teams over all the years of IPL.
function getMatchesWonOfAllTeamOverAllYears() {
    matchesWonOfAllTeamAllYears = new Map();
    for (match in matches) {
        if (matchesWonOfAllTeamAllYears.has(matches[match]["winner"])) {
            winningCounter = matchesWonOfAllTeamAllYears.get(matches[match]["winner"]) + 1;
            matchesWonOfAllTeamAllYears.set(matches[match]["winner"], winningCounter);
        }
        else {
            matchesWonOfAllTeamAllYears.set(matches[match]["winner"], 1);

        }
    }
    console.log("Number of matches won of all teams over all the years of IPL.");
    console.log(matchesWonOfAllTeamAllYears);
}

// 3. For the year 2016 get the extra runs conceded per team.
function getExtraRunsConceededPerTeam() {
    matchesIdOfYear = getMatchIdOfYear(2016);

    extraRunsConceededPerTeam = new Map();

    for (delivery in deliveries) {
        if (matchIdOfYear.includes(deliveries[delivery]["match_id"])) {
            extraRuns = parseInt(deliveries[delivery]["extra_runs"]);
            if (extraRunsConceededPerTeam.has(deliveries[delivery]["bowling_team"])) {
                extraRunsCounter = extraRunsConceededPerTeam.get(deliveries[delivery]["bowling_team"]) + extraRuns;
                extraRunsConceededPerTeam.set(deliveries[delivery]["bowling_team"], extraRunsCounter);
            }
            else {
                extraRunsConceededPerTeam.set(deliveries[delivery]["bowling_team"], extraRuns);
            }
        }
    }
    console.log("For the year 2016 get the extra runs conceded per team.");
    console.log(extraRunsConceededPerTeam);

}

// 4. For the year 2015 get the top economical bowlers.
function getEconomicalBowlerOf2015() {
    matchesIdOf2015 = getMatchIdOfYear(2015);

    numberOfBallsThrown = new Map();
    givenRuns = new Map();
    for (delivery in deliveries) {
        if (matchesIdOf2015.includes(deliveries[delivery]["match_id"])) {
            if (deliveries[delivery]["noball_runs"] == '0' && deliveries[delivery]["wide_runs"] == '0') {
                if (numberOfBallsThrown.has(deliveries[delivery]["bowler"])) {
                    ballCounter = numberOfBallsThrown.get(deliveries[delivery]["bowler"]) + 1;
                    numberOfBallsThrown.set(deliveries[delivery]["bowler"], ballCounter);
                }
                else {
                    numberOfBallsThrown.set(deliveries[delivery]["bowler"], 1);
                }
            }

            totalRunsGivenPerBall = parseInt(deliveries[delivery]["total_runs"]) -
                parseInt(deliveries[delivery]["bye_runs"]) - parseInt(deliveries[delivery]["legbye_runs"]);

            if (givenRuns.has(deliveries[delivery]["bowler"])) {
                runsCounter = givenRuns.get(deliveries[delivery]["bowler"]) + totalRunsGivenPerBall;
                givenRuns.set(deliveries[delivery]["bowler"], runsCounter);
            }
            else {
                givenRuns.set(deliveries[delivery]["bowler"], totalRunsGivenPerBall);
            }
        }
    }

    economyRateOfEachBowler = new Map();

    for (var bowler of numberOfBallsThrown.keys()) {
        economyRateOfEachBowler.set(bowler, (givenRuns.get(bowler) * 6) / numberOfBallsThrown.get(bowler));

    }

    sortedEconomyRate = new Map([...economyRateOfEachBowler].sort((a, b) => a[1] - b[1]));
    console.log("For the year 2015 get the top economical bowlers.");
    console.log(sortedEconomyRate);
}


function getMatchIdOfYear(year) {
    matchIdOfYear = new Array();
    for (match in matches) {
        if (matches[match]["season"] == year) {
            matchIdOfYear.push(matches[match]["id"]);
        }
    }
    return matchIdOfYear;
}