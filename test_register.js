
const axios = require('axios');

async function testRegister() {
  try {
    const res = await axios.post('http://localhost:3001/auth/register', {
      email: 'test' + Math.random() + '@example.com',
      password: 'password123'
    });
    console.log('Registration success:', res.data);
  } catch (err) {
    console.error('Registration failed:', err.response ? err.response.data : err.message);
  }
}

testRegister();
