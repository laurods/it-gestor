import React, { Component } from 'react';
import Head from 'next/head'
import GlobalStyle from '../styles/global';
import Upload from '../components/Upload';

class Home extends Component{
 
  componentWillUnmount(){
 
  }
  render(){           
    return(
    <div className="container">
       <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
       </Head>
       <main>
       <h1 className="title">
          <a href="#">itGestor</a>
        </h1>
        <h2 className="subtitle">Gerêncie os custos das mercadorias</h2>
        <h2 className="subtitle">Lucre mais comprando melhor!</h2>
        <div className="grid">
          <div className="card"> 
              <Upload  />
          </div>
          <div  className="card">
            <h3>Fácil</h3>
            <p>Arraste os arquivos XML das notas de compra. O itGestor calcula os custos para você.</p>
          </div>
          <div  className="card">
            <h3>Gratuito</h3>
            <p>Sem mensalidades. Grátis para 10 notas mensais.</p>
          </div>
          <div  className="card">
            <h3>Simples</h3>
            <p>Apenas com 1 clique você terá os todos os custos calculados.</p>
          </div>
        </div>
        <footer>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="card"
        >
          <strong>Acima de 10 notas mensais R$ 0.99 por nota. <br/>Conheça nossos planos de bilhetagem!</strong>
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="card"
        >
          <strong>WhatsApp (54) 9.9957-2366</strong>
        </a>
      </footer>
       </main>
       
        <GlobalStyle />
    </div>
       
    );

  }
  
}

export default Home