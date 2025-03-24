using System.Threading.Tasks;

namespace TAP.Services
{
    public interface IRecommendationEngine
    {
        Task<RecommendationResult> GenerateRecommendationsAsync(string ticketContent);
        Task<string[]> SuggestAssigneesAsync(string ticketContent);
    }

    public class RecommendationResult
    {
        public string[] SuggestedActions { get; set; }
        public string[] RelatedTickets { get; set; }
        public string[] SuggestedLabels { get; set; }
        public string EstimatedResolutionTime { get; set; }
    }
} 