import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { lazy } from "react";
import { styles } from "../../styles";
const MainObjectCanvas = lazy(() => import("../canvas/MainObject"));
const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#900000]" />
          <div className="w-1 h-40 sm:h-80 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#900000]">Cuong</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            This is my Image Classification website!
            <br className="hidden sm:block" />
          </p>
        </div>
      </div>
      <MainObjectCanvas/>

      <div className="absolute flex items-center justify-center w-full bottom-32">
        <a href="#service">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 mb-1 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default SectionWrapper(Hero, "home");
