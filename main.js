const fs = require("fs");
const { stringify } = require("querystring");
const readlineSync = require("readline-sync");

// JSONのInterfaceを定義する

function generateTestScript(request) {
  const testName = request.name;
  const url = request.request.url.raw;

  const test = request.event.find((e) => e.listen === "test").script.exec;
  if (test) {
    test.forEach((t) => {
      t.replace("pm.test", "test")
        .replace(
          "pm.response.to.have.status(x)",
          "expect(response.status).toBe(x)"
        )
        .replace(
          "pm.response.to.have.header()",
          "expect(response.headers).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.body()",
          "expect(response.body).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.jsonBody()",
          "expect(response.body).toHaveProperty()"
        )
        .replace("pm.expect()", "expect()")
        .replace(
          "pm.response.to.have.status(x)",
          "expect(response.status).toBe(x)"
        )
        .replace(
          "pm.response.to.have.header()",
          "expect(response.headers).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.body()",
          "expect(response.body).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.jsonBody()",
          "expect(response.body).toHaveProperty()"
        )
        .replace("pm.expect()", "expect()")
        .replace(
          "pm.response.to.have.status(x)",
          "expect(response.status).toBe(x)"
        )
        .replace(
          "pm.response.to.have.header()",
          "expect(response.headers).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.body()",
          "expect(response.body).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.jsonBody()",
          "expect(response.body).toHaveProperty()"
        )
        .replace("pm.expect()", "expect()")
        .replace(
          "pm.response.to.have.status(x)",
          "expect(response.status).toBe(x)"
        )
        .replace(
          "pm.response.to.have.header()",
          "expect(response.headers).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.body()",
          "expect(response.body).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.jsonBody()",
          "expect(response.body).toHaveProperty()"
        )
        .replace("pm.expect()", "expect()")
        .replace(
          "pm.response.to.have.status(x)",
          "expect(response.status).toBe(x)"
        )
        .replace(
          "pm.response.to.have.header()",
          "expect(response.headers).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.body()",
          "expect(response.body).toHaveProperty()"
        )
        .replace(
          "pm.response.to.have.jsonBody()",
          "expect(response.body).toHaveProperty()"
        )
        .replace("pm.expect()", "expect()")
        .replace(
          "pm.response.to.have.status(x)",
          "expect(response.status).toBe(x)"
        );
    });
  }

  // console.log(test);
  return `
test('${testName}のステータスコードは200であること', async () => {
    const response = await axios.get('${url}');
    ${test}
});
  `;

  //   return `
  // test('${testName}のステータスコードは200であること', async () => {
  //     const response = await axios.get('${url}');
  //     expect(response.status).toBe(200);
  // });
  //   `;
}

function generateJestScript(collection) {
  const testScripts = collection.item
    .map((item) => {
      return item.item.map((request) => generateTestScript(request)).join("\n");
    })
    .join("\n");

  return `
const axios = require('axios');

${testScripts}
  `;
}

function generateTestNames(collection) {
  return collection.item
    .map((item) => {
      return item.item.map((request) => `"${request.name}"`).join(", ");
    })
    .join(", ");
}

// JSONファイルの読み込み
const fileName = readlineSync.question(
  "PostmanコレクションのJSONファイル名を入力してください: "
);
const jsonData = fs.readFileSync(`${fileName}.json`, "utf8");
const postmanCollection = JSON.parse(jsonData);

// Jestスクリプトの保存ファイル名（固定）
const jestFileName = "output.js";

// Jestスクリプトとテスト名の生成
const jestScript = generateJestScript(postmanCollection);
const testNames = generateTestNames(postmanCollection);

// Jestスクリプトをファイルに書き込み
fs.writeFileSync(jestFileName, jestScript, "utf8");
