using System.Threading.Tasks;

namespace TAP.Services
{
    public interface ITicketIngestionService
    {
        Task<bool> IngestTicketAsync(string ticketContent);
        Task<bool> ValidateTicketAsync(string ticketContent);
    }
} 