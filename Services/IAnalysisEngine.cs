using System.Threading.Tasks;

namespace TAP.Services
{
    public interface IAnalysisEngine
    {
        Task<AnalysisResult> AnalyzeTicketAsync(string ticketContent);
        Task<PriorityLevel> DeterminePriorityAsync(string ticketContent);
    }

    public class AnalysisResult
    {
        public string Category { get; set; }
        public PriorityLevel Priority { get; set; }
        public string[] Keywords { get; set; }
        public string Summary { get; set; }
    }

    public enum PriorityLevel
    {
        Low,
        Medium,
        High,
        Critical
    }
} 