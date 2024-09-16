﻿using Fitnesstracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fitnesstracker.Models;

namespace Fitnesstracker.ViewModels
{
    public class BodyweightSummaryViewModel
    {
        public IEnumerable<BodyweightRecord> AllRecords { get; set; }
        public IEnumerable<BodyweightRecord> CurrentWeekRecords { get; private set; }
        public IEnumerable<BodyweightRecord> CurrentMonthRecords { get; private set; }
        public BodyweightRecord MostRecentRecord { get; private set; }

        public BodyweightTarget Target { get; private set; }

        public float CurrentWeekProgress { get; private set; } = 0;
        public float CurrentWeekAverage { get; private set; } = 0;
        public float CurrentMonthProgress { get; private set; } = 0;
        public float CurrentMonthAverage { get; private set; } = 0;
        public float AllTimeProgress { get; private set; } = 0;
        public float AllTimeAverage { get; private set; } = 0;
        public float DistanceToTarget { get; private set; } = 0;
        public float DailyProgressNeeded { get; private set; } = 0;
        public float WeeklyProgressNeeded { get; private set; } = 0;

        public BodyweightSummaryViewModel(IEnumerable<BodyweightRecord> AllRecords, BodyweightTarget Target)
        {
            if (AllRecords == null || !AllRecords.Any())
            {
                throw new ArgumentException("AllRecords non può essere nullo o vuoto", nameof(AllRecords));
            }

            if (Target == null)
            {
                throw new ArgumentNullException(nameof(Target), "Target non può essere nullo");
            }

            this.AllRecords = AllRecords;
            this.Target = Target;
            this.MostRecentRecord = AllRecords.First();

            CurrentMonthRecords = AllRecords.Where(record => record.Date >= DateTime.Today.AddDays(-28));
            CurrentWeekRecords = CurrentMonthRecords.Where(record => record.Date >= DateTime.Today.AddDays(-7));

            if (CurrentWeekRecords.Any())
            {
                CurrentWeekProgress = CurrentWeekRecords.First().Weight - CurrentWeekRecords.Last().Weight;
                CurrentWeekAverage = CurrentWeekProgress / 7;
            }

            if (CurrentMonthRecords.Any())
            {
                CurrentMonthProgress = CurrentMonthRecords.First().Weight - CurrentMonthRecords.Last().Weight;
                CurrentMonthAverage = CurrentMonthProgress / 28;
            }

            if (AllRecords.Any())
            {
                AllTimeProgress = AllRecords.First().Weight - AllRecords.Last().Weight;
                AllTimeAverage = AllTimeProgress / ((float)(AllRecords.First().Date - AllRecords.Last().Date).TotalDays) * 7;
            }

            DistanceToTarget = Target.TargetWeight - MostRecentRecord.Weight;
            DailyProgressNeeded = (float)(DistanceToTarget / (Target.TargetDate - DateTime.Today).TotalDays);
            WeeklyProgressNeeded = DailyProgressNeeded * 7;
        }
    }
}
