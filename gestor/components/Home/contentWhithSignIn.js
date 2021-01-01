import Button from '@material-ui/core/Button';

export default function Content(props) {
    const { onshowContentWhithSignIn } = props;
    const [open, setOpen] = React.useState(true);
    const onHandleClick = ()=>{
      setOpen(false)
      onshowContentWhithSignIn()
    }

    

    return (
       <main>   
        <strong>Simples. Arraste o arquivo XML da nota de compra. Ou clique entrar para acessar itGestor</strong>
        {!!open &&
            <Button
            variant="contained"
            color="primary"
            size="small" 
            onClick={()=> onHandleClick()}               
           >
            Entrar
          </Button> 
        }        
                     
       
    </main>
    );
}