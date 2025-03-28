using CafeBackoffice.Application.Commands.Employee.CreateEmployee;
using CafeBackoffice.Application.Commands.Employee.DeleteEmployee;
using CafeBackoffice.Application.Commands.Employee.UpdateEmployee;
using CafeBackoffice.Application.Queries.Employee.GetEmployeeById;
using CafeBackoffice.Application.Queries.Employee.GetEmployees;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CafeBackoffice.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : BaseController
    {
        private readonly ILogger<EmployeesController> _logger;
        private readonly IMediator _mediator;

        public EmployeesController(ILogger<EmployeesController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery] GetEmployeesQuery query)
        {
            var res = await _mediator.Send(query);
            return ReturnResponse(res.StatusCode, res.StatusMessage, res.Data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(string id)
        {
            var res = await _mediator.Send(new GetEmployeeByIdQuery() { Id = id });
            return ReturnResponse(res.StatusCode, res.StatusMessage, res.Data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeCommand command)
        {
            var res = await _mediator.Send(command);
            return ReturnResponse(res.StatusCode, res.StatusMessage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(string id, [FromBody] UpdateEmployeeCommand command)
        {
            command.Id = id;
            var res = await _mediator.Send(command);
            return ReturnResponse(res.StatusCode, res.StatusMessage);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var res = await _mediator.Send(new DeleteEmployeeCommand() { Id = id });
            return ReturnResponse(res.StatusCode, res.StatusMessage);
        }
    }
}