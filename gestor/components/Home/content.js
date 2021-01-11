import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Typography from '@material-ui/core/Typography';
export default function Content() {

    return (
       <main>        
          <div className="grid">
            <div className="card">
            <h3>Fácil</h3>             
              <p>
                Arraste os arquivos XML das notas de compra. O itGestor calcula
                os custos para você.
                </p>
              <strong>
                Fale Conosco <br />                
              </strong>
              <WhatsAppIcon />
              <strong>(54) 9.9957-2366</strong>
             
            </div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
            >
              <h3>Gratuito</h3>
              <p>Sem mensalidades. Grátis para 10 notas mensais. Fácil. Seguro. Rápido. Conheça o itGestor!.</p>
              <strong>
                Acima de 10 notas mensais R$ 0.99 por nota. <br />                
              </strong>
              <strong>Conheça nossos planos de bilhetagem!</strong>
            </a>
          </div>
 
    </main>
    );
}