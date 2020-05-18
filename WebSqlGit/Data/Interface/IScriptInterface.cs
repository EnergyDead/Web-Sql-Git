﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSqlGit.Model;

namespace WebSqlGit.Data.Interface
{
    public interface IScriptInterface
    {
        List<Script> GetScriptsForCategory(int CategoryId);
        List<Script> GetScriptsOne(int id);
        List<Script> GetAll();
        Script GetScript(int id);
        void CreateScript(Script script);
        void DeleteScript(int id);
        void DeleteVersionScript(int id);
        void UpdateScript(Script script);
        Script GetScriptsHistory(int id);
    }
}
