import { motion } from 'framer-motion';

const animations = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  exit: { scaleX: 0 },
};

// Dans le style du motion.div :
// style={{ originX: isPresent ? 0 : 1 }} 
// avec une couleur de fond temporaire.


const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
