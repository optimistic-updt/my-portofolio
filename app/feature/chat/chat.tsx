"use client";

import { FC } from "react";
import { Drawer } from "vaul";
import { useChat } from "@ai-sdk/react";

export const Chat: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

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

            <div className="space-y-4 px-6">
              {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                  <div>
                    <div className="font-bold">{m.role}</div>
                    <p>{m.content}</p>
                  </div>
                </div>
              ))}
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
