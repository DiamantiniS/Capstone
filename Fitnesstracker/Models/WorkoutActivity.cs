using System.ComponentModel.DataAnnotations;

namespace Fitnesstracker.Models
{
    public class WorkoutActivity
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; }

        [Required]
        [Range(1, 100)]
        public int Sets { get; set; }

        public int RestPeriodSeconds { get; set; }

        [Required]
        public int ExerciseId { get; set; }

        // Aggiungi queste proprietà
        [Required]
        [Range(1, 100)]
        public int Reps { get; set; }

        [Required]
        [Range(1, 1000)]
        public int Weight { get; set; }
    }



}
