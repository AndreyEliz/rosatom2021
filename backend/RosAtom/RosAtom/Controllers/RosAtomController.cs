using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RosAtom.JsonDb;
using RosAtom.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RosAtom.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
    public class RosAtomController : ControllerBase
    {
        [HttpGet("AsJson")]
        [Route("GetMaritalStatuses")]
        public ActionResult GetMaritalStatuses()
        {
            var data = DB.Instance.GetMaritalStatuses();
            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.SelectMany(x => x.Value).Count() }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
                
            return Content(result, "application/json");
        }

        [HttpGet("AsJson")]
        [Route("GetByFilter")]
        public ActionResult GetByFilter([FromQuery] EmployeeParameters employeeParameters)
        {
            var data = DB.Instance.GetByFilter(employeeParameters);

            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.SelectMany(x => x.Value).Count() }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            return Content(result, "application/json");
        }

        [HttpGet("AsJson")]
        [Route("GetByFilterArr")]
        public ActionResult GetByFilterArr([FromQuery] EmployeeParameters employeeParameters)
        {
            var data = DB.Instance.GetByFilterArr(employeeParameters);

            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.Count }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Content(result, "application/json");
        }

        [HttpGet("AsJson")]
        [Route("GetAll")]
        public ActionResult GetAll()
        {
            var data = DB.Instance.GetAll();
            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.SelectMany(x => x.Value).Count() }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Content(result, "application/json");
        }

        [HttpGet("AsJson")]
        [Route("GetAllArr")]
        public ActionResult GetAllArr()
        {
            var data = DB.Instance.GetAllArr();
            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.Count }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Content(result, "application/json");
        }

        [HttpGet("AsJson")]
        [Route("GetByMonth/{month?}")]
        public ActionResult GetByMonth(int month)
        {
            var data = DB.Instance.GetByMonth(month);
            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.Count }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Content(result, "application/json");
        }


        [HttpGet("AsJson")]
        [Route("GetPositions")]
        public ActionResult GetPositions()
        {
            var data = DB.Instance.GetPositions();
            
            var result = JsonConvert.SerializeObject(new Response { Res = data, CountOfObject = data.Count, CountOfArray = data.Count }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            return Content(result, "application/json");
        }

        [HttpGet("AsJson")]
        [Route("GetPositions2")]
        public ActionResult GetPositions2()
        {
            var data = DB.Instance.GetPositions2();
            var result = JsonConvert.SerializeObject(new Response  { Res = data, CountOfObject = data.Count, CountOfArray = data.SelectMany(x=>x.Value).Count() }, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            return Content(result, "application/json");
        }

        public class Response
        {
            public int CountOfObject { get; set; }
            public int CountOfArray { get; set; }
            public object Res { get; set; }
            
        }
    }
}
