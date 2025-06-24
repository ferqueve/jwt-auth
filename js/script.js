// Simulación de datos de usuario para el demo
const DEMO_USERS = {
    'admin@jovenes.com': {
        password: '123456',
        id: 1,
        name: 'Juan Pérez',
        email: 'admin@jovenes.com',
        role: 'admin',
        courses: ['JavaScript Avanzado', 'React Fundamentals']
    }
};

// Función para generar un JWT token simulado
function generateJWTToken(user) {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    const payload = {
        "sub": user.id.toString(),
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "iat": Math.floor(Date.now() / 1000),
        "exp": Math.floor(Date.now() / 1000) + (60 * 60) // 1 hora
    };

    // Simulamos las partes del JWT (en un escenario real, esto se haría en el servidor)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa('signature_simulada_' + Math.random().toString(36).substr(2, 9));

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Función de login principal
async function login(email, password) {
    try {
        // Simulamos una llamada a la API de autenticación
        showNotification('Autenticando...', 'success');
        
        // En un escenario real, esto sería:
        // const response = await fetch('/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });

        // Simulación de delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verificar credenciales en nuestro "mock"
        const user = DEMO_USERS[email];
        if (!user || user.password !== password) {
            throw new Error('Credenciales inválidas');
        }

        // Generar token JWT
        const token = generateJWTToken(user);

        // Guardar token en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { success: true, token, user };

    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}

// Función para hacer peticiones autenticadas
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No hay token de autenticación');
    }

    const authOptions = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    // Simulamos diferentes endpoints
    return simulateAPICall(url, authOptions);
}

// Simulación de respuestas de API
async function simulateAPICall(url, options) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay

    const token = options.headers.Authorization?.replace('Bearer ', '');
    
    if (!token) {
        return {
            ok: false,
            status: 401,
            json: () => Promise.resolve({ error: 'Token no proporcionado' })
        };
    }

    try {
        // Decodificar y verificar token (simplificado)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        if (payload.exp * 1000 < Date.now()) {
            return {
                ok: false,
                status: 401,
                json: () => Promise.resolve({ error: 'Token expirado' })
            };
        }

        // Simular diferentes endpoints
        if (url === '/profile') {
            return {
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    success: true,
                    data: {
                        id: payload.sub,
                        name: payload.name,
                        email: payload.email,
                        role: payload.role,
                        lastLogin: new Date().toISOString(),
                        courses: ['JavaScript Avanzado', 'React Fundamentals'],
                        progress: '85%'
                    }
                })
            };
        } else if (url === '/admin-data') {
            if (payload.role !== 'admin') {
                return {
                    ok: false,
                    status: 403,
                    json: () => Promise.resolve({ error: 'Acceso denegado: Se requieren permisos de administrador' })
                };
            }
            return {
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    success: true,
                    data: {
                        totalUsers: 1250,
                        activeCourses: 15,
                        revenue: '$45,000'
                    }
                })
            };
        }

    } catch (error) {
        return {
            ok: false,
            status: 401,
            json: () => Promise.resolve({ error: 'Token inválido' })
        };
    }
}

// Event Listeners
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Iniciando sesión...';
        
        const result = await login(email, password);
        
        if (result.success) {
            showNotification('¡Login exitoso!', 'success');
            updateAuthStatus(true);
            displayToken(result.token);
        }
        
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Iniciar Sesión';
    }
});

// Función para actualizar el estado de autenticación
function updateAuthStatus(isLoggedIn) {
    const authStatus = document.getElementById('authStatus');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginSection = document.getElementById('loginSection');
    const tokenSection = document.getElementById('tokenSection');
    const testSection = document.getElementById('testSection');

    if (isLoggedIn) {
        authStatus.textContent = '✅ Autenticado';
        authStatus.className = 'status-indicator logged-in';
        logoutBtn.classList.remove('hidden');
        loginSection.classList.add('hidden');
        tokenSection.classList.remove('hidden');
        testSection.classList.remove('hidden');
    } else {
        authStatus.textContent = '🔒 No autenticado';
        authStatus.className = 'status-indicator logged-out';
        logoutBtn.classList.add('hidden');
        loginSection.classList.remove('hidden');
        tokenSection.classList.add('hidden');
        testSection.classList.add('hidden');
    }
}

// Función para mostrar el token JWT
function displayToken(token) {
    const tokenDisplay = document.getElementById('tokenDisplay');
    const headerDecoded = document.getElementById('headerDecoded');
    const payloadDecoded = document.getElementById('payloadDecoded');

    // Mostrar token completo
    tokenDisplay.innerHTML = `
        <strong>Token JWT:</strong><br>
        <span style="color: #ed8936;">${token.split('.')[0]}</span>.<span style="color: #48bb78;">${token.split('.')[1]}</span>.<span style="color: #667eea;">${token.split('.')[2]}</span>
    `;

    // Decodificar partes
    try {
        const header = JSON.parse(atob(token.split('.')[0]));
        const payload = JSON.parse(atob(token.split('.')[1]));

        headerDecoded.innerHTML = `<pre>${JSON.stringify(header, null, 2)}</pre>`;
        payloadDecoded.innerHTML = `<pre>${JSON.stringify(payload, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error decodificando token:', error);
    }
}

// Funciones para las pruebas de API
async function fetchUserProfile() {
    const responseDiv = document.getElementById('profileResponse');
    responseDiv.textContent = 'Cargando...';

    try {
        const response = await authenticatedFetch('/profile');
        const data = await response.json();
        
        responseDiv.innerHTML = `
            <strong>Status:</strong> ${response.status}<br>
            <strong>Respuesta:</strong><br>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        
        if (response.ok) {
            showNotification('Perfil obtenido correctamente', 'success');
        }
    } catch (error) {
        responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
        showNotification(error.message, 'error');
    }
}

async function fetchAdminData() {
    const responseDiv = document.getElementById('adminResponse');
    responseDiv.textContent = 'Cargando...';

    try {
        // Simulamos una petición SIN token
        const response = await fetch('/admin-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Deliberadamente NO incluimos Authorization header
            }
        });

        // Como no tiene token, simulamos respuesta 401
        const data = { error: 'Token no proporcionado - Acceso denegado' };
        
        responseDiv.innerHTML = `
            <strong>Status:</strong> 401 Unauthorized<br>
            <strong>Respuesta:</strong><br>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        
        showNotification('Acceso denegado - Se requiere autenticación', 'error');
    } catch (error) {
        responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}

// Función de logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateAuthStatus(false);
    showNotification('Sesión cerrada', 'success');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Verificar estado de autenticación al cargar
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 > Date.now()) {
                updateAuthStatus(true);
                displayToken(token);
                showNotification('Sesión restaurada', 'success');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                showNotification('Token expirado', 'error');
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});