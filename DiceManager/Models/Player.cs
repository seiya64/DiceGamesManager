using DiceManager.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DiceMaster.Models
{
    public class Player
    {
        public ApplicationUser user;
        public int score;
        public PlayerState state;
    }

    public class BloggingContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
    }
}