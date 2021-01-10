import React from 'react';
import jwt from 'jsonwebtoken';
export default function Blog({profile}) {
    console.log(profile); 

  return (
    <div>
      <p>About{profile[0].email}</p>
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
    
 /*   
 const { req } = context; 
 const { token } = getAppCookies(req);
 const profile = token ? verifyToken(token.split(' ')[1]) : '';
 return {
    props: {      
      profile,
    },
  };


  function getAppCookies(req) {
    const parsedItems = {};
    if (req.headers.cookie) {
      const cookiesItems = req.headers.cookie.split('; ');
      cookiesItems.forEach(cookies => {
        const parsedItem = cookies.split('=');
        parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
      });
    }
    return parsedItems;
  }

}

function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, '4a56384b-61de-4446-bcec-49515bb71a0f');
  } catch (e) {
    console.log('e:', e);
    return null;
  }
*/  
}

