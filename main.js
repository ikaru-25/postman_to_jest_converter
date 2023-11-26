const fs = require("fs");
const readlineSync = require("readline-sync");

function generateTestScript(request) {
  const testName = request.name;
  const url = request.request.url.raw;

  return `
test('${testName}のステータスコードは200であること', async () => {
    const response = await axios.get('${url}');
    expect(response.status).toBe(200);
});
  `;
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
const jestFileName = "jest-script.js";

// Jestスクリプトとテスト名の生成
const jestScript = generateJestScript(postmanCollection);
const testNames = generateTestNames(postmanCollection);

// Jestスクリプトをファイルに書き込み
fs.writeFileSync(jestFileName, jestScript, "utf8");
