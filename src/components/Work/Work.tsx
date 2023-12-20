import { Work } from "@/src/types/types";

export default async function Work({ title, position, duration, description }: Work) {
  return (
    <div className="my-12">
      <hr className="mb-12"/>
      <h3 className="font-semibold text-xl">{title}</h3>
      <h4 className="text-gray-600 font-light">{position}, {duration}</h4>
      <p className="mt-8">{description}</p>
    </div>
  )
}