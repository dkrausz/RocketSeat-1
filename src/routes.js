import { Database } from "./database/database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const data = database.selectOne("tasks", req.params.id);    

      if (data != null) {
        return res.writeHead(200).end(JSON.stringify(data));
      }

      return res.writeHead(404).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      return res.writeHead(200).end(JSON.stringify(database.select("tasks")));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description} = req.body;
      const data = new Date();

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at:null,
        created_at: data,
        updated_at: data,
      };

      database.insert("tasks", newTask);

      return res.writeHead(201).end();
    },
  },{
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {       
       console.log(req.body);      

        const data = database.update('tasks',req.params.id,req.body);
        if(data!=null){
            return res.writeHead(200).end(JSON.stringify(data));
        }
        return res.writeHead(404).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {       
        
        const data = database.delete('tasks',req.params.id);
        if(data!=null){
            return res.writeHead(204).end();
        }
        return res.writeHead(404).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {       
        
        const data = database.completeTask('tasks',req.params.id);
        if(data!=null){
            return res.writeHead(200).end(JSON.stringify(data));
        }
        return res.writeHead(404).end();
    },
  },
];
