function AnoAtual() {
  return new Date().getFullYear();
}

function Footer() {
  const anoAtual = AnoAtual();

  return (
      <p>&copy; 2023 - {anoAtual} Todos os direitos reservados. | Desenvolvido por Eliezer Azevedo.</p>
  );
}

export default Footer;