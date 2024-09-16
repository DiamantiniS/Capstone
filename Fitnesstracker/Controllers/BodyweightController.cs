using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fitnesstracker.Data;
using Fitnesstracker.Models;
using Fitnesstracker.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fitnesstracker.Controllers
{
    [Authorize]
    public class BodyweightController : Controller
    {
        private readonly IBodyweightStorageService _storageService;
        private readonly UserManager<FitnessUser> _userManager;

        public BodyweightController(IBodyweightStorageService storageService, UserManager<FitnessUser> userManager)
        {
            _storageService = storageService;
            _userManager = userManager;
        }

        private async Task<FitnessUser?> GetUser()
        {
            return await _userManager.GetUserAsync(HttpContext.User);
        }

        public async Task<IActionResult> Summary()
        {
            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
            {
                return Unauthorized();
            }

            var records = await _storageService.GetBodyweightRecords(currentUser);
            var target = await _storageService.GetBodyweightTarget(currentUser);

            if (records == null || !records.Any())
            {
                // Aggiungi un record fittizio se records è vuoto
                records = new BodyweightRecord[]
                {
                    new BodyweightRecord
                    {
                        User = currentUser,
                        Date = DateTime.Today,
                        Weight = 0 // Peso fittizio
                    }
                };
            }

            if (target == null)
            {
                // Inizializza un target fittizio se target è null
                target = new BodyweightTarget
                {
                    User = currentUser,
                    TargetWeight = 0, // Peso target fittizio
                    TargetDate = DateTime.Today // Data target fittizia
                };
            }

            BodyweightSummaryViewModel viewModel = new BodyweightSummaryViewModel(records, target);
            return View(viewModel);
        }

        [HttpGet]
        public async Task<IActionResult> EditTarget()
        {
            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
                return Unauthorized();

            BodyweightTarget target = await _storageService.GetBodyweightTarget(currentUser);

            return View(target);
        }

        [HttpPost]
        public async Task<IActionResult> EditTarget(float TargetWeight, DateTime TargetDate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
            {
                return Unauthorized();
            }

            BodyweightTarget target = new BodyweightTarget
            {
                TargetWeight = TargetWeight,
                TargetDate = TargetDate,
                User = currentUser
            };

            await _storageService.StoreBodyweightTarget(target);

            return RedirectToAction("Summary");
        }


        [HttpGet]
        public async Task<IActionResult> EditRecords()
        {
            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
                return Unauthorized();

            BodyweightRecord[] records = await _storageService.GetBodyweightRecords(currentUser);

            return View(records);
        }

        [HttpPost]
        public async Task<IActionResult> EditRecords(DateTime[] Dates, float[] Weights)
        {
            if (Dates == null || Weights == null)
                return BadRequest();
            if (Dates.Length != Weights.Length)
                return BadRequest();

            for (int i = 0; i < Dates.Length; i++)
            {
                if (Weights[i] <= 0 || Weights[i] >= 200)
                    return BadRequest();
            }

            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
                return Unauthorized();

            await _storageService.DeleteExistingRecords(currentUser);

            BodyweightRecord[] records = new BodyweightRecord[Dates.Length];
            for (int i = 0; i < Dates.Length; i++)
            {
                BodyweightRecord newRecord = new BodyweightRecord()
                {
                    User = currentUser,
                    Date = Dates[i],
                    Weight = Weights[i]
                };
                records[i] = newRecord;
            }

            await _storageService.StoreBodyweightRecords(records);
            return RedirectToAction("Summary");
        }

        [HttpPost]
        public async Task<IActionResult> AddTodayWeight(float Weight)
        {
            if (Weight <= 0 || Weight >= 200)
                return BadRequest();

            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
                return Unauthorized();

            BodyweightRecord newRecord = new BodyweightRecord()
            {
                User = currentUser,
                Date = DateTime.Today,
                Weight = Weight
            };

            await _storageService.StoreBodyweightRecord(newRecord);
            return RedirectToAction("Summary");
        }

        [HttpGet]
        public async Task<IActionResult> GetBodyweightData(int PreviousDays)
        {
            FitnessUser? currentUser = await GetUser();
            if (currentUser == null)
                return Unauthorized();

            BodyweightRecord[] records = await _storageService.GetBodyweightRecords(currentUser, true);

            var result = records.Select(record => new { Date = record.Date.ToString("d"), Weight = record.Weight }).ToArray();

            return Json(result);
        }
    }
}
