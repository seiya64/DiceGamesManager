using System.Collections.Generic;

namespace DiceManager.Models
{
    public class TableStateItem
    {
        public Card Card { get; set; }
        public List<Dice> Dices { get; set; }
    }
}