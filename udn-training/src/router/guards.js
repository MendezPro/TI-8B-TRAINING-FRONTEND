export function authGuard(to, from, next) {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Verifica si hay un token en localStorage

  if (to.path === '/dashboard' && !isAuthenticated) {
    // Si intenta acceder al dashboard sin estar autenticado, redirige al registro
    console.warn('Acceso denegado: Usuario no autenticado');
    next('/register');
  } else {
    next(); // Permite el acceso a otras rutas
  }
}