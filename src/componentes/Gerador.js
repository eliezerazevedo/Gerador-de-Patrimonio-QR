import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function Gerador() {
  const [number, setNumber] = useState(''); // Número atual
  const [history, setHistory] = useState([]); // Histórico dos números digitados

  const handleChange = (event) => {
    const newNumber = event.target.value;
    setNumber(newNumber);

    // Se o número for válido e não estiver vazio, adiciona ao histórico
    if (newNumber && !isNaN(newNumber)) {
      setHistory((prevHistory) => {
        const updatedHistory = [newNumber, ...prevHistory].slice(0, 10); // Mantém os últimos 10 números
        return updatedHistory;
      });
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=800');
    
    printWindow.document.write('<html><head>');
    
    // Link para o arquivo CSS
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="gerador.css">');
    
    printWindow.document.write('</head><body>');
    
    // Inserir o conteúdo do QRCodeSVG diretamente na janela de impressão
    const qrCodeContent = document.getElementById('qrcode').innerHTML;
    printWindow.document.write('<div id="qrcode">' + qrCodeContent + '</div>');
    
    // Add text with PAT number (assuming you have a variable called 'number')
    printWindow.document.write('<div class="patrimonio-number">PAT' + number + '</div>');
    
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
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
          {/* QR Code com link para WhatsApp */}
          <QRCodeSVG
            value={`https://wa.me/556232742369?text=Ol%C3%A1%2C%20preciso%20de%20suporte%20para%20meu%20equipamento%2C%20N%C2%BA%20de%20patrim%C3%B4nio%3A%20${number}`}
            size={100}
          />
        </div>
      )}

      {/* Botão para imprimir */}
      {number && (
        <button onClick={handlePrint}>
          Gerar Impressão do QR Code
        </button>
      )}

      {/* Tabela dos últimos 10 números */}
      {history.length > 0 && (
        <div>
          <h2>Últimos Patrimônios Impressos</h2>
          <table>
            <thead>
              <tr>
                <th>Nº Patrimônio</th>
              </tr>
            </thead>
            <tbody>
              {history.map((num, index) => (
                <tr key={index}>
                  <td>{num}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Gerador;
