$(document).ready(function () {
    const type = $("#ProgressType").data("goaltype");
    if (type === "weightlifting") {
        LoadWeightliftingGraph();
    } else {
        LoadTimedGraph();
    }
});

async function LoadWeightliftingGraph() {
    const id = $("#ProgressType").data("goalid");

    try {
        const result = await $.get("/Goal/GetWeightliftingProgress", { GoalID: id });
        const dates = result.map(record => record.date);
        const weights = result.map(record => record.weight);
        const goalWeight = Array(dates.length).fill($("#WeightliftingGoal").data("goal"));

        const minWeight = Math.min(...weights);
        const minValue = Math.min(minWeight, goalWeight[0]) - 5;

        const maxWeight = Math.max(...weights);
        const maxValue = Math.max(maxWeight, goalWeight[0]) + 5;

        const ctx = $("#ProgressChart")[0].getContext("2d");

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Weight (kg)",
                        data: weights,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: "#0089dc"
                    },
                    {
                        label: "Goal (kg)",
                        data: goalWeight,
                        borderDash: [5, 5],
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: "#0089dc"
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
        console.error("Error fetching weightlifting progress data:", error);
    }
}

function LoadTimedGraph() {
    // Implementazione futura
}

