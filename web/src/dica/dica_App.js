import React, { useState } from 'react';

// Componente: bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: informações que um componente PAI passa para um componente FILHO
// Estado: informações mantidas pelo componente {Lembrar: imutabilidade}

import Header from './Header';

function App() {
  const [counter, setCounter] = useState(0);

  function incrementarCounter() {
    setCounter(counter + 1);
  }

  return (
    // JSX junção HTML + JAVASCRIPT
    // tag fragment <> sempre que precisar colocar um componente um abaixo do outro 
    //                 é necessario um container e essa tag serve como container sem renderizar no HTML.
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementarCounter}>Incrementar</button>
      <Header title="Dashboard" />
      <Header title="Meu Perfil" />
      <Header title="Titulo 1" />
    </>
  );
}

export default App;
