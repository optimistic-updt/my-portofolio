"use client";

import { FC } from "react";
import { Drawer } from "vaul";
import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";

const getToolInvocation = (messageParts: UIMessage["parts"]) => {
  let toolCall = messageParts.find((part) => part.type === "tool-invocation");
  return toolCall?.toolInvocation;
};

export const Chat: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3, //TODO???
  });

  return (
    // TODO bottom on mobile
    <Drawer.Root direction="right" open>
      <Drawer.Trigger className="fixed bottom-4 right-4 bg-red rounded-full bg-primary size-12 p-2 flex items-center justify-center">
        <span className="sr-only">Open Chat</span>
        {/* TODO - icon */}
        Open
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-0 inset-y-0 fixed z-10 outline-none w-[350px] flex"
          // // The gap between the edge of the screen and the drawer is 8px in this case.
          // style={
          //   { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          // }
        >
          <div className="bg-zinc-50 h-full w-full grow flex flex-col rounded-md ">
            <header className="flex items-center justify-between px-6 pt-6">
              <Drawer.Title>Let&apos;s Chat</Drawer.Title>

              <Drawer.Close className="p-1 rounded-md hover:bg-zinc-200">
                <span className="sr-only">Close</span>
                {/* TODO - icon */}
                Close
              </Drawer.Close>
            </header>

            <Drawer.Description className="sr-only">
              Chat with me
            </Drawer.Description>

            <div className="flex flex-col min-h-0 flex-grow overflow-auto space-y-4 px-6 pb-12">
              {messages.map((message) => {
                console.log("message", message);
                return (
                  <div key={message.id} className="whitespace-pre-wrap">
                    <div>
                      <div className="font-bold">{message.role}</div>
                      {message.content.length > 0 ? (
                        <p>{message.content}</p>
                      ) : (
                        <>
                          <p className="italic font-light">
                            {"calling tool: " +
                              getToolInvocation(message?.parts)?.toolName}
                          </p>
                          <p className="italic font-light">
                            {"result: " +
                              getToolInvocation(message?.parts)?.state}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="">
              <input
                className="fixed bottom-0 grow w-full p-2 border border-gray-300 rounded-md inline-block"
                value={input}
                placeholder="Say something..."
                onChange={handleInputChange}
              />
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
