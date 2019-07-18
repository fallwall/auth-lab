const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const main = async () => {
  const firstUser = {
    name: 'roe',
    occupation: 'free loader',
  };
  const resp = await axios.post(`${BASE_URL}/users`, firstUser);
  const { token } = resp.data;
  console.log(token);

  try {
    const secretResp = await axios.get(`${BASE_URL}/answer`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(secretResp.data);
  } catch (e) {
    console.log(e.message);
  }

  process.exit();
};

main();