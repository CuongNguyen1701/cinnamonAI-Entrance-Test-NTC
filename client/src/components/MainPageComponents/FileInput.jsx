import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { GearCanvas } from "../canvas";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn, textVariant } from "../../utils/motion";
import SubmitButton from "./SubmitButton";
import axios from "axios";

const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files

const FileInput = () => {
  const [loading, setLoading] = useState(0);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  //send to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return alert("No files selected");
    const formData = new FormData();

    formData.append("image", file);

    for (const entry of formData) {
      console.log(entry); //Show all entries in formData
    }
    console.log(backendUrl);
    try {
      setLoading(1);
      const response = await axios.post(`${backendUrl}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let predictionValue = response.data["prediction"][0][0]; //get the prediction value in number
      console.log(predictionValue);
      setPrediction(predictionValue);
    } catch (error) {
      setLoading(0);
      console.log(error);
    }
    setLoading(0);
  };

  //Change the input files whenever the user selects a file
  const handleFileInputChange = (e) => {
    try {
      setLoading(0);
      setPrediction(null);
      let processedFiles = e.target ? e.target.files : e;
      if (!processedFiles) return;
      setFile(processedFiles[0]);
      console.log(processedFiles[0]);
      //create a preview image
      const objectUrl = URL.createObjectURL(processedFiles[0]);
      setPreviewImage(objectUrl);
      console.log(previewImage);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = (e) => {
    handleFileInputChange(e);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "images/jpeg": [".jpg", ".jpeg"],
      "images/png": [".png"],
    },
    onDrop,
  });

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-full mx-auto relative z-0 flex flex-col`}
    >
      <span className="hash-span" id={"service"}>
        &nbsp;
      </span>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Service</p>
        <h2 className={styles.sectionHeadText}>Face Classifier</h2>
      </motion.div>
      <div
        className={`lg:mt-12 flex lg:flex-row flex-col items-center justify-center gap-10 overflow-hidden select-none`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className=" bg-black-100 p-8 rounded-2xl"
        >
          <div className="flex flex-row justify-center gap-5">
            <form className="flex flex-col gap-6">
              <div className="my-5">
                {previewImage ? (
                  <div className="p-8 max-w-md">
                    <div className="flex flex-row justify-between">
                      <div className="text-center font-semibold pb-2">
                        Image uploaded!
                      </div>
                      <div
                        className="hover:cursor-pointer text-blue-400 underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setPreviewImage(null);
                          setFile(null);
                        }}
                      >
                        Choose another image
                      </div>
                    </div>
                    <img src={previewImage} alt="Uploaded" />
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    htmlFor="dropzone-files"
                    className="flex flex-col gap-8 px-8 py-20 my-3 text-center text-gray-600 border-2 border-dashed cursor-pointer rounded-xl 
                          border-slate-500 bg-slate-100 hover:bg-slate-400 hover:text-white hover:border-white"
                    onChange={handleFileInputChange}
                  >
                    Drag & drop your image here to see if it has been edited!
                    <input
                      {...getInputProps()}
                      id="dropzone-files"
                      accept=".jpg,.jpeg"
                      type="files"
                      multiple={true}
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </div>
                )}
                <div className="flex flex-row justify-between">
                  <SubmitButton handleSubmit={handleSubmit} />
                  {prediction && previewImage ? (
                    <div className="flex flex-col gap-5 p-2 justify-between">
                      <div className="font-bold">
                        {prediction > 0.9
                          ? "This image is real!"
                          : prediction > 0.7
                          ? "This image looks real to me"
                          : prediction > 0.5
                          ? "I'm not quite sure, but it seems real"
                          : prediction > 0.3
                          ? "This image looks fake to me"
                          : "This image is fake!"}
                      </div>

                      <div>prediction value: {prediction.toFixed(2)}</div>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:h-[400px] h-[200px] w-min"
        >
          <GearCanvas loading={loading} />
          {loading ? (
            <div className="self-center animate-pulse text-2xl">
              Waiting for the Ayy Eye to do the magic...
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FileInput;
