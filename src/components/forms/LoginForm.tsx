"use client";

import { loginFields } from "@/constants/fields";
import { FormFields } from "@/helpers";
import { LoginFormData } from "@/types";
import { Button } from "../ui";

export function LoginForm({
  formData,
  setFormData,
  handleLogin,
}: {
  formData: LoginFormData;
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
  handleLogin: () => {};
}) {
  const isValidForm = () => {
    return formData && formData.username !== "" && formData.password !== ""
      ? true
      : false;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center mt-[calc(100vh/3)]">
      <form className="w-80 bg-white shadow-md rounded-lg p-8">
        <FormFields
          fields={loginFields}
          formData={formData}
          setFormData={setFormData}
        />
        <Button
          onClick={handleLogin}
          disabled={!isValidForm()}
          className="w-full"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
