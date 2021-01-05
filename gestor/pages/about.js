import React, { useState } from 'react';
import {NextPageContext} from 'next';
import { myGet } from '../pages/api/myGet';
import { responsiveFontSizes } from '@material-ui/core';
import { Router } from 'next/router';

export default function User({people}) {
  const [login, setLogin] = useState(false);
  const [allPeople, setAllPeople] = useState([]);

  if(typeof people === 'Object'){
    setLogin(true);
  }
  if(typeof people === 'Array'){
    setAllPeople(people);
  }


  return (
    <div>
    {!!login &&<p>Por gentileza faça Login</p>}
    {!!allPeople.length &&<p>Você está Logado</p>}
    </div>  
  
    )  

}
/*
User.getInitialProps = async ({ctx}) => {
  const cookie = ctx.req.headers.cookie;
  const resp = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  });
  const json = await resp.json();
  return{people: json};
}

*/
export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  if(cookie !=='undefined'){
    const resp = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  });
  const json = await resp.json();  
  return {
    props: {
      people: JSON.parse(JSON.stringify(json)),
    },
  };

  }else{
    Router.replace('/login');
  }
  
/*
  if(resp.status === 502){
   
    return {};
  }

  if(resp.status === 401 && !context.req){
    Router.replace('/login');
    return {};
  }

  if(resp.status === 401 && context.req){
    context.res.writeHead(302, {
      Location: 'https://it-gestor.vercel.app/login'
    });
    context.res.end();
    return;
  }
  */
}
