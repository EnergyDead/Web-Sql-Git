﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSqlGit.Data.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int[] ScriptId { get; set; }
    }
}
