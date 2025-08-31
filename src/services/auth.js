export async function refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
        // Retornar null em vez de lançar
        return null;
    }

    try {
        const res = await fetch('/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: refresh })
        });

        if (!res.ok) return null;
        const data = await res.json();
        localStorage.setItem('access_token', data.accessToken);
        return data.accessToken;
    } catch (err) {
        console.error('refreshToken error:', err);
        return null;
    }
}

export async function getValidToken() {
    const access = localStorage.getItem('access_token');
    if (!access) {
        return await refreshToken();
    }
    // opcional: verificar exp do JWT aqui e chamar refreshToken se expirado
    return access;
}