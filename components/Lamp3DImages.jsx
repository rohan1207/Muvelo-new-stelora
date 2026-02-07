'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LAMPS = [
  {
    id: 1,
    imageOff: '/lamp1-off.png',
    imageOn: '/lamp1.png',
  },
  {
    id: 2,
    imageOff: '/lamp2-off.png',
    imageOn: '/lamp2.png',
  },
  {
    id: 3,
    imageOff: '/lamp3-off.png',
    imageOn: '/lamp3.png',
  },
];

const Lamp3DImages = ({ theme = 'dark' }) => {
  const [lampIndex, setLampIndex] = useState(0);
  const isDark = theme === 'dark';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLampIndex((prev) => (prev + 1) % LAMPS.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const currentLamp = LAMPS[lampIndex];
  const imageOn = currentLamp.imageOn;

  const floatingAnimation = {
    y: [0, -25, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1],
    },
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center touch-manipulation">
      <motion.div
        className="relative flex items-center justify-center"
        animate={floatingAnimation}
        style={{
          width: '85%',
          height: '85%',
          maxWidth: '85%',
          maxHeight: '85%',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.img
            key={lampIndex}
            src={imageOn}
            alt="Lamp"
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Lamp3DImages;
