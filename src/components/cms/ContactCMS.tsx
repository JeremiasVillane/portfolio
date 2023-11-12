"use client";

import { ContactInterface } from "@/db";

export default function ContactCMS({ data }: { data: ContactInterface[] }) {
  return (
    <div className="flex flex-col gap-5">
      {data && data.length
        ? data.map((item) => (
            <div className="p-5 border">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.message}</p>
            </div>
          ))
        : null}
    </div>
  );
}