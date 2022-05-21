using Core.Domain.Entities;
using System.Collections.Generic;

namespace Core.Domain.Interfaces
{
    public interface ICoreService
    {
        List<Communication> GetCommunications();
        Communication GetCommunicationById(int id);
        bool CreateCommunication(Communication communication);
        bool DeleteCommunication(int id);
        bool UpdateCommunication(Communication communication);
    }
}