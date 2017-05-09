using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiceManager.Controllers
{
    public class RegisterController : Controller
    {
        public ActionResult Register()
        {
            ViewBag.Title = "Register user";

            return View();
        }
    }
}
