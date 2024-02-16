using System.ComponentModel.DataAnnotations;

namespace API.DTOs

{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required] public string KnownAs { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public DateOnly? DateOfBirth { get; set; } // optional to make required work, then we can see if the dob is a correct date rather than a default value
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }

    }
}

