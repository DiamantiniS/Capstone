async function setupGraph(Days, TargetSelector) {
    try {
        const response = await $.get("/Bodyweight/GetBodyweightData", { PreviousDays: Days });
        if (!response || response.length === 0) {
            console.error("Nessun dato disponibile per il grafico.");
            return;
        }

        console.log(response); // Aggiungi questo per verificare i dati

        const dates = response.map(x => x.date);
        const weights = response.map(x => x.weight).filter(value => value !== null && !isNaN(value) && value > 0 && value < 300);
        const goalValue = $("#TargetWeight").data("target");
        const goals = Array(dates.length).fill(goalValue);

        const minValue = Math.min(...weights, goalValue) * 0.99;
        const maxValue = Math.max(...weights, goalValue) * 1.01;

        const context = $(TargetSelector)[0].getContext("2d");
        const chart = new Chart(context, {
            type: "line",
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Weight (kg)",
                        data: weights,
                        backgroundColor: 'rgba(220, 3, 10, 0.2)',
                        borderColor: "#dc030a",
                        borderWidth: 3,
                        lineTension: 0.3
                    },
                    {
                        label: "Goal (kg)",
                        data: goals,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: "#000",
                        borderWidth: 2,
                        borderDash: [10, 5]
                    }
                ]
            },
            options: {
                scales: {
                    y: {
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
