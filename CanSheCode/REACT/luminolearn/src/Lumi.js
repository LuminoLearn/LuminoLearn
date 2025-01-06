import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaFire } from "react-icons/fa"; // Replace with a valid icon

const Lumi = () => {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <Container>
      {/* Animated Fire Effect */}
      <FireIcon
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.8, 1, 0.6, 0.8],
          color: ["#ff4500", "#ff6347", "#ffa500", "#ff4500"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <FaFire />
      </FireIcon>

      {/* Speech Bubble */}
      <SpeechBubble
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Hi, I'm Lumi! Need help? Follow me!</p>
        <button onClick={() => setVisible(false)}>Hide Lumi</button>
      </SpeechBubble>
    </Container>
  ) : null;
};

export default Lumi;

// Styled Components
const Container = styled.div`
  position: fixed;
  bottom: 10%;
  right: 10%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FireIcon = motion(styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff4500; /* Base fire color */
  animation: glow 2s infinite alternate;

  @keyframes glow {
    0% {
      filter: drop-shadow(0 0 5px #ff4500);
    }
    100% {
      filter: drop-shadow(0 0 15px #ffa500);
    }
  }
`);

const SpeechBubble = motion(styled.div`
  background: white;
  color: #002855;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: -80px;
  right: 0;
  font-size: 14px;
  text-align: center;

  button {
    background: #ffa500;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
    margin-top: 5px;
    color: #fff;

    &:hover {
      background: #ff4500;
    }
  }
`);
