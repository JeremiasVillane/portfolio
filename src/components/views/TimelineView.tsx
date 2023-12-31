"use client";

import { AnimationWrapper } from "@/helpers";
import { useModal } from "@/hooks";
import AuthContext from "@/providers/auth-provider";
import ContentContext from "@/providers/content-provider";
import { AllData, TimelineInterfaceType } from "@/types";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { NewTimelineItemForm } from "../forms";
import { Timeline } from "../ui";

export function TimelineView() {
  const { authUser } = useContext(AuthContext);
  const { data } = useContext(ContentContext);
  const { showModal } = useModal();
  const [toDelete, setToDelete] = useState<Record<string, boolean>>({});

  return (
    <main
      className="max-w-screen-xl mt-24 mb-6 lg:mt-14 lg:mb-14 px-6 lg:px-8 mx-auto"
      id="experience"
    >
      <article className="grid grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-2 gap-8">
        {["Experience", "Formation"].map((section, index) => {
          return (
            <section key={index} className="flex flex-col gap-5">
              <AnimationWrapper className={"py-6 lg:py-16"}>
                <header className="flex flex-col justify-center items-center row-start-2 lg:row-start-1 lg:ml-36">
                  <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
                    My{" "}
                    <span className="text-[var(--primary-color)]">
                      {section}
                    </span>
                  </h1>

                  {authUser && (
                    <div className="flex gap-3">
                      <i
                        title={`Add ${section.toLocaleLowerCase()}`}
                        className={
                          "ri-add-circle-line text-[var(--tertiary-color)] hover:text-[var(--secondary-color)] active:scale-95 transition-all ease-in-out duration-300 text-5xl cursor-pointer"
                        }
                        onClick={() =>
                          showModal(<NewTimelineItemForm section={section} />)
                        }
                      />
                      <i
                        title={`Remove ${section.toLocaleLowerCase()}`}
                        className={`ri-close-circle-line ${
                          toDelete[section as keyof Record<string, boolean>]
                            ? "text-[red]"
                            : "text-red-400"
                        } hover:text-[red] active:scale-95 transition-all ease-in-out duration-300 text-5xl cursor-pointer`}
                        onClick={() =>
                          setToDelete({
                            [section]:
                              !toDelete[
                                section as keyof Record<string, boolean>
                              ],
                          })
                        }
                      />
                    </div>
                  )}
                </header>
              </AnimationWrapper>

              <AnimationWrapper>
                <div className="flex w-full">
                  <motion.div className="container">
                    <Timeline
                      section={section}
                      data={
                        (data as AllData)[
                          section as keyof AllData
                        ] as TimelineInterfaceType[]
                      }
                      deleteState={{ toDelete, setToDelete }}
                    />
                  </motion.div>
                </div>
              </AnimationWrapper>
            </section>
          );
        })}
      </article>
    </main>
  );
}
