﻿using Microsoft.AspNetCore.Identity;

namespace Fitnesstracker.Models
{
    public class FitnessUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }

    }
}
