import React from "react";
import {  FaFacebookF,  FaInstagram,  FaLinkedinIn,  FaTwitter, FaYoutube, } from "react-icons/fa";

const Footer = () => {
  const styles = {
    background: "rgb(255,170,79)",
    background: "linear-gradient(165deg, rgba(255,255,255,1) 0%, rgba(96,180,255,1) 100%)",
  };
  return (
    <div style={styles}>
      <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black-300">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#ee4714]">Hackcedo</h1>
          <p className="py-4">

          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <div>
              <a href={"https://www.facebook.com/IncedoInc"}>
                <FaFacebookF size={30} />
              </a>
            </div>
            <div>
              <a href={"https://twitter.com/IncedoInc"}>
                <FaTwitter size={30} />
              </a>
            </div>
            <div>
              <a href={"https://www.linkedin.com/company/incedo-inc/"}>
                <FaLinkedinIn size={30} />
              </a>
            </div>
            <div>
              <a
                href={"https://www.youtube.com/channel/UC6LjAUc6LyvLSwrEOMJaH_Q"}
              >
                <FaYoutube size={30} />
              </a>
            </div>
            <div>
              <a href={""}>
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",

        }}>
          {" "}
          © Copyright 2023 Incedo Inc.
        </div>
      </div>
    </div>
  );
};

export default Footer;
