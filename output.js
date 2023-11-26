
const axios = require('axios');


test('ユーザー一覧のステータスコードは200であること', async () => {
    const response = await axios.get('http://localhost:8080/measurement/list');
    const response = pm.response.json();,pm.test("ステータスコードは200であること", function () {,    pm.test("レスポンスが200", function () {,        pm.response.to.have.status(200);,        pm.expect(response).to.eql(expectedData);,    });,});
});