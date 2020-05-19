﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebSqlGit.Data.Interface;
using WebSqlGit.Data.Model;

namespace WebSqlGit.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IUserInterface _userInterface;
        public AccountController(IUserInterface userInterface)
        {
            _userInterface = userInterface;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetUser()
        {
            User user = new User();
            user.Name = User.Identity.Name;
            return Ok(user);
        }

        [HttpPost("regiser")]
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
                    new Claim(ClaimsIdentity.DefaultNameClaimType, AuthorizeUser.Name)
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