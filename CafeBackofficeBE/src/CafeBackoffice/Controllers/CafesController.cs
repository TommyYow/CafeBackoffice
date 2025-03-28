using CafeBackoffice.Application.Commands.Cafe.CreateCafe;
using CafeBackoffice.Application.Commands.Cafe.DeleteCafe;
using CafeBackoffice.Application.Commands.Cafe.UpdateCafe;
using CafeBackoffice.Application.Queries.Cafe.GetCafeById;
using CafeBackoffice.Application.Queries.Cafe.GetCafes;
using CafeBackoffice.Application.Queries.Cafe.GetCafesForEmployeeSelect;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CafeBackoffice.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CafesController : BaseController
    {
        private readonly ILogger<CafesController> _logger;
        private readonly IMediator _mediator;

        public CafesController(ILogger<CafesController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetCafes([FromQuery] GetCafesQuery query)
        {
            var res = await _mediator.Send(query);
            return ReturnResponse(res.StatusCode, res.StatusMessage, res.Data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCafeById(Guid id)
        {
            var res = await _mediator.Send(new GetCafeByIdQuery() { Id = id });
            return ReturnResponse(res.StatusCode, res.StatusMessage, res.Data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCafe([FromBody] CreateCafeCommand command)
        {
            var res = await _mediator.Send(command);
            return ReturnResponse(res.StatusCode, res.StatusMessage);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCafe(Guid id, [FromBody] UpdateCafeCommand command)
        {
            command.Id = id;
            var res = await _mediator.Send(command);
            return ReturnResponse(res.StatusCode, res.StatusMessage);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCafe(Guid id)
        {
            var res = await _mediator.Send(new DeleteCafeCommand() { Id = id });
            return ReturnResponse(res.StatusCode, res.StatusMessage);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetCafesForEmployeeSelect()
        {
            var res = await _mediator.Send(new GetCafesForEmployeeSelectQuery());
            return ReturnResponse(res.StatusCode, res.StatusMessage, res.Data);
        }
    }
}