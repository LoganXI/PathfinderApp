using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PathfinderApp.Data;
using PathfinderApp.Server.Models;

namespace PathfinderApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaggiController : ControllerBase
    {
        private readonly PathfinderContext _context;

        public PersonaggiController(PathfinderContext context)
        {
            _context = context;
        }

        // GET: api/Personaggi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personaggio>>> GetPersonaggi()
        {
            return await _context.Personaggi.ToListAsync();
        }

        // GET: api/Personaggi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personaggio>> GetPersonaggio(int id)
        {
            var personaggio = await _context.Personaggi.FindAsync(id);

            if (personaggio == null)
            {
                return NotFound();
            }

            return personaggio;
        }

        // PUT: api/Personaggi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonaggio(int id, Personaggio personaggio)
        {
            if (id != personaggio.PersonaggioId)
            {
                return BadRequest();
            }

            _context.Entry(personaggio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaggioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Personaggi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Personaggio>> PostPersonaggio(Personaggio personaggio)
        {
            _context.Personaggi.Add(personaggio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonaggio", new { id = personaggio.PersonaggioId }, personaggio);
        }

        // DELETE: api/Personaggi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonaggio(int id)
        {
            var personaggio = await _context.Personaggi.FindAsync(id);
            if (personaggio == null)
            {
                return NotFound();
            }

            _context.Personaggi.Remove(personaggio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonaggioExists(int id)
        {
            return _context.Personaggi.Any(e => e.PersonaggioId == id);
        }
    }
}
