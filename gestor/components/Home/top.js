import Typography from '@material-ui/core/Typography';
export default function Top() {

    return (
        <main>       
          <div className="title">
          <Typography variant="h1" component="h2" gutterBottom>
                 itGestor
          </Typography>            
         
          <Typography variant="h2" gutterBottom>
          Calcule os custos das mercadorias
          </Typography>
          <Typography variant="h2" gutterBottom>
          Aumente os lucros precificando seus produtos de forma eficiente!
          </Typography>  
          </div>         
        </main>
    );
}