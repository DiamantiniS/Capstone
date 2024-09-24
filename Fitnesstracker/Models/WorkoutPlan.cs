using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Fitnesstracker.Models
{
    public class WorkoutPlan
    {
        public long ID { get; set; }

        [Required]
        public FitnessUser User { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string SessionsJSON { get; set; }

        [NotMapped]
        public WorkoutSession[] Sessions
        {
            get
            {
                try
                {
                    return JsonSerializer.Deserialize<WorkoutSession[]>(this.SessionsJSON);
                }
                catch (JsonException ex)
                {
                    // Log the error or handle it as needed
                    return new WorkoutSession[0];
                }
            }
        }
    }

}
