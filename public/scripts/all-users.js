window.addEventListener('DOMContentLoaded', ()=>{

    const filtro = document.getElementById('filtro')
    const btn = document.getElementById('get-users')
    let users = document.getElementById('users')

    document.getElementById('root').classList.add('bg-dark')
    document.getElementById('root').classList.add('text-white')

    document.getElementById('dark-white').addEventListener('change', (event)=>{
        if(event.target.checked) document.getElementById('root').classList.add('bg-dark')
        if(event.target.checked) document.getElementById('root').classList.add('text-white')
        if(!event.target.checked) document.getElementById('root').classList.remove('bg-dark')
        if(!event.target.checked) document.getElementById('root').classList.remove('text-white')
    })


    function diplaySearch(user){
        users.innerHTML += `
        <div class="m-2 py-2 bg-success text-white rounded d-flex flex-column">
        <p class='justify-content-start'>
        Nome: ${user.nome}<br>
        Sobrenome: ${user.sobrenome}<br>
        Idade: ${user.idade}<br>
        Gênero: ${user.genero}
        </p>
        <a href="./single-user.html?id=${user.id}" class="btn btn-primary rounded mx-5 px-5"><i class="fa-solid fa-circle-info"></i> Detalhes</a>
        </div>
        `
    }
    
    btn.addEventListener('click', ()=>{
        users.innerHTML = ''
        fetch('http://localhost:9090/api').then(res=>res.json()).then(data=>{
            
            if(data.length == 0) users.innerHTML = `<p>Nenhum Usuário Encontrado</p>`
            else if(data.length > 0){
                data.forEach(user => {
                    diplaySearch(user);
                })
            };
        }).catch(err=>console.error(err))
    })

    filtro.addEventListener('keyup',()=>{
        users.innerHTML = ''
        fetch('http://localhost:9090/api')
        .then(res=>res.json()).then(data=>{
            data.forEach(user => {
                if(filtro.value == '' || filtro.value == ' '){
                    users.innerHTML = ''
                }
                else if((user.nome + ' ' + user.sobrenome).toLowerCase().includes(filtro.value.toLowerCase())  && filtro.value != ''){
                    diplaySearch(user);
                    console.log(user);
                }
            })
        })
    })

})