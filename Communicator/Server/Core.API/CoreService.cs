using Core.Domain.Entities;
using Core.Domain.Interfaces;
using Core.Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Application
{
    public class CoreService : ICoreService
    {
        private readonly CommunicatorDbContext dbContext;
        private readonly ILogger<CoreService> logger;

        public CoreService(CommunicatorDbContext dbContext, ILogger<CoreService> logger)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        public List<Communication> GetCommunications()
        {
            return dbContext.Communications.ToList();
        }

        public Communication GetCommunicationById(int id)
        {
            return dbContext.Communications.Where(c=>c.Id == id).SingleOrDefault();
        }

        public bool CreateCommunication(Communication communication)
        {
            communication.DateSent = DateTime.Now;
            if (communication != null)
            {
                dbContext.Add(communication);
                dbContext.SaveChanges();
            }
            return true;
        }

        public bool UpdateCommunication(Communication communication)
        {
            var data =  dbContext.Communications.
                Where(c => c.Id == communication.Id).SingleOrDefault();
            if (data == null)
            {
                return false;
            }
            data.From = communication.From;
            data.To = communication.To;
            data.Subject = communication.Subject;
            data.Message = communication.Message;
            dbContext.SaveChanges();
            return true;
        }

        public bool DeleteCommunication(int id)
        {
            var data = dbContext.Communications.Where(c => c.Id == id).SingleOrDefault();
            if (data == null)
            {
                return false;
            }
            dbContext.Remove(data);
            dbContext.SaveChanges();
            return true;
        }
    }
}