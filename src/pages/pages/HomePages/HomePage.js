import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import "../../../Styles/GlobalPages.css";
import Header from '../../libs/Header/Header';

const HomePage = () => {
  const { scrollY } = useViewportScroll();

  const opacityQuemSomos = useTransform(scrollY, [200, 600], [1, 0]);
  const opacityMissao = useTransform(scrollY, [700, 900], [1, 0]);
  const opacityProposito = useTransform(scrollY, [1000, 1200], [1, 0]);
  const opacityValores = useTransform(scrollY, [1300, 1700], [1, 0]);

  return (
    <main>
      <Header />
      <div className='landPage'>
        <motion.section
          id="quem-somos"
          className="fade"
          style={{ opacity: opacityQuemSomos }}
        >
          <h2>Quem somos</h2>
          <p>Somos uma equipe apaixonada por transformar ideias em soluções digitais inovadoras. Na Work 3, unimos nossa expertise em desenvolvimento para oferecer serviços de automação digital que impulsionam a eficiência e o crescimento de empresas.</p>
          <p>Nossa missão é simplificar processos complexos através da tecnologia, capacitando nossos clientes a alcançarem novos patamares de produtividade e sucesso. Com um compromisso inabalável com a qualidade e a excelência técnica, construímos relações duradouras baseadas na confiança mútua e na entrega de resultados excepcionais.</p>
          <p>Na vanguarda da transformação digital, buscamos constantemente inovação em cada projeto que assumimos. Nossa abordagem personalizada garante que cada solução seja adaptada às necessidades específicas de nossos clientes, proporcionando uma vantagem competitiva sustentável em seus mercados.</p>
          <p>Se você está pronto para automatizar seus processos e revolucionar sua operação, estamos aqui para ajudar. Junte-se a nós na jornada para um futuro digital mais eficiente e lucrativo.</p>
        </motion.section>

        <motion.section
          id="missao"
          className="fade"
          style={{ opacity: opacityMissao }}
        >
          <h2>Missão</h2>
          <p>"Transformar empresas através da automação eficiente, utilizando a expertise de desenvolvedores freelancers para criar soluções inovadoras e personalizadas que aumentem a produtividade e impulsionem o crescimento sustentável."</p>
          <p>Essa missão destaca o foco em automação, o uso de freelancers e o objetivo de impulsionar o crescimento das empresas, alinhando-se com a natureza do trabalho da Work 3.</p>
        </motion.section>

        <motion.section
          id="proposito"
          className="fade"
          style={{ opacity: opacityProposito }}
        >
          <h2>Propósito</h2>
          <p>"Capacitar empresas a atingir seu máximo potencial através da automação inteligente, utilizando a expertise diversificada de freelancers para criar soluções tecnológicas personalizadas que promovam a eficiência, a inovação e o crescimento sustentável."</p>
        </motion.section>

        <motion.section
          id="valores"
          className="fade"
          style={{ opacity: opacityValores }}
        >
          <h2>Valores</h2>
          <ul>
            <li><strong>Inovação:</strong> Promover a criatividade e a inovação em todas as soluções oferecidas, buscando constantemente novas maneiras de melhorar e avançar.</li>
            <li><strong>Excelência:</strong> Compromisso com a qualidade e a excelência técnica em todos os projetos e serviços prestados.</li>
            <li><strong>Colaboração:</strong> Fomentar um ambiente colaborativo onde desenvolvedores, freelancers e clientes trabalham juntos para alcançar objetivos comuns.</li>
            <li><strong>Integridade:</strong> Agir com ética e transparência em todas as interações, construindo confiança mútua com clientes e parceiros.</li>
            <li><strong>Flexibilidade:</strong> Adaptar-se rapidamente às mudanças e necessidades específicas de cada cliente, oferecendo soluções personalizadas e ágeis.</li>
            <li><strong>Sustentabilidade:</strong> Buscar soluções que promovam o crescimento sustentável das empresas, respeitando o meio ambiente e a sociedade.</li>
            <li><strong>Foco no Cliente:</strong> Colocar as necessidades e expectativas dos clientes no centro de todas as atividades, garantindo sua satisfação e sucesso.</li>
          </ul>
        </motion.section>
      </div>
    </main>
  );
};

export default HomePage;



