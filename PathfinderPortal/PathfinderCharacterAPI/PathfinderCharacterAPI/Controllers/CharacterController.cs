﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PathfinderCharacterAPI.Data;
using PathfinderCharacterAPI.Models;
using System.Security.Claims;

namespace PathfinderCharacterAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly CharacterContext _context;

        public CharacterController(CharacterContext context)
        {
            _context = context;
        }

        // Get all characters for the logged-in user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharacters()
        {
            // Extract the UserId from the JWT token
            

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine($"Extracted User ID: {userIdClaim}");
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User ID not found.");
            }

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID.");
            }

            // Return characters for the user
            var characters = await _context.Characters.Where(c => c.UserId == userId).ToListAsync();
            return Ok(characters);


            // Return only the characters belonging to the logged-in user
            
        }

        // Get a specific character by id, ensuring the character belongs to the logged-in user
        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            // Extract the UserId from the JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = int.Parse(userIdClaim);

            // Find the character
            var character = await _context.Characters.FindAsync(id);

            if (character == null)
            {
                return NotFound();
            }

            // Ensure the character belongs to the logged-in user
            if (character.UserId != userId)
            {
                return Forbid(); // Return 403 Forbidden if the character does not belong to the user
            }

            return character;
        }


        // Create a new character and associate it with the logged-in user
        [HttpPost]
        public async Task<ActionResult<Character>> CreateCharacter(Character character)
        {

            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Extract the UserId from the JWT token
            var userId = user.Id;

            // Set the UserId on the character
            character.UserId = userId;

            // Add and save the character
            _context.Characters.Add(character);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCharacter), new { id = character.Id }, character);
        }

        // Update an existing character, ensuring it belongs to the logged-in user
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharacter(int id, Character character)
        {
            // Extract the UserId from the JWT token
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            // Ensure the character belongs to the logged-in user
            if (character.UserId != userId)
            {
                return Forbid(); // Return 403 Forbidden if the character does not belong to the user
            }

            if (id != character.Id)
            {
                return BadRequest();
            }

            _context.Entry(character).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Characters.Any(e => e.Id == id))
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


        // Delete a character, ensuring it belongs to the logged-in user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            // Extract the UserId from the JWT token
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var character = await _context.Characters.FindAsync(id);

            if (character == null)
            {
                return NotFound();
            }

            // Ensure the character belongs to the logged-in user
            if (character.UserId != userId)
            {
                return Forbid(); // Return 403 Forbidden if the character does not belong to the user
            }

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
