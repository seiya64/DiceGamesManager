using System.Collections.Generic;

namespace DiceManager.Models
{
    public class Dice
    {
        public string Type { get; set; }
        public List<DiceFace> Faces { get; set; }
    }
}