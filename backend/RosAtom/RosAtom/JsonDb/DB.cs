using RosAtom.JsonDb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RosAtom.Models;

namespace RosAtom.JsonDb
{
    public class DB
    {
        private static DB _instance;
        private Dictionary<int, List<Employee>> _employees;
        private Dictionary<int, List<string>> _positions;
        private Dictionary<string, int> _pos;
        private Dictionary<int, string> _maritalStatuses = new Dictionary<int, string>() ;
        public static DB Instance 
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new DB();
                }

                return _instance;
            }
        }
        private DB()
        {
            InitDb();
            InitMaritalStatuses();
            InitPos();
            SetPositions();
            SetMentor();
        }

        private void SetPositions()
        {
            foreach(var key in _employees)
            {
                foreach(var v in key.Value)
                {
                    _pos.TryGetValue(v.Position.Trim().ToLower(), out int posKey);
                    v.Position = posKey.ToString();
                }
            }
        }

        private void InitMaritalStatuses()
        {
            _maritalStatuses.Add(1, "Разв.");
            _maritalStatuses.Add(2, "Жен/ЗМ");
            _maritalStatuses.Add(3, "Вдов.");
            _maritalStatuses.Add(4, "Хол/НЗ");
            _maritalStatuses.Add(5, "ГрБрак");
        }

        public Dictionary<int, string> GetMaritalStatuses()
        {
            return _maritalStatuses;
        }

        public List<Employee> GetByFilterArr(EmployeeParameters employeeParameters)
        {
            return SetFilters(GetAllArr(), employeeParameters);
        }

        public Dictionary<int, List<Employee>> GetByFilter(EmployeeParameters employeeParameters)
        {
            var result = new Dictionary<int, List<Employee>>();
            if (employeeParameters.Month.HasValue && _employees.ContainsKey(employeeParameters.Month.Value))
            {
                var preResult = SetFilters(GetAll().First(x => x.Key == employeeParameters.Month).Value, employeeParameters);
                if (preResult.Count > 0)
                {
                    result.Add(employeeParameters.Month.Value, preResult);
                }
            }
            else
            {
                foreach(var key in _employees)
                {
                    var preResult = SetFilters(key.Value, employeeParameters);

                    if (preResult.Count > 0)
                    {
                        result.Add(key.Key, preResult);
                    }
                    
                }
            }
            return result;
        }

        public List<Employee> SetFilters(List<Employee> source, EmployeeParameters employeeParameters)
        {
            return source
                .WhereIf(employeeParameters.HasMentor.HasValue, x => x.HasMentor == employeeParameters.HasMentor)
                .WhereIf(employeeParameters.MaritalStatus.HasValue, x => x.MaritalStatus == employeeParameters.MaritalStatus)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.NameOfAbsence), x => x.NameOfAbsence == employeeParameters.NameOfAbsence)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.Position), x => x.Position == employeeParameters.Position)
                .WhereIf(employeeParameters.RateFrom.HasValue, x => x.RateDecimal >= employeeParameters.RateFrom)
                .WhereIf(employeeParameters.RateTo.HasValue, x => x.RateDecimal <= employeeParameters.RateTo)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.Sex), x => x.Sex == employeeParameters.Sex)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.StartDate), x => x.StartDate == employeeParameters.StartDate)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.EndDate), x => x.EndDate == employeeParameters.EndDate)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.CalendarDaysOfAbsence), x => x.CalendarDaysOfAbsence == employeeParameters.CalendarDaysOfAbsence)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.City), x => x.City == employeeParameters.City)
                .WhereIf(employeeParameters.CountOfChildren.HasValue, x => x.CountOfChildren == employeeParameters.CountOfChildren)
                .WhereIf(employeeParameters.IsWorking.HasValue, x => x.IsWorking == employeeParameters.IsWorking)
                .WhereIf(!string.IsNullOrEmpty(employeeParameters.DateOfBirth), x => x.DateOfBirth == employeeParameters.DateOfBirth)
                .WhereIf(employeeParameters.IsYoung.HasValue, x => x.IsYoung == employeeParameters.IsYoung)
                .ToList();
        }

        public List<string>  GetPositions()
        {
            return GetAll().SelectMany(x => x.Value).Select(x => x.Position).Distinct().ToList();
        }

        public Dictionary<int, List<string>> GetPositions2()
        {
            return _positions;
        }

        public List<Employee> GetAllArr()
        {
            return GetAll().SelectMany(x => x.Value).ToList();
        }

        private void InitDb()
        {
            var currentDirectory = Environment.CurrentDirectory;
            var path = Path.Combine(new string[] { currentDirectory, "JsonDb", "json", "data.json" });
            string json = File.ReadAllText(path);
            var data = JsonConvert.DeserializeObject<Dictionary<int, List<Employee>>>(json);
            foreach(var key in data)
            {
                foreach(var v in key.Value)
                {
                    v.Month = key.Key;
                    if (v.Rate != null)
                        v.Rate = v.Rate.Trim();
                }
            }
            _employees = data;
        }

        private void SetMentor()
        {
            var currentDirectory = Environment.CurrentDirectory;
            var path = Path.Combine(new string[] { currentDirectory, "JsonDb", "json", "mentors.json" });
            string json = File.ReadAllText(path);
            var data = JsonConvert.DeserializeObject<List<int>>(json);
            var employees = _employees.SelectMany(x => x.Value).Where(x => data.Contains(x.Id));
            foreach(var e in employees)
            {
                e.HasMentor = true;
            }
        }

        private void InitPos()
        {
            var currentDirectory = Environment.CurrentDirectory;
            var path = Path.Combine(new string[] { currentDirectory, "JsonDb", "json", "positions.json" });
            string json = File.ReadAllText(path);
            var data = JsonConvert.DeserializeObject<Dictionary<string, int>>(json);
            _pos = new Dictionary<string, int>();
            foreach(var key in data)
            {
                var newKey = key.Key.Trim().ToLower();
                if(!_pos.ContainsKey(newKey))
                {
                    _pos.Add(newKey, key.Value);
                }
            }

            _positions = data.GroupBy(x => x.Value).ToDictionary(x => x.Key, z => z.Select(x => x.Key.ToLower().Trim()).Distinct().ToList());
        }


        public Dictionary<int, List<Employee>> GetAll()
        {
            return _employees;
        }

        public List<Employee> GetByMonth(int month)
        {
            if(_employees.ContainsKey(month))
            {
                return _employees[month];
            }

            return new List<Employee>();
        }
    }
}
