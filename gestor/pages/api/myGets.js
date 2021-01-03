import { NextPageContext } from 'next';
import Router from 'next/router'

export async function myGet(url, ctx){
    const cookie = ctx.req.headers.cookie;
    const resp = await fetch(url, {
        headers: {
            cookie: cookie
        }
    });
    if(res.status === 401 && !ctx.req){
        Router.replace('/login');
        return{};        
    }
    if(res.status === 401 && ctx.req){
        ctx.res.writeHead(302, {
            Location: 'https://it-gestor.vercel.app/login'
        });
        ctx.res.end();
        return;
    }

    const json = await resp.json();
    return json;
}