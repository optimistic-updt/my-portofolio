"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { useChat } from "@ai-sdk/react";
import { Message, UIMessage } from "ai";

import styles from "./chat.module.css";

const getToolInvocation = (messageParts: UIMessage["parts"]) => {
  let toolCall = messageParts.find((part) => part.type === "tool-invocation");
  return toolCall?.toolInvocation;
};

const mapRoleToLabel = (role: Omit<Message["role"], "data">) => {
  const ROLE_MAP = {
    system: "Kev",
    user: "You",
    assistant: "Assistant",
  };

  return ROLE_MAP[role] || role;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "system-init",
    role: "system",
    content: `Hey, good to see you here. 😊

You might have some specific questions to ask me, So feel free to ask anything you want to this agent here. He will do his best to answer them.

And if there is anything that he doesn't know, he will let me know so I can backfill it the next time.`,
  },
];

export const Chat: FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
  } = useChat({
    maxSteps: 7,
    initialMessages: INITIAL_MESSAGES,
    onResponse: () => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    },
  });

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    // TODO bottom on mobile
    <Drawer.Root direction="right">
      <Drawer.Trigger className="fixed bottom-4 right-4 rounded-full bg-primary size-12 p-3.5 text-white flex items-center justify-center">
        <span className="sr-only">Open Chat</span>
        {/* outline full */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path
    fill="currentColor"
    d="M0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-80-96 0c-35.3 0-64-28.7-64-64L0 64zM192 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm128 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM150.5 238.1c-9.9 8.8-10.7 24-1.9 33.9c26.3 29.4 64.7 48 107.3 48s81-18.6 107.3-48c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-17.6 19.7-43.1 32-71.6 32s-53.9-12.3-71.6-32c-8.8-9.9-24-10.7-33.9-1.9z"
  />
</svg> */}
        {/* outline */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          // className="h-full w-auto"
        >
          <path
            fill="currentColor"
            d="M208 416c0-26.5-21.5-48-48-48l-96 0c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l384 0c8.8 0 16 7.2 16 16l0 288c0 8.8-7.2 16-16 16l-138.7 0c-10.4 0-20.5 3.4-28.8 9.6L208 432l0-16zm-.2 76.2l.2-.2 101.3-76L448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l48 0 48 0 0 48 0 4 0 .3 0 6.4 0 21.3c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L202.7 496l5.1-3.8zM192 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm128 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM150.5 238.1c-9.9 8.8-10.7 24-1.9 33.9c26.3 29.4 64.7 48 107.3 48s81-18.6 107.3-48c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-17.6 19.7-43.1 32-71.6 32s-53.9-12.3-71.6-32c-8.8-9.9-24-10.7-33.9-1.9z"
          />
        </svg>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-0 inset-y-0 fixed z-10 outline-none w-[350px] md:w-96 lg:w-[450px] flex mr-4 py-16"
          // // The gap between the edge of the screen and the drawer is 8px in this case.
          // style={
          //   { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          // }
        >
          <div className="bg-zinc-50 h-full w-full grow flex flex-col rounded-md">
            <header className="flex items-center justify-between mb-3 px-3 pt-3">
              <Drawer.Title className="text-lg">Find Out More</Drawer.Title>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-md size-8 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-300 focus:outline-none flex items-center justify-center duration-100 transition-colors ease-in-out group"
                  onClick={handleClearChat}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClearChat();
                    }
                  }}
                >
                  <span className="sr-only">Clear Chat</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-full w-auto group-hover:-rotate-180 duration-300 transition-transform"
                  >
                    <path
                      fill="currentColor"
                      d="M406.6 202.6c-7.7-21.8-20.2-42.3-37.8-59.8c-62.5-62.5-163.8-62.5-226.3 0L125.5 160l34.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48.3 224c0 0 0 0 0 0l-.4 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 35.2L97.4 97.6c87.5-87.5 229.3-87.5 316.8 0c24.4 24.4 42.1 53.1 52.9 83.7c5.9 16.7-2.9 34.9-19.5 40.8s-34.9-2.9-40.8-19.5zm66.1 86.6c5 1.5 9.8 4.2 13.7 8.2c4 4 6.7 8.9 8.1 14c.3 1.2 .6 2.5 .8 3.8c.3 1.7 .4 3.4 .4 5.1l0 111.6c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-35.1-17.6 17.5c0 0 0 0 0 0c-87.5 87.4-229.3 87.4-316.7 0C73 390 55.3 361.3 44.5 330.6c-5.9-16.7 2.9-34.9 19.5-40.8s34.9 2.9 40.8 19.5c7.7 21.8 20.2 42.3 37.8 59.8c62.5 62.5 163.8 62.5 226.3 0l.1-.1L386.1 352l-34.4 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l111.6 0c1.6 0 3.2 .1 4.8 .3s3.1 .5 4.6 1z"
                    />
                  </svg>
                </button>
                <Drawer.Close className="p-2 rounded-md size-8 hover:bg-zinc-200 focus:bg-zinc-200 active:bg-zinc-300 focus:outline-none flex items-center justify-center duration-100 transition-colors ease-in-out">
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="h-full w-auto"
                  >
                    <path
                      fill="currentColor"
                      d="M640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32zM502.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L402.7 288 32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l370.7 0-73.4-73.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l128 128z"
                    />
                  </svg>
                </Drawer.Close>
              </div>
            </header>

            <Drawer.Description className="sr-only">
              Chat with me
            </Drawer.Description>

            <div
              ref={listRef}
              className="flex flex-col min-h-0 flex-grow overflow-y-auto overflow-x-hidden space-y-4 pb-12 px-3"
            >
              {/* some card */}
              {/* <div className="rounded-lg bg-gray-100 h-24 w-full"></div> */}

              {messages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`whitespace-pre-wrap max-w-[80%] ${
                      message.role === "user"
                        ? "text-right bg-primary ml-auto p-2 rounded-md"
                        : "text-left"
                    }`}
                  >
                    <div className="cursor-text">
                      <div className="font-bold">
                        {mapRoleToLabel(message.role)}
                      </div>
                      {message.content.length > 0 ? (
                        <p>{message.content}</p>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <p className="italic font-light">
                              {"calling tool: " +
                                getToolInvocation(message?.parts)?.toolName}
                            </p>
                            {/* loading spinner */}
                            {getToolInvocation(message?.parts)?.state ===
                            "call" ? (
                              <span className="ml-auto">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="h-4 w-4 animate-spin text-secondary"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M256 116a52 52 0 1 1 0-104 52 52 0 1 1 0 104zm0 364a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM448 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm399.4-96.2A56 56 0 1 1 352.2 80.6a56 56 0 1 1 79.2 79.2zM97.6 414.4a32 32 0 1 1 45.3-45.3A32 32 0 1 1 97.6 414.4zm271.5 0a32 32 0 1 1 45.3-45.3 32 32 0 1 1 -45.3 45.3zM86.3 86.3a48 48 0 1 1 67.9 67.9A48 48 0 1 1 86.3 86.3z"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* this is the loading state */}
              {status === "submitted" ? (
                <div
                  className={`flex items-center mx-auto justify-center opacity-90 size-5 transform`}
                  style={{
                    animation: `${styles.fly} 1.7s linear infinite`,
                  }}
                >
                  <span className="sr-only">loading...</span>
                  {/* plane from top - outline */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M133.9 232L65.8 95.9 383.4 232l-249.5 0zm0 48l249.5 0L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z" />
                  </svg>
                </div>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border border-gray-300 rounded-md w-full resize-none focus-within:border-primary flex flex-col"
            >
              <textarea
                className="resize-none focus:outline-none bg-zinc-50"
                value={input}
                placeholder="What do you want to ask?"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                autoFocus
                rows={1}
                style={{
                  minHeight: "1.5rem",
                  maxHeight: "7.5rem",
                  overflowY: "auto",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 120) + "px";
                }}
              />

              <button
                type="submit"
                className="ml-auto items-center justify-center bg-secondary hover:bg-secondary/80 rounded-full p-3 inline-flex size-10 text-white"
              >
                <span className="sr-only">Send</span>
                {/* TODO need to come from the bottom on arrival */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className={`duration-200 ease-in-circ ${
                    status === "submitted"
                      ? "translate-x-6 -translate-y-6 opacity-80"
                      : "translate-x-0 -translate-y-0 opacity-100"
                  }`}
                >
                  <path
                    fill="currentColor"
                    d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
