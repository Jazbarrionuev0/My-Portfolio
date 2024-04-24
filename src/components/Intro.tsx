import React from "react";

type Props = {
  title: string;
  description: string;
};

function Intro({ title, description }: Props) {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-6xl min-h-28">{title}</h2>
      <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">{description}</p>
    </div>
  );
}

export default Intro;
