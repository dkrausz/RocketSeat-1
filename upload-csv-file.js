import fs from 'node:fs/promises'
import {parse } from 'csv-parse'
import { Readable } from 'node:stream';

const csvPath = new URL('importFile.csv',import.meta.url);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 
});


class readCsvFile extends Readable{
  _read(){
fs.readFile(csvPath,'utf8').then(data=>{
 
    this.push(data)
    this.push(null)
  
});
  };
} ;

const fileReaded=new readCsvFile().pipe(csvParse)
for await(const data of fileReaded){
  const [title,description] = data;
 
  
  await fetch('http://localhost:3333/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    })
  })
  
}

