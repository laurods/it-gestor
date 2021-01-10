export default function createNF(data, email){
    const nf = data;
    const nNF = nf.getElementsByTagName('nNF')[0].innerHTML;    
    const Det = nf.getElementsByTagName('det');
    const xProd = nf.getElementsByTagName('xProd');
    const uCom = nf.getElementsByTagName('uCom');
    const qCom = nf.getElementsByTagName('qCom');
    const pICMS = nf.getElementsByTagName('pICMS');
    const vProd = nf.querySelectorAll('prod vProd');
    const cEAN = nf.getElementsByTagName('cEAN'); //Codigo de barras da caixa
    const cEANTrib = nf.getElementsByTagName('cEANTrib'); // codigo de barras do produto que está dentro da caixa
    const ICMSTot = nf.getElementsByTagName('ICMSTot'); // total dos produtos da nota para calculo do indice de frete
    const ICMSTot_vBC = ICMSTot[0].firstChild.innerHTML;
    const emitente = nf.getElementsByTagName('xNome')[0].innerHTML;
    const destinatario = nf.getElementsByTagName('xNome')[1].innerHTML;
    const cnpjEmitente = nf.getElementsByTagName('CNPJ')[0].innerHTML;
    const cnpjDestinatario = nf.getElementsByTagName('CNPJ')[1].innerHTML;
    
    /*-------------------------------------------------------*/
    // Padronizando os dados dos valores de IPI
    const allipi = nf.getElementsByTagName('IPI');
    const vlrIpi = [];
    for (let index = 0; index < allipi.length; index++) {
      if (allipi[index].childNodes[1].nodeName == 'IPINT') {
        //console.log(`${index} - não tem ipi`)
        vlrIpi.push('0');
      } else if (allipi[index].childNodes[1].nodeName == 'IPITrib') {
        //console.log(`${index} - ${allipi[index].childNodes[1].children}`);
        let c = allipi[index].childNodes[1].children;
        vlrIpi.push(c[3].innerHTML);
        //console.log(`${index} - ${c[3].innerHTML}`);
      } else {
        //console.log(`nada`)
      }
    }
    // fim Padronizando os dados dos valores de IPI
    /*-------------------------------------------------------*/
    // Padronizando os dados dos valores de ICMS
    const allicms = nf.getElementsByTagName('ICMS');
    //console.log(allicms);
    const vlrIcmsSubst = [];
    const vlrIcms = [];
    for (let index = 0; index < allicms.length; index++) {
      if (allicms[index].childNodes[0].nodeName == 'ICMS00') {
        let d = allicms[index].childNodes[0].children;
        //console.table(`${index} - não tem substituição`);
        vlrIcmsSubst.push('0');
        vlrIcms.push(d[5].innerHTML);
      } else if (allicms[index].childNodes[0].nodeName == 'ICMS10') {
        let c = allicms[index].childNodes[0].children;
        vlrIcmsSubst.push(c[10].innerHTML);
        vlrIcms.push(c[10].innerHTML);
        //console.log(`${index} - ${c[10].innerHTML}`);
      } else {
        console.log(`nada ..`);
      }
    }
    // Fim Padronizando os dados dos valores de ICMS
    /*-------------------------------------------------------*/
    // Calculando Diferença de ICMS
    const pIcmsRS = 18;
    const pDifcaIcms = [];
    for (let index = 0; index < pICMS.length; index++) {
      pDifcaIcms.push(pIcmsRS - parseFloat(pICMS[index].innerHTML));
      //console.log(`indice : ${index} - diferença: ${pDifcaIcms}`)
    }
    // Fim Calculando Diferença de ICMS
    /*-------------------------------------------------------*/
    // Criando objeto para nota fiscal
    const items = [];
    const createObj = (item, nameObj) => {
      let arrItem = [];
      for (let index = 0; index < item.length; index++) {
        arrItem.push(item[index].childNodes[0].nodeValue);
      }
      const obj = {};
      const currentObj = obj;
      currentObj[[nameObj[0]]] = arrItem;
      items.push(obj);
    };
    // Fim Criando objeto para nota fiscal
    /*-------------------------------------------------------*/
    // Chamando a função createObj para cada tag do XML
    createObj(Det, ['det']);
    createObj(xProd, ['xprod']);
    createObj(uCom, ['ucom']);
    createObj(qCom, ['qcom']);
    createObj(pICMS, ['picms']);
    createObj(vProd, ['vprod']);
    createObj(cEAN, ['cean']);
    createObj(cEANTrib, ['ceantrib']);
    // fim Chamando a função createObj para cada tag do XML
    /*-------------------------------------------------------*/
    //Desestruturando objeto items para faciliar o acesso aos atributos.

    const [det, xprod, ucom, qcom, picms, vprod, cean, ceantrib] = items;
    //Fim Desestruturando objeto items para faciliar o acesso aos atributos.
    /*-------------------------------------------------------*/
    //Criando novo objeto nfList com atributos calculados.
    const nfList = det.det.map((produto, indice) => {
      const row = {
        email: email,  
        nnf: nNF,
        cnpjEmitente: cnpjEmitente,
        emitente: emitente,
        cnpjDestinatario: cnpjDestinatario,
        destinatario: destinatario,
        cean: cean.cean[indice],
        ceantrib: ceantrib.ceantrib[indice],
        xprod: xprod.xprod[indice],
        ucom: ucom.ucom[indice],
        qcom: parseFloat(qcom.qcom[indice]).toFixed(2),
        picms: parseFloat(picms.picms[indice]),
        perDifcaIcms: pDifcaIcms[indice],
        vprod: parseFloat(vprod.vprod[indice]),
        ipi: parseFloat(vlrIpi[indice]),
        icmsst: parseFloat(vlrIcmsSubst[indice]),
        vDifcaIcms:
          1 *
          (
            parseFloat(vprod.vprod[indice]) *
            (pDifcaIcms[indice] / 100)
          ).toFixed(2),
        custoTotal:
          1 *
          (
            parseFloat(vprod.vprod[indice]) +
            parseFloat(vlrIpi[indice]) +
            parseFloat(vlrIcmsSubst[indice]) +
            parseFloat(vprod.vprod[indice]) * (pDifcaIcms[indice] / 100)
          ).toFixed(2),
        custoUn:
          1 *
          (
            (parseFloat(vprod.vprod[indice]) +
              parseFloat(vlrIpi[indice]) +
              parseFloat(vlrIcmsSubst[indice]) +
              parseFloat(vprod.vprod[indice]) * (pDifcaIcms[indice] / 100)) /
            parseFloat(qcom.qcom[indice])
          ).toFixed(2),
        ifrete: 
        1 * 
         (
          parseFloat(vprod.vprod[indice]) / parseFloat(ICMSTot_vBC)
         ),
         vfrete:0,
      };
      return row;
    });
    console.table(nfList);
    //Fim Criando novo oobjeto nfList com atributos calculados.
    /*-------------------------------------------------------*/
     /* Salva no banco de dados */
    
    axios.post(`https://it-gestor.vercel.app/api/product`, nfList)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      });
      
    /* Fim Salva no banco de dados */ 
}

