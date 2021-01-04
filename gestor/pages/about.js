import React from 'react';
import {NextPageContext} from 'next';
import { myGet } from '../pages/api/myGet';

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


export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const people = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  });  
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
    }, // will be passed to the page component as props
  }
}
*/
export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const cookie = context.req.headers.cookie;
  const res = await fetch('https://it-gestor.vercel.app/api/user/findAll', {
    headers: {
      cookie: cookie
    }
  }); 

  const people = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      people,
    },
  }
}