import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";

const CriteriaInputBox = () => {
  const [paragraph, setParagraph] = useState("");
  const handleChange = (event) => {
      setParagraph(event.target.value);
    };
    const handleSubmit = () => {};
  return (
    <div
      className={`xl:mt-12 flex flex-col gap-10 overflow-hidden select-none`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] flex-col items-center bg-black-100 p-8 rounded-2xl gap-5"
      >
        <form>
          <label className="p-3">Write about your staff requirements</label>
          <textarea
            id="paragraph"
            name="paragraph"
            rows="5"
            className="p-5 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={paragraph}
            onChange={handleChange}
          />
          <button
            className=" w-fit h-auto green-pink-gradient p-[1px]
                      rounded-[10px] shadow-card select-none"
          >
            <div
              className="bg-tertiary hover:bg-slate-600 rounded-[10px] py-5 px-12  
                        flex justify-evenly items-center flex-col"
              onClick={handleSubmit}
            >
              SUBMIT
            </div>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(CriteriaInputBox, "criteriainputbox");
