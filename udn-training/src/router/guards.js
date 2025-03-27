export function authGuard(to, from, next) {
    const usuarioRol = localStorage.getItem('rol')?.trim().toLowerCase();
  
    if (to.meta.requiresAdmin && (!usuarioRol || usuarioRol !== 'administrador')) {
      console.warn(`Acceso denegado: Rol detectado: "${usuarioRol}"`);
      next('/error');
    } else {
      next();
    }
  }
  