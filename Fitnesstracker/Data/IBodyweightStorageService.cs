using Fitnesstracker.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fitnesstracker.Data
{
    public interface IBodyweightStorageService
    {
        Task<BodyweightRecord[]> GetBodyweightRecords(FitnessUser User, bool AscendingOrder = false);
        Task<BodyweightTarget?> GetBodyweightTarget(FitnessUser User);
        Task StoreBodyweightRecord(BodyweightRecord Record);
        Task StoreBodyweightRecords(IEnumerable<BodyweightRecord> Records);
        Task DeleteExistingRecords(FitnessUser User);
        Task StoreBodyweightTarget(BodyweightTarget Target);
    }
}

