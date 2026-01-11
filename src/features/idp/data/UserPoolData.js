// src/data/UserPoolData.js
export const userPoolData = async () => {
    const response = await fetch('http://localhost:8080/api/v1/users');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.users; 
};