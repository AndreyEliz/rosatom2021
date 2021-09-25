using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace RosAtom.JsonDb.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string Position { get; set; }

        public string DateOfBirth { get; set; }

        public string Sex { get; set; }

        public int MaritalStatus { get; set; }

        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public string NameOfAbsence { get; set; }

        public string CalendarDaysOfAbsence { get; set; }

        public string Rate { get; set; }

        public decimal RateDecimal 
        { 
            get 
            {
                if (!string.IsNullOrEmpty(Rate))
                {
                    return decimal.Parse(Rate.Trim().Replace(",", string.Empty).Replace(".", ","), NumberStyles.Currency);
                }
                return 0;
            } 
        }

        public string City { get; set; }

        public int CountOfChildren { get; set; }

        public bool HasMentor { get; set; }

        public int Month { get; set; }

        public bool IsWorking { get { return string.IsNullOrEmpty(EndDate); } }

        public bool IsYoung 
        {
            get
            {
                var culture = new CultureInfo("ru-Ru");
                var bDate = DateOfBirth.Split('/');
                var digital4 = culture.Calendar.ToFourDigitYear(Convert.ToInt32(bDate[2]));
                bDate[2] = digital4.ToString();
                if(bDate[0].Length == 1)
                {
                    bDate[0] = $"0{bDate[0]}";
                }
                if (bDate[1].Length == 1)
                {
                    bDate[1] = $"0{bDate[1]}";
                }
                var bDateString = string.Join("/", bDate);

                bDate = StartDate.Split('/');
                digital4 = culture.Calendar.ToFourDigitYear(Convert.ToInt32(bDate[2]));
                bDate[2] = digital4.ToString();
                if (bDate[0].Length == 1)
                {
                    bDate[0] = $"0{bDate[0]}";
                }
                if (bDate[1].Length == 1)
                {
                    bDate[1] = $"0{bDate[1]}";
                }
                var startDateString = string.Join("/", bDate);


                var date = DateTime.ParseExact(bDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                var startDate  = DateTime.ParseExact(startDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                return date > new DateTime(1985, 01, 01) && DateTime.Now.Year - startDate.Year <= 3;
            }
        }
    }
}
