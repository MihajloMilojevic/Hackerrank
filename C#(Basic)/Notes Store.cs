using System;
using System.Collections.Generic;
using System.IO;

namespace Solution
{

    

    public class NotesStore
    {
        List<String> active, completed, others;
        public NotesStore() {
            active = new List<String>();
            completed = new List<String>();
            others = new List<String>();
        }
        public void AddNote(String state, String name) {
            if(name == String.Empty)
                throw new Exception("Name cannot be empty");                
            switch(state)
            {
                case "completed":
                    completed.Add(name);
                    break;
                case "active":
                    active.Add(name);
                    break;
                case "others":
                    others.Add(name);
                    break;
                default:
                    throw new Exception("Invalid state " + state);
                    break;
            }
        }
        public List<String> GetNotes(String state) {
            switch(state)
            {
                case "completed":
                    return completed;
                    break;
                case "active":
                    return active;
                    break;
                case "others":
                    return others;
                    break;
                default:
                    throw new Exception("Invalid state " + state);
                    break;
            }
        }
    } 

    public class Solution
    {
        public static void Main() 
        {
            var notesStoreObj = new NotesStore();
            var n = int.Parse(Console.ReadLine());
            for (var i = 0; i < n; i++) {
                var operationInfo = Console.ReadLine().Split(' ');
                try
                {
                    if (operationInfo[0] == "AddNote")
                        notesStoreObj.AddNote(operationInfo[1], operationInfo.Length == 2 ? "" : operationInfo[2]);
                    else if (operationInfo[0] == "GetNotes")
                    {
                        var result = notesStoreObj.GetNotes(operationInfo[1]);
                        if (result.Count == 0)
                            Console.WriteLine("No Notes");
                        else
                            Console.WriteLine(string.Join(",", result));
                    } else {
                        Console.WriteLine("Invalid Parameter");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error: " + e.Message);
                }
            }
        }
    }
}