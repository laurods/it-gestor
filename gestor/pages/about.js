import React from 'react';
import Link from 'next/link';

/* middleware */
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from '../util/authenticated';

/* components */


export default function About(props) {
  const { profile } = props;
  console.log(profile);
  
  


  return (
   
      <div className="container">
        <main>
          <h1 className="title">About Page</h1>
          {!profile ? (
            <a href="/">Login to continue</a>
          ) : (
            <div>
              <h1>Está Logado</h1>
            </div>
          )}
        </main>
      </div>
  
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);  
  const baseApiUrl = `${origin}/api/about`;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  return {
    props: {
      baseApiUrl,
      profile,                
    },
  };
}