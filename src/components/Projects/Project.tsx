"use client";
import { Project as ProjectType } from "@/src/types/types";
import Image from "next/image";
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Project({ title, description, image, repoLink, link }: ProjectType) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  return (
    <Link href={link}>
      <div className="w-screen md:w-[260px]">
        <div
          className="flex my-4 transition duration-300 mx-4 md:mx-0 md:w-[260px] h-[320px]  rounded-lg cursor-pointer relative hover:scale-105 bg-black"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <Image className="inset-0 w-full h-full object-cover rounded-lg opacity-65" src={image} alt="Jazmin Barrionuevo" layout="fill" />
          <Card className="w-full h-full absolute top-0 left-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-white font-normal">{title}</CardTitle>
            </CardHeader>
            {isHovered && (
              <CardContent className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
                <CardDescription className="text-white text-lg">{description}</CardDescription>
              </CardContent>
            )}
            <CardFooter className="absolute bottom-0 right-0">
              <ArrowRight className="text-white " />
            </CardFooter>
          </Card>
        </div>
      </div>
    </Link>
  );
}
