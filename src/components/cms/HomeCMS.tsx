"use client";

import { homeFields } from "@/constants";
import { HomeInterface } from "@/db";
import { FormFields } from "@/helpers";

export default function HomeCMS({
  formData,
  setFormData,
  handleSaveData,
}: {
  formData: HomeInterface;
  setFormData: React.Dispatch<React.SetStateAction<HomeInterface>>;
  handleSaveData: any;
}) {
  return (
    <div className="w-full">
      <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormFields
          fields={homeFields}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={() => handleSaveData()}
          className="mt-[10px] border border-green-600 p-4 font-bold text-[16px]"
        >
          Add Info
        </button>
      </div>
    </div>
  );
}
