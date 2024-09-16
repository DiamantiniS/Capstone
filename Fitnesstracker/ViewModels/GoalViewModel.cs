using Fitnesstracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fitnesstracker.ViewModels
{
    public class GoalViewModel
    {
        public Goal Goal{get;set;}
        public GoalProgress[] Progress { get; set; }


    }
}
