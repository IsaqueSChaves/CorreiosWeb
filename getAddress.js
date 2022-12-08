//jshint esversion:6
const puppeteer = require('puppeteer');

exports.getAddress = function getAddress(codes) {

  //Resultados
  const address = [];
  var codigos = "";
  for(var i = 0; i < codes.length; i++){
    codigos = codigos + codes[i];
  }

  const url = "https://app.correiosnet.int/rasteamento/sro";

  takeAddress(url);

  async function takeAddress(url) {

    console.log("Take address");
    let count = 1;
    const browser = await puppeteer.launch();
    console.log("Nova página aberta!");
    const page = await browser.newPage();
    await page.goto(url);
    console.log("Indo pra URL");

    console.log("DIGITANDO OS CODIGOS FORNECIDOS");
    //DIGITANDO OS CODIGOS FORNECIDOS
    await page.type('#objetos', codigos);
    await Promise.all([
      page.waitForNavigation(),
      page.click('#btnPesquisar')
    ]);

    console.log("CASO TENHA MAIS DE UM DETALHE TODOS");
    //CASO TENHA MAIS DE UM DETALHE TODOS
    if (codes.length > 1) {
    await Promise.all([
      page.waitForNavigation(),
      page.click("a[name*='DetalhesTodos']")
    ]);

    console.log("COLETANDO CADA LINK COM O ENDEREÇO DO OBJETO");
    //COLETANDO CADA LINK COM O ENDEREÇO DO OBJETO
    const links = await page.$$eval("a[href *='OEC']", el => el.map(link => link.href));

    console.log("Percorrendo os links");
    for(const link of links){
    console.log("Link" + count);
    await page.goto(link);

    console.log("Colentando o endereco");
    const endereco = await page.evaluate(() => {
    const el = document.evaluate("/html/body/form[2]/table/tbody/tr[14]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;;

    if(!el) return "Pesquise manualmente"
    return el.innerHTML;
    });
    console.log("Adicionando ao array");
    address.push(count + codes[count - 1] + " " + endereco);
    count++;
    }
    await browser.close();
    }
  }
  return address;
}
