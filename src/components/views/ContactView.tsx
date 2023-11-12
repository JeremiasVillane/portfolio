"use client";

import { contactFields, initialContactFormData } from "@/constants";
import { AnimationWrapper } from "@/helpers";
import { addData } from "@/services";
import { useEffect, useState } from "react";

export default function ContactView() {
  const [formData, setFormData] = useState<ContactFormData>(
    initialContactFormData
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<Boolean>(false);

  async function handleSendMessage() {
    const res: ApiResponse = await addData("contact", formData);

    if (res && res.status === 200) {
      setFormData(initialContactFormData);
      setShowSuccessMessage(true);
    }
  }

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1500);
    }
  }, [showSuccessMessage]);

  const isValidForm = () => {
    return formData &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.message !== ""
      ? true
      : false;
  };

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="contact"
    >
      <AnimationWrapper className={"py-6"}>
        <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
          <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
            {"Contact Me".split(" ").map((item, index) => (
              <span
                className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
        </div>
      </AnimationWrapper>
      <div className="text-gray-500 relative">
        <div className="container px-5">
          <div className="w-full">
            <div className="flex flex-wrap -m-2">
              {contactFields.map((contactField) =>
                contactField.name === "message" ? (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label className="text-sm text-[#000]">
                        {contactField.label}
                      </label>
                      <textarea
                        id={contactField.name}
                        name={contactField.name}
                        value={formData[contactField.name]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [contactField.name]: e.target.value,
                          })
                        }
                        className="w-full border-green-main border-[2px] bg-[#ffffff] rounded  h-32 text-base outline-none text-[#000000] py-1 px-3 resize-none leading-6"
                      ></textarea>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label className="text-sm text-[#000]">
                        {contactField.label}
                      </label>
                      <input
                        id={contactField.name}
                        name={contactField.name}
                        value={formData[contactField.name]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [contactField.name]: e.target.value,
                          })
                        }
                        className="w-full border-green-main border-[2px] bg-[#ffffff] rounded  text-base outline-none text-[#000000] py-1 px-3 leading-6"
                      />
                    </div>
                  </div>
                )
              )}
              {showSuccessMessage && (
                <p className="text-[14px] font-bold my-[8px]">
                  Your message wass successfully delivered!
                </p>
              )}
              <div className="p-2 w-full">
                <button
                  disabled={!isValidForm()}
                  onClick={handleSendMessage}
                  className="disabled:opacity-50 py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg text-2xl tracking-widest bg-green-main outline-none"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}