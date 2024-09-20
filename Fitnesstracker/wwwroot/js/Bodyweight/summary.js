async function setupGraph(Days, TargetSelector) {
    try {
        const response = await $.get("/Bodyweight/GetBodyweightData", { PreviousDays: Days });
        const dates = response.map(x => x.date);
        const weights = response.map(x => x.weight);
        const goalValue = $("#TargetWeight").data("target");
        const goals = Array(dates.length).fill(goalValue);

        const minValue = Math.min(Math.min(...weights), goalValue) * 0.99;
        const maxValue = Math.max(Math.max(...weights), goalValue) * 1.01;

        const context = $(TargetSelector)[0].getContext("2d");
        const chart = new Chart(context, {
            type: "line",
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Weight (kg)",
                        data: weights,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: "#0089dc",
                        borderWidth: 2,
                        lineTension: 0
                    },
                    {
                        label: "Goal (kg)",
                        data: goals,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: "#0089dc",
                        borderWidth: 2,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: minValue,
                            suggestedMax: maxValue
                        }
                    }]
                }
            }
        });
    } catch (error) {
        console.error("Error fetching bodyweight data:", error);
    }
}

$(function () {
    setupGraph(7, "#WeekGraph");
    setupGraph(28, "#MonthGraph");
});
