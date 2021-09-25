using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RosAtom.Models
{
    public class EmployeeParameters
    {
        public int Id { get; set; }

        public int? Month { get; set; }

        public string Position { get; set; }

        public string DateOfBirth { get; set; }

        public string Sex { get; set; }

        public int? MaritalStatus { get; set; }

        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public string NameOfAbsence { get; set; }

        public string CalendarDaysOfAbsence { get; set; }

        public string Rate { get; set; }

        public string City { get; set; }

        public int? CountOfChildren { get; set; }

        public bool? HasMentor { get; set; }

        public bool? IsYoung { get; set; }

        public bool? IsWorking { get; set; }
    }
}
