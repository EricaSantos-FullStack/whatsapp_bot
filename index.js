const puppeteer = require("puppeteer");

// Login Function Logic
(async function main() {
  try {
    // Configuração para o puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navega pelo Whatsapp web
    await page.goto("https://web.whatsapp.com/");

    // //Searches person by title
    await page.waitForSelector("._1C2Q3");
    await delay(5000);

    //Para mudar o nome do contato que você gostaria de mandar as mensagens
    const contactName = "Roy (Senai)";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector("._2A8P4");

    //Encontra a barra de mensagem e foca na mesma
    const editor = await page.$("div[data-tab='6']");
    await editor.focus();

    //A quantidade de mensagens que você quer mandar
    const amountOfMessages = 200;

    //Loops através ciclos de envio de mensagens
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Mensagens replicadas";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(500);
    }
  } catch (e) {
    console.error("error mine", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}