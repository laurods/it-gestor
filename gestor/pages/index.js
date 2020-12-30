import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import axios from 'axios';
import Head from 'next/head';
import GlobalStyle from '../styles/global';
import Upload from '../components/Upload';
import Top from '../components/Home/top';
import Content from '../components/Home/content';
import TableNF from '../components/Home/tableNF';
//import Link from 'next/link'

class Home extends Component {
  state = {
    uploadedFiles: [],
    nfs: [],
    products: [],
    login:[],
    cnpjEmitente:'',
    show: true,    
  };
  handleUpload = (files) => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });
    uploadedFiles.forEach(this.processXML);
  };
  /*Incio CreateNF*/
  createNF = (data) => {
    const nf = data;
    const nNF = nf.getElementsByTagName('nNF')[0].innerHTML;
    
    /*-------------------------------------------------------*/
    // Verifica se a NF já existe
    const isNFexist = this.state.nfs.filter((nf) => nf === nNF);
    if (isNFexist.length > 0) {
      alert('Nota fiscal já processada');
      return;
    }
    // Fim Verifica se a NF já existe

    /*-------------------------------------------------------*/
    
    const Det = nf.getElementsByTagName('det');
    const xProd = nf.getElementsByTagName('xProd');
    const uCom = nf.getElementsByTagName('uCom');
    const qCom = nf.getElementsByTagName('qCom');
    const pICMS = nf.getElementsByTagName('pICMS');
    const vProd = nf.querySelectorAll('prod vProd');
    const cEAN = nf.getElementsByTagName('cEAN'); //Codigo de barras da caixa
    const cEANTrib = nf.getElementsByTagName('cEANTrib'); // codigo de barras do produto que está dentro da caixa
    const tProd = nf.getElementsByTagName('ICMSTot'); // total dos produtos da nota para calculo do indice de frete
    const totalProducts = tProd[0].children[8].innerHTML;    
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
        nnf: nNF,
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
          parseFloat(vprod.vprod[indice]) / parseFloat(totalProducts)
         ).toFixed(2),
         vfrete:0,
      };
      return row;
    });
    //console.table(nfList);
    //Fim Criando novo oobjeto nfList com atributos calculados.
    /*-------------------------------------------------------*/
    //Criando novo objeto nfObject com atributos    
    const emitente = nf.getElementsByTagName('xNome')[0].innerHTML;
    const destinatario = nf.getElementsByTagName('xNome')[1].innerHTML;
    const cnpjEmitente = nf.getElementsByTagName('CNPJ')[0].innerHTML;
    const cnpjDestinatario = nf.getElementsByTagName('CNPJ')[1].innerHTML;
    const modFrete = nf.getElementsByTagName('modFrete')[0].innerHTML;     
    const nfObject = {
      nNF,
      emitente,
      cnpjEmitente,
      destinatario,
      cnpjDestinatario,
      modFrete,   
    }   
    // Fim Criando novo objeto nfObject com atributos
    /*-------------------------------------------------------*/
    //Criando novo objeto LoginObject com atributos
    const telefoneDestinatario = nf.getElementsByTagName('fone')[1].innerHTML;
    const loginObject ={
      user: cnpjEmitente,
      password: telefoneDestinatario
    }
     //Fim Criando novo objeto LoginObject com atributos
     /*-------------------------------------------------------*/    
    /*Atualiza o state*/
    this.setState({
      products: this.state.products.concat(nfList),
      nfs: this.state.nfs.concat(nfObject),
      login: this.state.login.concat(loginObject),
      cnpjEmitente: cnpjEmitente,
      show: false,     
    });
    /*Fim Atualiza o state*/
    /* Salva no banco de dados */
    /*
    axios
      .post(`https://it-gestor.vercel.app/api/product`, nfList)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.res.data);
        console.log(error.res.status);
        console.log(error.res.headers);
      });
      */
    /* Fim Salva no banco de dados */
   
  };
  /*FIm incio CreateNF*/  

  /* Inicio processXML*/  
  processXML = (file) => {
    axios
      .get(file.preview, { responseType: 'document' })
      .then((response) => this.createNF(response.data));
  };
  /* Fim processXML*/

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) =>
      URL.revokeObjectURL(file.preview)
    );
  }
  render() {
    const {nfs, products, cnpjEmitente, show} = this.state;    
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        {!!show && <Top /> }
        {!!show && <Upload onUpload={this.handleUpload} /> }   
        {!!show && <Content />} 
        {!!products.length && <TableNF products={products} cnpjEmitente={cnpjEmitente}/> }
        <GlobalStyle />
      </div>
    );
  }
}

export default Home;
