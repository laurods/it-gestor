import React from 'react';
import Router from 'next/router';

export default function User({people}) {
  
  console.log(typeof people);
  console.log(people);
  console.log(Object.keys(people));  

  return (
    <div>
      <p>About</p>
    </div>  
  
    )  

}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  if(cookie !=='undefined'){
    const resp = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  });

  const json = await resp.json();
  if (json.error) {
    context.res.writeHead(302, {
      Location: 'https://it-gestor.vercel.app/login'
    });
    context.res.end();
    return{
      props:{
        people: JSON.parse(JSON.stringify(json)),
      },
    };
  }
  
  return {
    props: {
      people: JSON.parse(JSON.stringify(json)),
    },
  };

  }

}

