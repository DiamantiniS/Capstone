// File: Models/WorkoutSession.cs
using System.ComponentModel.DataAnnotations;

namespace Fitnesstracker.Models
{
    public class WorkoutSession
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } // Aggiunta della proprietà Name

        public List<WorkoutActivity> Activities { get; set; } = new List<WorkoutActivity>();
    }
}
