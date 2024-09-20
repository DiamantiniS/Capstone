function getData(ParentSelector, DataName) {
    return $(ParentSelector + " div").map((index, element) => $(element).data(DataName)).get();
}

function createChart(context, labels, datasets) {
    return new Chart(context, {
        type: "line",
        data: {
            labels: labels.reverse(),
            datasets: datasets
        }
    });
}

function setupGraph(url, days, caloriesSelector, macroSelector) {
    $.get(url, { PreviousDays: days }, function (data) {
        const dates = data.map(x => x.date).reverse();
        const calories = data.map(x => x.calories).reverse();
        const carbs = data.map(x => x.carbs).reverse();
        const protein = data.map(x => x.protein).reverse();
        const fat = data.map(x => x.fat).reverse();

        const caloriesContext = $(caloriesSelector)[0].getContext("2d");
        createChart(caloriesContext, dates, [{
            label: "Calories",
            data: calories,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,255,1)',
            borderWidth: 2,
            lineTension: 0
        }]);

        const macroContext = $(macroSelector)[0].getContext("2d");
        createChart(macroContext, dates, [
            {
                label: "Carbs",
                data: carbs,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0, 199, 0, 1)',
                borderWidth: 2,
                lineTension: 0
            },
            {
                label: "Protein",
                data: protein,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(240, 220, 0, 1)',
                borderWidth: 2,
                lineTension: 0
            },
            {
                label: "Fat",
                data: fat,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(240, 0, 0, 1)',
                borderWidth: 2,
                lineTension: 0
            }
        ]);
    });
}

function setupWeekGraph() {
    setupGraph("/Nutrition/GetNutritionData", 7, "#WeekCaloriesGraph", "#WeekMacroGraph");
}

function setupMonthGraph() {
    setupGraph("/Nutrition/GetNutritionData", 28, "#MonthCaloriesGraph", "#MonthMacroGraph");
}

$(document).ready(function () {
    setupWeekGraph();
    setupMonthGraph();
});


