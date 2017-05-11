using DiceMaster.Models;
using System;
using System.Collections.Generic;

namespace DiceManager.Models
{
    public class Game
    {
        public List<Player> Players { get; set; }
        public TableState TableState { get; set; }
    }
}
