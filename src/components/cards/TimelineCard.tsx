"use client";

import AuthContext from "@/providers/auth-provider";
import ContentContext from "@/providers/content-provider";
import { TimelineInterfaceType } from "@/types";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "../ui";
import schoolIcon from "/public/assets/school.svg";
import workIcon from "/public/assets/work.svg";
import { deleteData } from "@/services";
import { useRouter } from "next/navigation";

export function TimelineCard({
  section,
  item,
  index,
  deleteState,
}: {
  section: string;
  item: TimelineInterfaceType;
  index: number;
  deleteState: {
    toDelete: Record<string, boolean>;
    setToDelete: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  };
}) {
  const router = useRouter();
  const { authUser } = useContext(AuthContext);
  const { renderEditButton, renderContent, isEditable } =
    useContext(ContentContext);

  const { toDelete, setToDelete } = deleteState;

  const handleDelete = async () => {
    if (toDelete[section as keyof Record<string, boolean>]) {
      await deleteData(section.toLowerCase(), { _id: item._id });
      setToDelete({
        ...toDelete,
        [section]: false,
      });
      router.refresh();
    } else null;
  };

  const color =
    section === "Formation"
      ? "bg-[var(--secondary-color)]"
      : "bg-[var(--tertiary-color)]";

  return (
    <article
      key={index}
      className={`flex m-4 relative ${
        toDelete[section as keyof Record<string, boolean>]
          ? "hover:border-2 border-dashed border-red-500 rounded-lg cursor-pointer"
          : ""
      }`}
      onClick={handleDelete}
    >
      <div
        className={`${color} w-0.5 h-6 translate-x-20 translate-y-56 opacity-60 sm:hidden`}
      ></div>
      <div
        className={`${color} w-0.5 h-6 translate-x-80 translate-y-56 opacity-60 sm:hidden`}
      ></div>

      <aside className="group/date hidden items-start w-44 pt-0.5 relative sm:flex">
        {authUser ? (
          <span className="hidden group-hover/date:flex">
            {renderEditButton({ itemId: item._id, field: "date" })}
          </span>
        ) : null}
        {renderContent(
          section,
          "date",
          "w-4/5 text-gray-500 select-none",
          item,
          index
        )}
        <div
          className={`${color} w-px h-full translate-x-5 translate-y-10 opacity-30`}
        ></div>

        <Image
          src={item.icon === "school" ? schoolIcon : workIcon}
          alt={item.icon}
          className={`${color} w-10 p-1 rounded-lg z-20 select-none`}
          draggable="false"
        />

        <div className={`${color} h-px w-8 translate-y-5 opacity-30`}></div>
      </aside>

      <section className="flex flex-col border border-gray-600 rounded-lg px-8 py-4 bg-gray-100 w-full text-center z-10 sm:w-96">
        <div className="flex items-center justify-center mb-3">
          <Image
            src={item.icon === "school" ? schoolIcon : workIcon}
            alt={item.icon}
            className={`${color} w-10 p-1 rounded-lg z-20 sm:hidden select-none`}
            draggable="false"
          />
        </div>

        <div className="group/title flex self-center">
          {authUser ? (
            <span className="hidden group-hover/title:flex">
              {renderEditButton({ itemId: item._id, field: "title" })}
            </span>
          ) : null}
          {renderContent(
            section,
            "title",
            "text-xl font-medium text-[var(--primary-color)]",
            item,
            index
          )}
        </div>

        <div className="group/location flex self-center">
          <span className="hidden group-hover/location:flex">
            {authUser
              ? renderEditButton({ itemId: item._id, field: "location" })
              : null}
          </span>
          {renderContent(
            section,
            "location",
            "text-gray-500 mt-1 mb-6 sm:mb-8 sm:text-sm",
            item,
            index
          )}
        </div>

        <div className="group/date flex self-center items-start">
          {authUser ? (
            <span className="hidden group-hover/date:flex -mt-7">
              {renderEditButton({ itemId: item._id, field: "date" })}
            </span>
          ) : null}
          {renderContent(
            section,
            "date",
            "text-gray-500 sm:hidden -mt-6 mb-6",
            item,
            index
          )}
        </div>

        <div className="group/description flex whitespace-pre-wrap">
          <span className="hidden group-hover/description:flex">
            {authUser
              ? renderEditButton({ itemId: item._id, field: "description" })
              : null}
          </span>

          {renderContent(section, "description", "mb-4 text-left", item, index)}
        </div>

        <div className="group/tech flex flex-wrap mb-6 justify-center">
          <span className="hidden group-hover/tech:flex">
            {authUser
              ? renderEditButton({ itemId: item._id, field: "tech" })
              : null}
          </span>

          {Object.values(item.tech).map((_tech, idx) => {
            return renderContent(
              section,
              "tech",
              `bg-blue-100 text-blue-800 border border-[#b8bef8] rounded-xl px-2 py-1 text-sm m-1  select-none ${isEditable(
                { itemId: item._id, field: "tech" }
              )} ? "" : "cursor-default"
            }`,
              item,
              index,
              _tech,
              idx
            );
          })}
        </div>

        {item.buttonText ? (
          <div className="group/buttonText flex justify-center">
            <span className="hidden group-hover/buttonText:flex">
              {authUser
                ? renderEditButton({ itemId: item._id, field: "buttonText" })
                : null}
            </span>

            <Button
              href={item.buttonLink}
              size="sm"
              color={section === "Experience" ? "tertiary" : "secondary"}
            >
              {item.buttonText}
            </Button>
          </div>
        ) : null}
      </section>
    </article>
  );
}
