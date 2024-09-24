using System.ComponentModel.DataAnnotations;

namespace Fitnesstracker.Models
{
    public class Exercise
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string MuscleGroup { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Url]
        public string VideoUrl { get; set; }
    }
}
