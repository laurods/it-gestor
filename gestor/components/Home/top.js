import Typography from '@material-ui/core/Typography';
export default function Top() {

    return (
        <main>       
          <div className="title">
          <Typography variant="h1" component="h2" gutterBottom>
                 itGestor
          </Typography>            
         </div>
         <div>
          <Typography variant="h4" gutterBottom>
          Calcule os custos das mercadorias
          </Typography>
          <Typography variant="h4" gutterBottom>
          Aumente as vendas precificando seus produtos de forma eficiente!
          </Typography>  
          </div>         
        </main>
    );
}