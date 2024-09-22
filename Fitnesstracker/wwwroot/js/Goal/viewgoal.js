$(function () {
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
        const weights = result.map(record => record.weight).filter(value => value !== null && !isNaN(value));
        const goalWeight = Array(dates.length).fill($("#WeightliftingGoal").data("goal"));

        if (weights.length === 0) {
            console.error("Nessun dato valido per il grafico.");
            return;
        }

        const minValue = Math.min(...weights, goalWeight[0]) - 5;
        const maxValue = Math.max(...weights, goalWeight[0]) + 5;

        const ctx = $("#ProgressChart")[0].getContext("2d");

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Weight (kg)",
                        data: weights,
                        backgroundColor: 'rgba(220, 3, 10, 0.2)',
                        borderColor: "#dc030a",
                        borderWidth: 3
                    },
                    {
                        label: "Goal (kg)",
                        data: goalWeight,
                        borderDash: [5, 5],
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: "#a50207"
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: false,
                            color: "#fff"
                        },
                        suggestedMin: minValue,
                        suggestedMax: maxValue,
                        grid: {
                            color: "#444"
                        }
                    },
                    x: {
                        ticks: {
                            color: "#fff"
                        },
                        grid: {
                            color: "#444"
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Errore nel caricamento dei dati per il grafico:", error);
    }
}

function LoadTimedGraph() {
    // Implementazione futura
}
