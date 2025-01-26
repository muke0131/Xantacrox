import { motion } from "framer-motion";
import "./framerwaves.css"
const AnimatedWavesLayout = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <motion.div
      className="flex flex-1 flex-col gap-4 p-4 pt-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Grid Items */}
      <motion.div
        className="grid auto-rows-min gap-4 md:grid-cols-3"
        variants={containerVariants}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-video rounded-xl bg-gray-300 overflow-hidden relative wave-animation"
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            {/* Gradient Animation */}
            <div className="absolute inset-0 animate-gradient-wave"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Background */}
      <motion.div
        className="min-h-[100vh] flex-1 rounded-xl bg-gray-300 overflow-hidden relative wave-animation md:min-h-min"
        whileHover={{ scale: 1.02 }}
      >
        {/* Gradient Animation */}
        <div className="absolute inset-0 animate-gradient-wave"></div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedWavesLayout;

