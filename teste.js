const dados = [{	id: "63fc55e2-22ce-4fda-8209-bd4f3271202a",
	title: "tarefa 1 intem",
	description: "Uma tarefa nova para teste",
	completed_at: null,
	},
    {id: "63fc55e2-22ce-4fda-8209-bd4f3271202b",
	title: "tarefa 1 intem",
	description: "Uma tarefa nova para teste",
	completed_at: null,
	}
]

const id = "63fc55e2-22ce-4fda-8209-bd4f3271202b";

const index = dados.findIndex(row=> row.id===id);

console.log(index);

const updatedTask = {...dados[index],completed_at:"2024-09-10T09:57:10.120Z"};

console.log(updatedTask);

dados.splice(index,1,updatedTask);

console.log(dados);
