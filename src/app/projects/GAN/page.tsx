import TagContainer from "@/src/components/TagContainer/TagContainer";
import { GAN } from "@/src/utils/projectstags";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Generative Adversarial Neural Network </h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">3-minute read</p>
        <TagContainer tags={GAN} />

      </div>


      <p className="my-3">This might be one of my favorite machine learning algorithms: the Generative Adversarial Network (GAN). It involves two AI models competing against each other, allowing the GAN to effectively supervise itself.</p>
      <p className="my-3">It consists of two submodels: a generator and a discriminator. The generator creates fake samples, while the discriminator determines whether these samples are fake or real.</p>
      <p className="my-3">The discriminator will receive an input and attempt to produce binary classification values (0 or 1) to decide whether the image is real or fake. The generator will take random inputs to create an image, while the discriminator will evaluate both the generated images and possibly some real images to determine whether they are fake.</p>
      <p className="my-3">The key distinction with a conditional GAN is that it provides more control over the output, allowing you to specify the type of image you want to generate. In contrast, with this type of GAN, you are simply generating random images from your sample population without any specific control over the image type.</p>
      <h1 id="sorting" className="text-2xl font-semibold my-3 text-gray-500">How do these algorithms work?</h1>

      <p className="my-3">First, we&apos;ll train our generator to produce highly convincing fake images of clothing. To achieve this, we need to train our discriminator model to accurately recognize what real clothing looks like in pictures. Once the discriminator becomes proficient at identifying real clothes, we will introduce non-clothing shapes to ensure it correctly classifies them as not being clothes.</p>
      <p className="my-3">At this point, the generator will take a random input vector (like a t-shirt) and use it to generate its own fake t-shirt image. This image is then passed to the discriminator, which must decide whether the image is real or fake.</p>
      <p className="my-3">The result of this decision is shared with both the generator and the discriminator, and they adjust their behavior accordingly based on the feedback.</p>
      <p className="my-3">Here, our generator starts with a set of 128 random values and outputs a matrix (image) with the shape of 28 by 28 by 1. </p>
      <Image className="w-full rounded-sm md:p-10 " src={"/matrix.png"} alt="Jazmin Barrionuevo" width={564} height={420} />

      <p className="my-3">Conversely, our discriminator performs the opposite task. It takes the generator&apos;s output—an image with the shape of 28 by 28 by 1—and produces a single value between zero and one to determine whether the image is real or fake.</p>
      <Image className="w-full rounded-sm md:p-16" src={"/nn.png"} alt="Jazmin Barrionuevo" width={564} height={420} />

      <p className="my-3">At the start, the images produced by the generator don&apos;t look great, as you can see here. However, after training, the generator will improve significantly, eventually creating more accurate and realistic visualizations of fashion items.</p>
      <Image className="w-full rounded-sm md:p-10" src={"/images.png"} alt="Jazmin Barrionuevo" width={564} height={420} />


      <p className="my-3">Training GANs can be challenging because you need to strike a balance between how quickly the discriminator learns and how fast the generator improves.</p>

      <p className="my-3">You can see d_loss and g_loss balancing, we don&apos;t want one to decrease  and the other one to increase really fast. We want them to stay steady and stable over the long term. </p>
      <Image className="w-full rounded-sm md:p-10" src={"/loss.png"} alt="Jazmin Barrionuevo" width={564} height={420} />


      <p className="my-3">Using pyplot, I can evaluate the performance of my trained model. The plot shows the loss trends for both the discriminator (d_loss) and the generator (g_loss). The fluctuation in loss values is expected, especially in the early stages of training. The generator&apos;s loss shows a gradual stabilization over time, while the discriminator&apos;s loss remains more volatile. This indicates that the generator is learning to create more realistic data, making it progressively harder for the discriminator to differentiate between real and fake data. This balance is crucial for the model&apos;s overall performance.</p>

      <Image className="w-full rounded-sm md:p-10" src={"/plot.png"} alt="Jazmin Barrionuevo" width={564} height={420} />

      <p className="my-3">Because we would need around 2000 epochs to train the model properly, I used a pretrained model to generate the images. </p>

      <h1 id="sorting" className="text-xl font-bold my-3 ">20 epochs:</h1>
      <Image className="w-full rounded-sm md:p-10" src={"/20epocs.png"} alt="Jazmin Barrionuevo" width={564} height={420} />

      <h1 id="sorting" className="text-xl font-bold my-3 ">2000 epochs: </h1>
      <Image className="w-full rounded-sm md:p-10 " src={"/2000epocs.png"} alt="Jazmin Barrionuevo" width={564} height={420} />



    </div>
  );
}
