using Core.Application;
using Core.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Tests
{
    public class CommunicationTests
    {
        private readonly ICoreService coreService;
        public CommunicationTests(ICoreService coreService)
        {
            this.coreService = coreService;
        }
        [Fact]
        public void GetCommunications_Valid_result()
        {
            //Act
            var result = coreService.GetCommunications();

            //Assert  
            Assert.Equal(result,null);
        }
        [Fact]
        public void GetCommunicationsById_Valid_Result()
        {
            //Arrange
            var id = 11;
            //Act
            var result = coreService.GetCommunicationById(id);

            //Assert  
            Assert.IsType<OkObjectResult>(result);
        }
        [Fact]
        public void GetCommunicationsById_Not_Valid_Result()
        {
            //Arrange
            var id = 0;
            //Act
            var result = coreService.GetCommunicationById(id);

            //Assert  
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
