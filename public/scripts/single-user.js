document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    document.getElementById('root').classList.add('bg-dark');
    document.getElementById('root').classList.add('text-white');

    let urlParams = new URLSearchParams(window.location.search.substring(1));
    const id = urlParams.get('id');

    fetch(`http://localhost:9090/api/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            console.log('User data:', user); // Log user data to check format

            // Update HTML with user data
            displayContent(user);

            document.getElementById('dark-white').addEventListener('change', (event) => {
                const root = document.getElementById('root');
                if (event.target.checked) {
                    root.classList.add('bg-dark');
                    root.classList.add('text-white');
                } else {
                    root.classList.remove('bg-dark');
                    root.classList.remove('text-white');
                }
            });

            // Event listener for form submission
            const form = document.getElementById('form');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (window.confirm("Confirmar atualização?")) {
                    // Gather updated data from form inputs
                    const nome = document.getElementById('nome').value;
                    const sobrenome = document.getElementById('sobrenome').value;
                    const idade = document.getElementById('idade').value;
                    const bodyContent = JSON.stringify({ nome, sobrenome, idade });

                    // Call function to update user data
                    atualizar(bodyContent, user.id);
                }
            });

            const deleteBtn = document.getElementById('btn-delete');
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                if (window.confirm("Deletar usuário?")) {
                    deletarUsuario(user.id);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing user data:', error);
            // Handle error - show message or redirect to an error page
            alert('Error fetching user data. Please try again later.');
        });

    // Function to update user data via API PATCH request
    const atualizar = (bodyContent, id) => {
        fetch(`http://localhost:9090/api/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log('Update successful:', data);
            //alert('Atualizado.');
            Toastify({
                text: "Atualizado!",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: '#157347',
                }
            }).showToast();
            setTimeout(()=>{
                window.location.reload();
            }, 1000)
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('Error updating user data. Please try again later.');
        });
    
        
    };

    const displayContent = (user) => {
        container.innerHTML = `
            <p class="text-center mt-3">Usuário ${user.nome} ${user.sobrenome} | ID: ${user.id}</p>
                
            <div class="mx-4 form-check form-switch">
                <input type="checkbox" class="form-check-input" id="dark-white" checked>
                <label>Modo escuro</label>
            </div>
            <form id="form" class="form-group d-flex flex-column px-4">
                <label>ID:</label>
                <input type="text" value="${user.id}" disabled>
                <label>Nome:</label>
                <input id="nome" type="text" name="nome" value="${user.nome}">
                <label>Sobrenome</label>
                <input id="sobrenome" type="text" name="sobrenome" value="${user.sobrenome}">
                <label>Idade</label>
                <input id="idade" type="number" name="idade" value="${user.idade}">
                <label>Gênero</label>
                <select id="genero" disabled>
                    <option>${user.genero}</option>
                </select>
                <button id="btn" type="submit" class="btn btn-primary mt-3">
                    <i class="fa-solid fa-pen-nib"></i> Atualizar
                </button>
                <button id="btn-delete" type="button" class="btn btn-danger mt-3">
                    <i class="fa-solid fa-trash"></i> Deletar
                </button>
                <a class="btn btn-warning mt-3" href="./all-users.html">
                    <i class="fa-solid fa-arrow-left"></i> Voltar
                </a>
            </form>
        `;
    };

    const deletarUsuario = (id) => {
        
        fetch(`http://localhost:9090/api/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Toastify({
                text: "Deletado!",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: '#E16262',
                }
            }).showToast();
            setTimeout(()=>{
                window.location.replace('./all-users.html');
            }, 1000)
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            alert('Error deleting user. Please try again later.');
        });
        
    };
});