import TagContainer from "@/src/components/TagContainer/TagContainer";
import { Neopixel } from "@/src/utils/projectstags";
import Image from "next/image";

export default async function Home() {
    return (
        <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12 text-justify">
            <h2 className="font-normal text-center text-7xl min-h-28">Restaurant Managament</h2>
            <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
            <div className="">
                <p className="mb-3 text-sm text-right ">3-minute read</p>
                <TagContainer tags={Neopixel} />

            </div>
            <p className="my-3">In collaboration with a colleague, I embarked on a project requested by a potential client to develop a comprehensive digital menu and website for their restaurant. This project evolved into a full-fledged restaurant management system, including an administrative app.</p>

            <h1 id="sorting" className="text-2xl font-bold my-3 text-gray-500">Key Features and Practices</h1>
            <Image className="my-10 rounded-sm " src={"/bestpractices.png"} alt="Jazmin Barrionuevo" width={674} height={420} />

            <h1 id="sorting" className="text-2xl font-bold my-3 ">Best Practices Implementation</h1>
            <ol className="flex flex-col gap-3">
                <li > <span className=" font-bold">Clean Infrastructure:</span> We ensured a scalable and maintainable architecture using RESTful APIs, microservices, and containerization (Docker and Kubernetes).</li>
                <Image className="my-10 rounded-sm " src={"/kubernetes.png"} alt="Jazmin Barrionuevo" width={674} height={420} />

                <li > <span className=" font-bold">Comprehensive Pipeline:</span> Established a CI/CD pipeline with GitHub Actions to automate testing and deployment. This included automated unit tests (Jest) and integration tests to ensure reliability and code quality.</li>
                <Image className="my-10 rounded-sm " src={"/pipeline.png"} alt="Jazmin Barrionuevo" width={674} height={420} />

            </ol>

            <h1 id="sorting" className="text-2xl font-bold my-3 ">Agile Project Management</h1>
            <Image className="my-10 rounded-sm " src={"/jira.png"} alt="Jazmin Barrionuevo" width={674} height={420} />

            <ol className="flex flex-col gap-3">

                <li > <span className=" font-bold">Iterative Development:</span>  We adopted Scrum methodology, conducting regular sprints and stand-up meetings to facilitate continuous improvement and adaptability.</li>

                <li > <span className=" font-bold">Phased Implementation:</span> We decided to divide the project into clear phases – development, implementation, and production. This allowed for focused progress tracking and timely delivery.</li>

                <li > <span className=" font-bold">Collaboration and Feedback:</span> Also engaged in regular feedback loops with the client to ensure the final product met their needs and expectations.</li>
            </ol>

            <h1 id="sorting" className="text-2xl font-bold my-3 ">UX/UI design</h1>
            <p className="my-3">In our project, we placed a strong emphasis on delivering an exceptional user experience for both the end-users of the digital menu app and the administrators of the back-office system. Our design process prioritized intuitive navigation, clean and aesthetically pleasing interfaces, and responsive design to ensure seamless usability across all devices. For the digital menu, we focused on making the browsing and ordering process effortless and engaging for customers. Meanwhile, the back-office interface was crafted with user-friendly controls and comprehensive features, enabling restaurant staff to efficiently manage and update menu items, monitor orders, and gain insights through analytics. This dual focus on UX/UI ensured that both customers and administrators benefited from a smooth, efficient, and enjoyable experience.</p>
            <Image className="my-10 rounded-sm " src={"/figma.png"} alt="Jazmin Barrionuevo" width={674} height={420} />


            <p className="my-3">The digital menu and management system significantly enhanced the restaurant&apos;s operations, providing an intuitive user experience for both customers and staff. The project demonstrated our capability to deliver robust, high-quality software solutions tailored to client requirements.</p>
        </div>
    );
}
