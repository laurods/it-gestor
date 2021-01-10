import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchAppBar from '../../components/Main/searchAppBar';
import HeaderMain from '../../components/Main/headerMain';


export default function Index({profile}) {
    console.log(profile.email); 

  return (
    <div>
        <CssBaseline />
        <SearchAppBar />
        <HeaderMain email={profile.email}/>

       
       
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

