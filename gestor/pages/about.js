import React from 'react';
import {NextPageContext} from 'next';
import { myGet } from '../pages/api/myGet';
import { responsiveFontSizes } from '@material-ui/core';

export default function User({people}) {
  console.log(people);
  return <div>Hello People</div>  
      

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
  const resp = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  });
  const json = await res.json();  
  return {
    props: {
      people: JSON.parse(JSON.stringify(json)),
    },
  };
}
