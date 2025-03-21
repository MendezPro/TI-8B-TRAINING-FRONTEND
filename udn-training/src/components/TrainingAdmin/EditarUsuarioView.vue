<template>
    <div>
        <h1>Editar Usuario</h1>
        <form @submit.prevent="updateUser">
            <div>
                <label for="nombre_usuario">Nombre de Usuario</label>
                <input v-model="user.Nombre_Usuario" id="nombre_usuario" type="text" required />
            </div>
            <div>
                <label for="correo_electronico">Correo Electrónico</label>
                <input v-model="user.Correo_Electronico" id="correo_electronico" type="email" required />
            </div>
            <div>
                <label for="numero_telefonico_movil">Número Telefónico</label>
                <input v-model="user.Numero_Telefonico_Movil" id="numero_telefonico_movil" type="tel" required />
            </div>
            <div>
                <label for="estatus">Estatus</label>
                <select v-model="user.Estatus" id="estatus">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Bloqueado">Bloqueado</option>
                    <option value="Suspendido">Suspendido</option>
                </select>
            </div>
            <div>
                <label for="rol">Rol</label>
                <select v-model="user.Rol" id="rol">
                    <option value="Usuario">Usuario</option>
                    <option value="Administrador">Administrador</option>
                </select>
            </div>
            <button type="submit">Actualizar Usuario</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    name: 'EditarUsuarioView',
    data() {
        return {
            user: {
                Nombre_Usuario: '',
                Correo_Electronico: '',
                Numero_Telefonico_Movil: '',
                Estatus: 'Activo',
                Rol: 'Usuario',
            },
        };
    },
    mounted() {
        const userId = this.$route.params.id;
        const token = localStorage.getItem('access_token'); // Guarda el token en localStorage al hacer login

        axios.get(`http://localhost:8000/api/usuarios/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Añadir el token en el header
            }
        })
            .then(response => {
                const data = response.data;
                this.user = {
                    Nombre_Usuario: data.nombre_usuario,
                    Correo_Electronico: data.correo_electronico,
                    Numero_Telefonico_Movil: data.numero_telefonico_movil,
                    Estatus: data.estatus, // Usar directamente el valor del backend (que es uno de los valores 'Activo', 'Inactivo', 'Bloqueado', 'Suspendido')
                    Rol: data.rol === 'Administrador' ? 'Administrador' : 'Usuario', // Asignar correctamente el rol
                };
            })
            .catch(error => {
                console.error("Error al cargar el usuario:", error);
                Swal.fire('Error', 'No se pudo cargar el usuario.', 'error');
            });
    },
    methods: {
        updateUser() {
            const userId = this.$route.params.id;
            const token = localStorage.getItem('access_token'); // Añadir el token para la actualización también

            axios.put(`http://localhost:8000/api/usuarios/${userId}`, {
                nombre_usuario: this.user.Nombre_Usuario,
                correo_electronico: this.user.Correo_Electronico,
                numero_telefonico_movil: this.user.Numero_Telefonico_Movil,
                estatus: this.user.Estatus, // No hacer la conversión, enviar el valor tal cual como 'Activo', 'Inactivo', etc.
                fecha_actualizacion: new Date().toISOString(),
                rol: this.user.Rol
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario actualizado',
                        text: 'El usuario se actualizó correctamente',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    this.$router.push('/usuarios');
                })
                .catch(error => {
                    console.error("Error al actualizar el usuario:", error.response?.data || error);
                     // ❌ Alerta de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo actualizar el usuario'
                    });
                });
        }
    }
};
</script>

<style scoped>
/* Estilos para el formulario de edición */
form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #34495e;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #34495e;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
}

button:hover {
    background-color: #2c3e50;
}
</style>
