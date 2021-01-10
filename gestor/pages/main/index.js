import React from 'react';
export default function Index({profile}) {
    console.log(profile); 

  return (
    <div>
      <p>About</p>
    </div>  
  
    )  

}

export async function getServerSideProps(context) {
    
    const cookie = context.req.headers.cookie;
    if(cookie !=='undefined'){
      const resp = await fetch('https://it-gestor.vercel.app/api/user/auth', {
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
          profile: JSON.parse(JSON.stringify(json)),
        },
      };
    }
    
    return {
      props: {
        profile: JSON.parse(JSON.stringify(json)),
      },
    };
  
    }
     
}

