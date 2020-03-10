import React from 'react';
import './styles/main.scss';

import { Container } from 'react-bootstrap';
import GameComponent from './components/GameComponent';

function App() {
  return (
    <div className="main text-center">
      <Container>
        <div className="row">
          <div className="col-sm-12 alert">
            <h2>Sala Interactiva Para Prestadores</h2>
            <p>
              Mostrar los aspectos que hacen que la presentación de un proyecto sea exitosa en el marco del Programa de Intervención Especializada para la Mitigación de Barreras para la Población Víctimas del Conflicto Armado.
            </p>
          </div>
        </div>

        <GameComponent />
      </Container>
    </div>
  );
}

export default App;
