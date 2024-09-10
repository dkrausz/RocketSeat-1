import fs from 'node:fs/promises';

const dbPath = new URL('../db.json',import.meta.url);
export class Database{
  #database={};

  constructor(){
    fs.readFile(dbPath,'utf8').then(data=>{
   
      
      this.#database = JSON.parse(data)
    }).catch(
      ()=>{       
        
       this.#persist(); 
      });
  };

#persist(){
 fs.writeFile(dbPath,JSON.stringify(this.#database));
}

  
  select(table){
    const data = this.#database[table] ?? []

    return data;
  };

  selectOne(table,id){
    const index = this.#database[table].findIndex(row=>row.id ===id);
    if (index>-1){
      return this.#database[table][index];
    }

    return null;
  };

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    }
    else{
      this.#database[table] = [data]
    }
    this.#persist();
  };
 
  update(table,id,data){
    const index = this.#database[table].findIndex(row=>row.id ===id);
    console.log("index",index);
    
    if (index>-1){               
      const newDate =new Date();
      const updatedTask = {...this.#database[table][index],...data,updated_at:newDate};

      console.log(updatedTask);
      
      this.#database[table].splice(index,1,updatedTask);           
      this.#persist();
      return updatedTask
    };

    return null;
  };
  

  delete(table,id){
    const index = this.#database[table].findIndex(row=>row.id ===id);
    if (index>-1){
       this.#database[table].splice(index,1);
      this.#persist();
      return
    }

    return null;
  };

  completeTask(table,id){
    const index = this.#database[table].findIndex(row=>row.id ===id);
    if (index>-1){
      const newDate =new Date();
      const updatedTask = {...this.#database[table][index],completed_at:newDate };     
      console.log(updatedTask);
      
      this.#database[table].splice(index,1,updatedTask);

      this.#persist();
      return updatedTask
    }

    return null;
  }

}