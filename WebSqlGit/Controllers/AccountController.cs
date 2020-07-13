﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebSqlGit.Data.Interface;
using WebSqlGit.Data.Model;

namespace WebSqlGit.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IUserInterface _userInterface;
        public AccountController(IUserInterface userInterface)
        {
            _userInterface = userInterface;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            string UserLogin = User.Identity.Name;
            User user = new User { };
            if (UserLogin == null)
            {
                return Ok(user);
            }
            user.Name = _userInterface.GetUser(UserLogin);
            return Ok(user);
        }

        [HttpGet("all")]
        public List<User> GetAll()
        {
            var users = _userInterface.GetUsers();
            return users.ToList();
        }

        [HttpPost("registration")]
        public IActionResult CreateUser(User user)
        {
            _userInterface.RegistrationUser(user);
            return Ok();
        }

        [HttpPost]
        public async Task Authorize(User user)             
        {
            User AuthorizeUser = _userInterface.Authorize(user); 
            if (AuthorizeUser != null) {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, AuthorizeUser.Login)
                };
                ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                // установка аутентификационных куки
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
            }
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }

}