import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-tilt";
import { useDropzone } from "react-dropzone";
import PDFPreview from "../MainPageComponents/PDFPreview";
import { GearCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { technologies } from "../../constants";

const TechnologyCard = ({ index, name, icon }) => {
  const [currentColor, setCurrentColor] = useState("#211648");
  const [tiltColor, setTiltColor] = useState("#211648");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleMouseMove = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const tiltWidth = event.currentTarget.offsetWidth;
    const tiltXPercentage = x / tiltWidth;
    let brightness = 150;
    let r =
      tiltXPercentage <= 0.5
        ? brightness
        : brightness * (2 - 2 * tiltXPercentage);
    let g =
      tiltXPercentage >= 0.5 ? brightness : brightness * (2 * tiltXPercentage);
    let b = 0; //-tiltXPercentage * (tiltXPercentage - 1) * 4 * brightness
    setTiltColor(`rgba(${r}, ${g}, ${b}, 1)`);
  };
  return (
    <Tilt
      options={{ max: 10 }}
      className={`rounded-xl  flex justify-evenly items-center flex-col bg-[${currentColor}]`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: isHovering ? tiltColor : currentColor }}
    >
      <button
        className="w-full h-full px-5 py-5"
        onClick={() => setCurrentColor(tiltColor)}
      >
        {name}
      </button>
    </Tilt>
  );
};

const CriteriaChooser = () => {
  return (
    <div
      className={`xl:mt-12 flex flex-col gap-10 overflow-hidden select-none`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] flex-col bg-black-100 p-8 rounded-2xl gap-5"
      >
        <div className="p-3">
          Choose the preferred and unpreferred criterias
        </div>
        <div className="grid gap-4 p-8 xl:grid-cols-4 xs:grid-cols-1 bg-slate-300 rounded-2xl">
          {technologies.map((technology, index) => (
            <TechnologyCard
              key={technology.name}
              index={index}
              {...technology}
            />
          ))}
        </div>
      </motion.div>

      {/* <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <GearCanvas loading={loading} />
      </motion.div> */}
    </div>
  );
};

export default SectionWrapper(CriteriaChooser, "employerpage");
