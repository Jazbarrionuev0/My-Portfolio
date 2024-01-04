import { Work } from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";
export default async function Work({ title, position, duration, description, link }: Work) {
  return (
    <div className="my-12">
      <hr className="mb-12"/>
      <div className="flex items-center">
        <h3 className="font-semibold text-xl">{title}</h3> 
        <Link href={link ?? ''} target="blank" className="ml-2">
          <Image src={'/web.png'} alt={title} width={20} height={20}/>
        </Link>
      </div>
      <h4 className="text-gray-600 font-light">{position}, {duration}</h4>
      <p className="mt-8">{description}</p>
    </div>
  )
}