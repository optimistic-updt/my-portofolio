"use client";

import { useForm } from "@tanstack/react-form";
import React, { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BUTTON_COPY = {
  rest: "send message",
  sending: (
    <>
      sending...
      <span
        className="ml-px transform ease-in-out-expo"
        style={{ animation: "bounce 1.2s infinite" }}
      >
        🚀
      </span>
    </>
  ),
  success: (
    <>
      message sent
      <span className="ml-2 transform" style={{ animation: "rock 0.7s 0.5s" }}>
        🤘
      </span>
    </>
  ),
  failure: "failed to send 😢",
} as const;

type ButtonState = keyof typeof BUTTON_COPY;

export const ContactSection: FC = () => {
  const [buttonState, setButtonState] = useState<ButtonState>("rest");

  let timeoutId: NodeJS.Timeout | undefined = undefined;

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      setButtonState("sending");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();

        if (!response.ok) {
          setButtonState("failure");
          // Handle specific error messages
          if (response.status === 429) {
            console.error("Rate limit exceeded. Please try again later.");
          } else if (response.status === 400) {
            console.error(data.error); // Will show validation errors
          } else {
            console.error("Failed to send message:", data.error);
          }
          return;
        }

        console.log("Message sent successfully");

        form.reset();

        setButtonState("success");
        timeoutId = setTimeout(() => {
          setButtonState("rest");
        }, 4000);
      } catch (error) {
        setButtonState("failure");
        console.error("Network error:", error);
      }
    },
  });

  useEffect(
    function cleanTimeout() {
      return () => {
        clearTimeout(timeoutId);
      };
    },
    [timeoutId],
  );

  return (
    <section id="contact" className="px-6 xl:px-0 max-w-5xl mx-auto text-lg">
      <h3 className="text-3xl mb-3 lg:mb-12">Drop me a line</h3>

      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full flex flex-col gap-6 md:justify-between">
            <form.Field
              name="name"
              children={(field) => (
                <>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="rounded-md text-base py-4 px-4 bg-gray-100 focus:outline-none border focus:border-primary w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {/* <FieldInfo field={field} /> */}
                </>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <>
                  <input
                    type="text"
                    placeholder="mark@hello.com"
                    className="rounded-md text-base py-4 px-4 bg-gray-100 focus:outline-none border focus:border-primary w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {/* <FieldInfo field={field} /> */}
                </>
              )}
            />
          </div>

          <form.Field
            name="message"
            children={(field) => (
              <>
                <textarea
                  placeholder="Your Message..."
                  cols={30}
                  rows={5}
                  className="rounded-md text-base py-4 px-4 bg-gray-100 focus:outline-none border focus:border-primary"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* <FieldInfo field={field} /> */}
              </>
            )}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-gradient-to-br from-primary to-secondary rounded-md font-semibold px-4 py-2 uppercase tracking-wide ml-auto overflow-hidden relative w-52 shadow"
          disabled={buttonState === "sending"}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              key={buttonState}
              className="flex w-full justify-center items-center"
            >
              {BUTTON_COPY[buttonState]}
            </motion.span>
          </AnimatePresence>
        </button>
      </form>
    </section>
  );
};
