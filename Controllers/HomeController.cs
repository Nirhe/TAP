using Microsoft.AspNetCore.Mvc;
using TAP.Services;

namespace TAP.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITicketIngestionService _ticketIngestionService;
        private readonly IAnalysisEngine _analysisEngine;
        private readonly IRecommendationEngine _recommendationEngine;

        public HomeController(
            ITicketIngestionService ticketIngestionService,
            IAnalysisEngine analysisEngine,
            IRecommendationEngine recommendationEngine)
        {
            _ticketIngestionService = ticketIngestionService;
            _analysisEngine = analysisEngine;
            _recommendationEngine = recommendationEngine;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AnalyzeTicket(string ticketContent)
        {
            if (!await _ticketIngestionService.ValidateTicketAsync(ticketContent))
            {
                return BadRequest("Invalid ticket content");
            }

            var analysis = await _analysisEngine.AnalyzeTicketAsync(ticketContent);
            var recommendations = await _recommendationEngine.GenerateRecommendationsAsync(ticketContent);
            var assignees = await _recommendationEngine.SuggestAssigneesAsync(ticketContent);

            return Json(new
            {
                Analysis = analysis,
                Recommendations = recommendations,
                Assignees = assignees
            });
        }
    }
} 