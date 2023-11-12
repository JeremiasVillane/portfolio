"use client";

import { aboutFields } from "@/constants";
import { AboutInterface } from "@/db";
import { FormFields } from "@/helpers";

export default function AboutCMS({
  formData,
  setFormData,
  handleSaveData,
}: {
  formData: AboutInterface;
  setFormData: React.Dispatch<React.SetStateAction<AboutInterface>>;
  handleSaveData: any;
}) {
  return (
    <div className="w-full">
      <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormFields
          fields={aboutFields}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={() => handleSaveData("about")}
          className="mt-[10px] border border-green-600 p-4 font-bold text-[16px]"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
