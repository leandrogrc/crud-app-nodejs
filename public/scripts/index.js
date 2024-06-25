window.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('form')

    document.getElementById('root').classList.add('bg-dark')
    document.getElementById('root').classList.add('text-white')
    
    document.getElementById('dark-white').addEventListener('change', (event)=>{
        if(event.target.checked) document.getElementById('root').classList.add('bg-dark')
        if(event.target.checked) document.getElementById('root').classList.add('text-white')
        if(!event.target.checked) document.getElementById('root').classList.remove('bg-dark')
        if(!event.target.checked) document.getElementById('root').classList.remove('text-white')
    })

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        let nome = document.getElementById('nome').value
        let sobrenome = document.getElementById('sobrenome').value
        let idade = document.getElementById('idade').value
        let genero = document.getElementById('genero').value

        if(!nome || !sobrenome || !idade || genero == '>> Selecione'){
            Toastify({
                text: "Preencha todos os campos!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: '#E16262',
                }
            }).showToast();
            return
        }

        fetch('http://localhost:9090/api/', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({
                nome: nome,
                sobrenome: sobrenome,
                idade: idade,
                genero: genero
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then().catch(err=>console.error(err))


        nome = document.getElementById('nome').value = ''
        sobrenome = document.getElementById('sobrenome').value = ''
        idade = document.getElementById('idade').value = ''
        genero = document.getElementById('genero').value = ''

        Toastify({
            text: "Cadastrado!",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: '#157347',
            }
        }).showToast();
    })


})