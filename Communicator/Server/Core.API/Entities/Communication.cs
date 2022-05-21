using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Domain.Entities
{
    public partial class Communication
    {
        public DateTimeOffset? DateSent { get; set; }

        public string From { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        public string Message { get; set; }

        public string Subject { get; set; }

        public string To { get; set; }
    }
}