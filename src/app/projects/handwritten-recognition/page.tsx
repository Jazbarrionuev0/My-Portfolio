import Rio from "@/src/components/Code/Rio";
import TagContainer from "@/src/components/TagContainer/TagContainer";
import { Handwritten } from "@/src/utils/projectstags";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Handwritten recognition</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">2-minute read</p>
        <TagContainer tags={Handwritten} />
      </div>
      <p className="my-3">
        I decided to build a handwritten digit recognition model. I wanted to create something that could not only
        recognize digits but also visualize the predictions.
      </p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"https://neopixel.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/result.gif"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />
      <p className="my-3">
        I used TensorFlow which has been my go-to library for machine learning projects. Its flexibility and robustness
        make it perfect for building and deploying machine learning models. But what really stands out is Keras,
        TensorFlow’s API, which simplifies the process of building neural networks.
      </p>
      <p className="my-3">
        In this project, I used the MNIST dataset—a dataset of 70000 images of handwritten digits, each labeled from 0
        to 9. I loaded it directly from TensorFlow’s dataset module.
      </p>
      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        Neural Network
      </h1>
      <p className="my-3">
        The first step is normalizing the dataset by dividing the pixel values by 255.0. This effectively normalizes the
        data to a range between 0 and 1. And then with Keras we build our neural network:
      </p>
      <Rio
        code={`model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation=&apos;relu&apos;),
    tf.keras.layers.Dropout(0.2),  
    tf.keras.layers.Dense(128, activation=&apos;relu&apos;),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation=&apos;softmax&apos;)
])
`}
        language={"python"}
        showLineNumbers={true}
      />
      <p className="my-3">
        Introduce Dropout layers into the model is a good way to avoid overfitting. Dropout randomly disables a fraction
        of the neurons during training, forcing the model to learn more robust features and reducing the risk of
        overfitting.
      </p>
      <p className="my-3">
        To better monitor the model&apos;s performance during training, we can add validation data. This allows us to
        observe how well the model performs on a separate set of data that it hasn&apos;t seen during training,
        providing a more accurate measure of its real world effectiveness.
      </p>
      <Rio
        code={`model.fit(x_train, y_train, epochs=10, validation_data=(x_test, y_test))`}
        language={"python"}
        showLineNumbers={true}
      />
      <p className="my-3">
        In my initial implementation, I trained the model for 10 epochs. It’s enough to allow the model to learn the
        patterns in the data without overfitting. Training for too few epochs can result in an under-fitted model that
        hasn’t learned enough from the data. Conversely, training for too many epochs might lead to overfitting.
      </p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"https://neopixel.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/training.gif"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />
      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">
        Integrating OpenCV for Image Processing and Visualizing with Matplotlib
      </h1>

      <p className="my-3">
        For the prediction part of the project, I needed a way to process new images of handwritten digits. This is
        where OpenCV came in. Then Matplotlib allowed me to display the processed images alongside their predicted
        labels. This step was particularly rewarding because I could see the model in action, recognizing digits just
        like a human would.
      </p>
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"/prediction.png"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />
      <Image
        className="w-full rounded-sm md:p-10 "
        src={"/finalresult.png"}
        alt="Jazmin Barrionuevo"
        width={564}
        height={420}
      />
      <p className="my-3">
        You can find the full project on my github:
        <Link href={"https://github.com/Jazbarrionuev0/Handwritten-recognition"} className="font-semibold">
          Handwritten-recognition
        </Link>
      </p>
    </div>
  );
}
