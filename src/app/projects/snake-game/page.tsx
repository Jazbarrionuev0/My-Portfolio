import Rio from "@/src/components/Code/Rio";
import TagContainer from "@/src/components/TagContainer/TagContainer";
import { SnakeGame } from "@/src/utils/projectstags";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Snake Game</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">3-minute read</p>
        <TagContainer tags={SnakeGame} />
      </div>
      <p className="my-3">
        So, I decided to make the <span className="font-bold">Snake Game</span>, but with a twist—I’m using hand tracking to control it! I’m working
        with the <span className="italic">cvzone.HandTrackingModule.HandDetector</span> class, which lets me detect hand landmarks like the tip of
        your index finger.
      </p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/completegame.gif"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />

      <p className="my-3">
        Basically, <span className="text-green-700">lmList</span> is a list of landmarks (points) on the hand. Each landmark is represented by a list
        or tuple containing the x and y coordinates, and sometimes the z coordinate (which represents depth):
      </p>
      <Rio
        code={`LIST [[248, 674, 0], [320, 623, -44], [368, 526, -58], [385, 437, -67], [409, 370, -76],
       [303, 432, -28], [316, 338, -56], [326, 277, -81], [336, 224, -99], [249, 424, -25],
        [242, 321, -51], [239, 249, -75], [240, 187, -92], [201, 438, -29], [194, 338, -60], 
        [194, 269, -83], [196, 212, -97], [156, 471, -37], [127, 400, -69], [108, 348, -86], [94, 301, -95]]`}
        language={"python"}
        showLineNumbers={false}
      />

      <p className="my-3">
        <span className="text-green-700">lmList[8]</span> accesses the landmark point for the tip of the index finger (landmark 8). This is where I
        drew a filled circle on the image at the pointIndex coordinates.
      </p>
      <Image className="w-full rounded-sm md:p-10 " src={"/projects/snake-game/landmark.png"} alt="Jazmin Barrionuevo" width={564} height={420} />
      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        Code structure
      </h1>

      <p className="my-3">
        I&apos;m building the game with a class structure, where I&apos;ve grouped all the game elements into a single class. This method makes sense
        because the game has a lot of interconnected parts and variables. Using functions alone would be too complicated, especially with the number
        of parameters that would need to be managed.
      </p>
      <Image className="w-full rounded-sm md:p-10 " src={"/projects/snake-game/structure.png"} alt="Jazmin Barrionuevo" width={564} height={420} />

      <p className="my-3">Now, there are three main things to focus on:</p>
      <p className="my-3">
        <span className="font-bold">1. Snake Growth: </span>First, I&apos;ve set a specific total length for the snake. The snake will only grow when
        it consumes food, adding segments as it eats. This mechanic keeps the game challenging, as the snake becomes harder to maneuver the longer it
        gets.
      </p>
      <Rio
        code={`if self.currentLength > self.allowedLength:
   for i, length in enumerate(self.lengths):
       self.currentLength -= length
       self.lengths.pop(i)
       self.points.pop(i)

       if self.currentLength < self.allowedLength:
           break`}
        language={"python"}
        showLineNumbers={true}
      />

      <p className="my-3">
        <span className="font-bold">2. Random Food Generation: </span>The food isn&apos;t just placed anywhere—it&apos;s generated at a random
        location each time. When the snake eats the food, it disappears and immediately reappears in a new random spot, keeping the game unpredictable
        and engaging.
      </p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/randomapple.gif"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />

      <p className="my-3">
        <span className="font-bold">3. Collision Detection: </span> To make sure the snake doesn&apos;t run into itself, I’m using OpenCV’s
        pointPolygonTest() function. This function checks if any part of the snake’s body collides with the polygon formed by its own body. It’s a
        crucial part of the game that adds an extra layer of difficulty, especially as the snake grows longer.
      </p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/collision.gif"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />
      <p className="my-3">
        You can find the full project on my github:{" "}
        <Link href={"https://github.com/Jazbarrionuev0/Snake-Game-CV"} className="font-semibold">
          Snake Game{" "}
        </Link>{" "}
      </p>
    </div>
  );
}
