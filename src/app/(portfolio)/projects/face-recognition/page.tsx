import Rio from "@/src/components/Code/Rio";
import TagContainer from "@/src/components/TagContainer/TagContainer";
import { FaceRecognition, SnakeGame } from "@/src/utils/projectstags";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Face Recognition</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">3-minute read</p>
        <TagContainer tags={FaceRecognition} />
      </div>
      <p className="my-3">In this project, I built a simple real-time face recognition system using Python, OpenCV, and DeepFace.</p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/face.gif"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />

      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        {" "}
        Grabbing Video from Your Webcam
      </h1>

      <p className="my-3">
        First , I use OpenCV to access the webcam and start capturing video. OpenCV makes it easy to grab frames (basically, single images) from the
        live feed and process them one by one.
      </p>
      <Rio code={`cap = cv2.VideoCapture(0)`} language={"python"} showLineNumbers={false} />

      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        {" "}
        Checking for a Face Match
      </h1>

      <p className="my-3">
        I&apos;ve got a reference image (the face I&apos;m trying to match), and every now and then (around once per second), DeepFace compares the
        current frame to that reference. DeepFace uses a pre-trained VGG-Face model to determine if the face in the video matches the one in the
        reference image.
      </p>
      <Rio
        code={`reference_img = cv2.imread("reference.jpg")  

def check_face(frame):
    global face_match
    try:
        if DeepFace.verify(frame, reference_img)['verified']:
            face_match = True
        else:
            face_match = False
    except:
        face_match = False`}
        language={"python"}
        showLineNumbers={true}
      />

      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        {" "}
        Keeping It Fast with Threads
      </h1>

      <p className="my-3">
        Running face recognition on each frame can slow things down, so I use threading to run the face-checking part separately. This way, the video
        feed keeps running smoothly while the face verification happens in the background.
      </p>
      <Rio
        code={`counter = 0
face_match = False

while True:
    ret, frame = cap.read()
    if ret:
        if counter % 30 == 0:
            threading.Thread(target=check_face, args=(frame.copy(),)).start()
        counter += 1`}
        language={"python"}
        showLineNumbers={true}
      />

      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        {" "}
        Showing the Results
      </h1>

      <p className="my-3">
        First , I use OpenCV to access the webcam and start capturing video. OpenCV makes it easy to grab frames (basically, single images) from the
        live feed and process them one by one.
      </p>
      <Rio
        code={`if face_match:
    cv2.putText(frame, "MATCH", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)
else:
    cv2.putText(frame, "NO MATCH", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 3)

cv2.imshow("video", frame)`}
        language={"python"}
        showLineNumbers={true}
      />

      <p className="my-3">
        You can find the full project on my github:{" "}
        <Link href={"https://github.com/Jazbarrionuev0/FaceRecognition"} className="font-semibold">
          Face recognition
        </Link>{" "}
      </p>
    </div>
  );
}
