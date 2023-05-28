import { useState } from "react";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../../styles";
import { members } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant } from "../../utils/motion";

const MemberCard = ({ index, name, image, role, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const handleFlip = () => {
    setIsFlipping(true);
    setIsFlipped(!isFlipped);
  };
  const flipFront = () => {
    setIsFlipping(true);
    setIsFlipped(false);
  };
  const flipBack = () => {
    setIsFlipping(true);
    setIsFlipped(true);
  };
  return (
    <div>
      <Tilt options={{ max: 10 }} className="xs:w-[270px] w-full">
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => setIsFlipping(false)}
          className=" transform-preserve-3d"
        >
          <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card select-none"
          >
            <button
              onClick={handleFlip}
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="bg-tertiary w-full rounded-[20px] py-4 px-4 min-h-[280px] flex justify-evenly items-center flex-col"
            >
              <AnimatePresence initial={false}>
                {isFlipping ? (
                  <></>
                ) : !isFlipped ? (
                  // Front
                  <>
                    <img
                      src={image}
                      alt="member"
                      className="object-contain w-30 h-30 "
                      onDragStart={(e) => {
                        e.preventDefault();
                      }}
                    />

                    <h3 className="text-white text-[14px] font-bold text-center">
                      {name}
                    </h3>
                    <h4 className="text-white text-[12px] text-center">
                      {role}
                    </h4>
                  </>
                ) : (
                  // Back
                  <>
                    <h4 className=" text-white text-[12px] text-center rotate-y-180">
                      {description}
                    </h4>
                  </>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.div>
      </Tilt>
    </div>
  );
};

//Main function
const About = () => {
  return (
    <div className="select-none">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0, 0.5)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Click the card for more information about me.
      </motion.p>

      <div className="flex flex-wrap justify-evenly gap-16 mt-20 items-center ">
        {members.map((member, index) => (
          <MemberCard key={member.name} index={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
