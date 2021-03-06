using System;

namespace WebSqlGit.Model
{
    public class Script
    {
        public int Id { get; set; }
        public int ScriptId { get; set; }
        public int CategoryId { get; set; }
        public int Version { get; set; }
        public string Name { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public int AuthorId { get; set; }
        public string[] Tags { get; set; }
        public DateTime CreationDataTime { get; set; } 
        public DateTime UpdateDataTime { get; set; } 
        public bool IsLastVersion { get; set; }
        public bool IsAuthor { get; set; }
    }
}
