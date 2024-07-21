import React, { useEffect, useState, useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import "../../../Styles/GlobalPages.css";
import Header from '../../libs/Header/Header';

import mg1 from '../../../Styles/Images/hmp1.png';
import mg2 from '../../../Styles/Images/hmp2.png';
import mg3 from '../../../Styles/Images/hmp3.png';

const useTypewriterEffect = (text, delay, start) => {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (start && wordIndex < words.length) {
      const intervalId = setInterval(() => {
        setDisplayedText(prev => prev + (prev ? ' ' : '') + words[wordIndex]);
        setWordIndex(prev => prev + 1);
      }, delay);

      return () => clearInterval(intervalId);
    }
  }, [start, wordIndex, words, delay]);

  return displayedText;
};

const HomePage = () => {
  const { scrollY } = useViewportScroll();

  const opacityQuemSomos = useTransform(scrollY, [200, 600], [1, 0]);
  const opacityMissao = useTransform(scrollY, [700, 900], [1, 0]);
  const opacityProposito = useTransform(scrollY, [1000, 1200], [1, 0]);
  const opacityValores = useTransform(scrollY, [1300, 1700], [1, 0]);

  const [startQuemSomos, setStartQuemSomos] = useState(false);
  const [startMissao, setStartMissao] = useState(false);
  const [startProposito, setStartProposito] = useState(false);
  const [startValores, setStartValores] = useState(false);

  const quemSomosRef = useRef();
  const missaoRef = useRef();
  const propositoRef = useRef();
  const valoresRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case "quem-somos":
                setStartQuemSomos(true);
                break;
              case "missao":
                setStartMissao(true);
                break;
              case "proposito":
                setStartProposito(true);
                break;
              case "valores":
                setStartValores(true);
                break;
              default:
                break;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const quemSomosCurrent = quemSomosRef.current;
    const missaoCurrent = missaoRef.current;
    const propositoCurrent = propositoRef.current;
    const valoresCurrent = valoresRef.current;

    if (quemSomosCurrent) observer.observe(quemSomosCurrent);
    if (missaoCurrent) observer.observe(missaoCurrent);
    if (propositoCurrent) observer.observe(propositoCurrent);
    if (valoresCurrent) observer.observe(valoresCurrent);

    return () => {
      if (quemSomosCurrent) observer.unobserve(quemSomosCurrent);
      if (missaoCurrent) observer.unobserve(missaoCurrent);
      if (propositoCurrent) observer.unobserve(propositoCurrent);
      if (valoresCurrent) observer.unobserve(valoresCurrent);
    };
  }, []);

  const quemSomosText = useTypewriterEffect(
    'A Work3 está na vanguarda da inovação digital, oferecendo soluções sob medida para DAOs (Organizações Autônomas Descentralizadas) que buscam otimizar suas operações e maximizar sua eficiência. Em vez de uma equipe interna, trabalhamos com uma rede global de freelancers altamente especializados para proporcionar soluções tecnológicas de ponta que atendem às necessidades únicas de cada DAO.',
    100,
    startQuemSomos
  );

  const missaoText = useTypewriterEffect(
    'Nosso objetivo é simplificar e integrar processos complexos, desenvolvendo softwares personalizados e estratégias que impulsionam o crescimento e a eficácia das DAOs. Com nossa abordagem colaborativa e adaptável, garantimos que cada DAO possa operar com mais fluidez e alcançar novos níveis de sucesso no ambiente descentralizado.',
    100,
    startMissao
  );

  const propositoText = useTypewriterEffect(
    'DAOs. Junte-se a nós para transformar a forma como sua organização opera e alcançar novos patamares de excelência na era Web3.',
    100,
    startProposito
  );

  const valoresText = useTypewriterEffect(
    'simplificamos o complexo mundo da Web3, permitindo que sua DAO foque no que realmente importa: inovação e crescimento.',
    100,
    startValores
  );

  return (
    <main>
      <Header />
      <div className='landPage'>
        <motion.section
          id="quem-somos"
          className="fadeA"
          style={{ opacity: opacityQuemSomos }}
          ref={quemSomosRef}
        >
          <img src={mg1} alt="home" />
          <p>{quemSomosText}</p>
        </motion.section>

        <motion.section
          id="missao"
          className="fadeA"
          style={{ opacity: opacityMissao }}
          ref={missaoRef}
        >
          <img src={mg2} alt="home" />
          <p>{missaoText}</p>
        </motion.section>

        <motion.section
          id="proposito"
          className="fadeA"
          style={{ opacity: opacityProposito }}
          ref={propositoRef}
        >
          <img src={mg3} alt="home" />
          <p>{propositoText}</p>
        </motion.section>

        <motion.section
          id="valores"
          className="fadeA"
          style={{ opacity: opacityValores }}
          ref={valoresRef}
        >
          <p>{valoresText}</p>
        </motion.section>
      </div>
    </main>
  );
};

export default HomePage;
