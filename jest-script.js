
const axios = require('axios');


test('ユーザー一覧のステータスコードは200であること', async () => {
    const response = await axios.get('http://localhost:8080/measurement/list');
    expect(response.status).toBe(200);
});
  
  