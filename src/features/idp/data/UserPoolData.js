// src/data/UserPoolData.js
export const userPoolData = async () => {
    const response = await fetch('http://localhost:8080/api/v1/admin/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.users; 
};