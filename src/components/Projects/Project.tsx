import { Project } from "@/src/types/types"
import Image from "next/image"

export default async function Project({ title, description, image, repoLink, link }: Project) {
    return (
        <div className="flex my-4 bg-gray-100 py-4 rounded-lg">
            <div className="flex justify-center items-center p-8">
                <Image
                    src={image}
                    alt={title}
                    width={200}
                    height={200}
                />
            </div>
            <div>
                <h3 className="font-medium text-lg">{title}</h3>
                <p className="pt-2 pr-6 font-light">{description}</p>
                <div className="flex justify-start">
                    <a href={repoLink} target="blank" className="cursor-pointer">
                        <Image 
                            src={'/github-mark.png'} 
                            alt=""
                            width={40}
                            height={40}
                            className="mt-4 pr-4"
                        />
                    </a>
                    <a href={link} target="blank" className="cursor-pointer">
                        <Image
                            src={'/web.png'}
                            alt=''
                            width={40}
                            height={40}
                            className="mt-4 pr-4"
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

