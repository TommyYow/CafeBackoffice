using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CafeBackoffice.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IActionResult ReturnResponse(int statusCode, string message = "", object? data = null)
        {
            if (statusCode == (int)HttpStatusCode.BadRequest)
                return BadRequest(new { message });

            if (statusCode == (int)HttpStatusCode.NotFound)
                return NotFound(new { message });

            if (statusCode == (int)HttpStatusCode.OK && data != null)
                return Ok(new { data, message });

            return Ok(new { message });
        }
    }
}
