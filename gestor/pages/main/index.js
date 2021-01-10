import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchAppBar from '../../components/Main/searchAppBar';
import Header from '../../components/Main/header';
import Content from '../../components/Main/content'


export default function Index({profile, email}) {
    console.log(email); 

  return (
    <div>
        <CssBaseline />
        <SearchAppBar />       
        <Container>
        <Header />
        <p>Email: {profile.email} </p>
        <Content email={email}/>

        
        </Container>
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
    

    const email = JSON.parse(JSON.stringify(json)).email; 
    return {
      props: {
        profile: JSON.parse(JSON.stringify(json)),
        email: email,
      },
    };
  
    }

}

