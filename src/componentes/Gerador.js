import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function Gerador() {
  const [number, setNumber] = useState(''); // Número atual
  const [history, setHistory] = useState([]); // Histórico dos números digitados
  const [currentPage, setCurrentPage] = useState(0); // Página atual da tabela
  const itemsPerPage = 5; // Itens por página
  const totalPages = Math.ceil(history.length / itemsPerPage); // Total de páginas
  const [nextId, setNextId] = useState(1); // Contador para os IDs

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=800');
    
    printWindow.document.write('<html><head>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="gerador.css">');
    printWindow.document.write('</head><body>');
    
    const qrCodeContent = document.getElementById('qrcode').innerHTML;
    printWindow.document.write('<div id="qrcode">' + qrCodeContent + '</div>');
    printWindow.document.write('<div class="patrimonio-number">PAT' + number + '</div>');
    
    printWindow.document.close();
    printWindow.print();

    // Após a impressão, adiciona o número ao histórico
    setHistory((prevHistory) => {
      const updatedHistory = [
        { id: nextId, number: number }, // Usando o contador para gerar o ID
        ...prevHistory,
      ].slice(0, 20); // Mantém os últimos 20 números
      return updatedHistory;
    });

    // Incrementa o ID para a próxima operação
    setNextId(nextId + 1);

    // Limpa o campo de número após a impressão
    setNumber('');
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const getCurrentPageItems = () => {
    const start = currentPage * itemsPerPage;
    return history
      .sort((a, b) => b.id - a.id) // Ordena pela data de criação (último primeiro)
      .slice(start, start + itemsPerPage); // Pega os itens da página atual
  };

  return (
    <div className="container">
      <h1>Gerador de QR Code para WhatsApp</h1>
      <input
        type="number"
        placeholder="Digite um número"
        value={number}
        onChange={handleChange}
      />
      {number && (
        <div id="qrcode">
          <QRCodeSVG
            value={`https://wa.me/556232742369?text=Ol%C3%A1%2C%20preciso%20de%20suporte%20para%20meu%20equipamento%2C%20N%C2%BA%20de%20patrim%C3%B4nio%3A%20${number}`}
            size={100}
          />
        </div>
      )}

      {number && (
        <button onClick={handlePrint}>
          Gerar Impressão do QR Code
        </button>
      )}

      {history.length > 0 && (
        <div>
          <h2>Últimos Patrimônios Impressos</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Último Nº Patrimônio</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageItems().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td> {/* Exibe o ID de cada operação */}
                  <td>{item.number}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => changePage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Anterior
            </button>
            <span> Página {currentPage + 1} de {totalPages} </span>
            <button
              onClick={() => changePage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gerador;
