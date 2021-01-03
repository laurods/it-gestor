import { useRef, useState } from "react"

export default function Login(){
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [message, setMessage] = useState(null);


    async function handleLogin(){
        const resp = await fetch('https://it-gestor.vercel.app/api/user/signup', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passRef.current.value,
            })
        });

        const json = await resp.json();
        setMessage(json);
    }
    return <div>
        {JSON.stringify(message)}
        <h1>Cadastrar</h1>
        <input type="text" placeholder="email" ref={emailRef}/>
        <input type="password" placeholder="password" ref={passRef}/>

        <button onClick={handleLogin}>Login</button>
    </div>

}