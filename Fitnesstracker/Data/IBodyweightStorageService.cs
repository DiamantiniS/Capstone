using Fitnesstracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fitnesstracker.Data
{
    public interface IBodyweightStorageService
    {
        public Task<BodyweightRecord[]> GetBodyweightRecords(FitnessUser User, bool AscendingOrder = false);
        public Task<BodyweightTarget> GetBodyweightTarget(FitnessUser User);
        public Task StoreBodyweightRecord(BodyweightRecord Record);
        public Task StoreBodyweightRecords(IEnumerable<BodyweightRecord> Records);
        public Task DeleteExistingRecords(FitnessUser User);
        public Task StoreBodyweightTarget(BodyweightTarget Target);
    }
}
