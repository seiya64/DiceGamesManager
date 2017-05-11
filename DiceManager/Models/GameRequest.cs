using System.Collections.Generic;
using System.Data.Entity;

namespace DiceManager.Models
{ 
    public enum GameRequestState {
        Waiting,
        Accept,
        Canceled
    }

    public class GameRequest {
        public List<ApplicationUser> Players { get; set; } // Minimum 2 - Maximum 4
        public int AutoStartWith { get; set; }
        public GameRequestState GameRequestState { get; set; } 
    }

    public class BloggingContext : DbContext
    {
        public DbSet<GameRequest> GameRequests { get; set; }
    }
}