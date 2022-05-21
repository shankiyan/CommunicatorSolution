using Core.Domain.Entities;
using Core.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Core.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicationsController : ControllerBase
    {
        private readonly ICoreService coreService;

        public CommunicationsController(ICoreService coreService)
        {
            this.coreService = coreService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Communication>> GetCommunications()
        {
            var communications = coreService.GetCommunications();
            return Ok(communications);
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Communication>> GetCommunicationById(int id)
        {
            if (id <=0)
            {
                return BadRequest();
            }
            var communications = coreService.GetCommunicationById(id);
            return Ok(communications);
        }

        [HttpPut]
        public ActionResult UpdateCommunication([FromBody] Communication communication)
        {
            if(communication == null)
            {
                return BadRequest();
            }
            var result = coreService.UpdateCommunication(communication);
            if(!result)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public ActionResult CreateCommunication([FromBody] Communication communication)
        {
            if (communication == null)
            {
                return BadRequest();
            }
            var result = coreService.CreateCommunication(communication);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCommunication(int id)
        {
            if (id <=0)
            {
                return BadRequest();
            }
            var result = coreService.DeleteCommunication(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}