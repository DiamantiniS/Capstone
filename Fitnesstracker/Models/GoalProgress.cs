﻿namespace Fitnesstracker.Models
{
    public class GoalProgress
    {
        public long ID { get; set; }
        public FitnessUser User { get; set; }
        public Goal Goal { get; set; }
        public DateTime Date { get; set; }

    }
}
