import './App.css';
import { useState } from 'react';

function App() {
  const [endereco, setEndereco] = useState({
    cep: ''
  })

  function manipularEndereco(evento) {
    
    const cep = evento.target.value
    
    setEndereco({
      cep
    })

    if (cep && cep.length === 8) {
      //https://viacep.com.br/ws/30441021/json/
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco(enderecoAntigo => ({
            ...enderecoAntigo,
            cep: dados.cep,
            logradouro: dados.logradouro,
            complemento: dados.complemento,
            unidade: dados.unidade,
            bairro: dados.bairro,
            localidade: dados.localidade,
            uf: dados.uf,
            estado: dados.estado,
            regiao: dados.regiao,
            ibge: dados.ibge,
            gia: dados.gia,
            ddd: dados.ddd,
            siafi: dados.siafi,
          }))
        })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder='Digite o CEP' onChange={manipularEndereco}/>
        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.localidade}</li>
          <li>Estado: {endereco.uf}</li>
          </ul>
      </header>
    </div>
  );
}

export default App;
