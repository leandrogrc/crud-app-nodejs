let users = [
    {
        nome: "Leandro",
        sobrenome: "Garcia",
        idade: 27,
        genero: "Masculino",
        id: 1
    },
    {
        nome: "Carina",
        sobrenome: "Bastos",
        idade: 28,
        genero: "Feminino",
        id: 2
    }
];

export const getUsers = (request, response) => {
    if(users.length == 0) response.send([])
    else response.json(users)
};
export const getUser = (request, response) =>{
    const { id } = request.params;
    const user_buscado = users.find((user) => user.id == id);
    if(!user_buscado) response.status(404).send(`User com ID: ${id} não encontrado`)
    else response.send(user_buscado);
};
export const newUser = (request, response) =>{
    const id = users.length + 1;
    const { nome, sobrenome, idade, genero } = request.body;
    users.push({ nome, sobrenome, idade, genero, id })
    response.json(`Usuário com ID: ${id} adicionado à DataBase`)
};
export const updateUser = (request, response) => {
    const { id } = request.params;
    const { nome, sobrenome, idade, genero } = request.body;
    const user_buscado = users.find((user)=> user.id == id);

    if(!user_buscado) response.status(404).send(`User com ID: ${id} não encontrado`)
    if(nome)user_buscado.nome = nome;
    if(sobrenome)user_buscado.sobrenome = sobrenome;
    if(idade)user_buscado.idade = idade;
    if(genero)user_buscado.genero = genero;
    
    response.json(`Usuário com ID: ${id} atualizado!`)
};
export const deleteUser = (request, response) => {
    const { id } = request.params;
    const user_buscado = users.find(user => user.id == id);
    
    if (!user_buscado)response.json(`Usuário com ID: ${id} não encontrado!`);

    else {
        users = users.filter(user => user.id != id);
        response.json(`Usuário com ID: ${id} deletado!`);
    }
};