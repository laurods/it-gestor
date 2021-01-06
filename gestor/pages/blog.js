import React from 'react';
import jwt from 'jsonwebtoken';
export default function Blog({profile}) {
    console.log({profile}); 

  return (
    <div>
      <p>About</p>
    </div>  
  
    )  

}

export async function getServerSideProps(context) {
 const { token } = getAppCookies();
 const profile = token ? verifyToken(token.split(' ')[1]) : '';
 return {
    props: {      
      profile,
    },
  };


  function getAppCookies() {
    const parsedItems = {};
    if (context.req.headers.cookie) {
      const cookiesItems = context.req.headers.cookie.split('; ');
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
}

