export function getHeaders() {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', 'no-cors');
    const token = localStorage.getItem('accessToken');
    headers.set('Authorization', `Bearer ${token}`);

    return headers;
}
