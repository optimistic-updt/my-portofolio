import React, { FC } from "react";

export const SectionHeading: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h3 className="text-3xl">{children}</h3>;
};
