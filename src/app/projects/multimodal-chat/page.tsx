import Rio from "@/src/components/Code/Rio";
import TagContainer from "@/src/components/TagContainer/TagContainer";
import { MULTIMODAL_CHAT } from "@/src/utils/projectstags";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">RAG Chat with Gemini</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2025</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">5-minute read</p>
        <TagContainer tags={MULTIMODAL_CHAT} />
      </div>
      <div className="bg-gradient-to-r opacity-100 to-indigo-50 border border-portfolio-accent rounded-lg p-6 my-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Try it yourself</h3>
        <a
          href="https://multimodal-chat.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-portfolio-accent text-white font-medium rounded-lg hover:bg-portfolio-accent/90transition-colors duration-200"
        >
          Rag chat
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <p className="my-3">
        I built a comprehensive <span className="font-bold">RAG (Retrieval-Augmented Generation) chat system</span> using Google Gemini and LangChain.
        The application combines document retrieval with AI generation, allowing users to chat with their PDFs, analyze images, and have intelligent
        conversations powered by <span className="italic">Google&aposs latest Gemini 1.5 Flash model</span>.
      </p>
      <video className="w-full rounded-md md:p-10 my-6" width={564}
        height={420} autoPlay muted loop playsInline>
        <source src="/projects/multimodal-chat/RAG.mp4" type="video/mp4" className="rounded-lg" />
        Your browser does not support the video tag.
      </video>

      <p className="my-3">
        The core of the system revolves around <span className="text-green-700">vector embeddings</span> that transform documents into searchable
        representations. When you upload a PDF, the system chunks the text and creates embeddings using Google&aposs embedding model:
      </p>
      <Rio
        code={`def create_vector_store(embeddings, documents):
    if isinstance(documents[0], str):
        docs = [Document(page_content=doc) for doc in documents if doc.strip()]
    else:
        docs = documents
    
    vectorstore = DocArrayInMemorySearch.from_documents(
        docs,
        embedding=embeddings
    )
    
    return vectorstore`}
        language={"python"}
        showLineNumbers={true}
      />

      <p className="my-3">
        <span className="text-green-700">DocArrayInMemorySearch</span> creates a vector database that enables semantic search. When you ask a question,
        the system finds the most relevant document chunks and passes them to Gemini for context-aware responses.
      </p>

      <h1 id="architecture" className="text-2xl font-semibold my-3 text-gray-500">
        Multi-Modal Architecture
      </h1>

      <p className="my-3">
        The application supports three distinct chat modes, each optimized for different use cases. I implemented a flexible architecture using
        Streamlit&aposs session state management and LangChain&aposs modular components to handle various input types seamlessly.
      </p>

      <p className="my-3">Now, there are three main features to focus on:</p>

      <p className="my-3">
        <span className="font-bold">1. RAG Chat Mode: </span>This is where the magic happens. The system processes your documents, creates embeddings,
        and uses a retrieval chain to find relevant context before generating responses. Each answer includes source attribution so you know exactly
        which documents informed the AI&aposs response.
      </p>
      <Rio
        code={`qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=st.session_state.memory,
    return_source_documents=True,
    verbose=True
)

response = qa_chain({"question": prompt})
answer = response["answer"]
source_docs = response.get("source_documents", [])`}
        language={"python"}
        showLineNumbers={true}
      />

      <p className="my-3">
        <span className="font-bold">2. Image Analysis with Gemini Vision: </span>The system can process multiple image formats and analyze them using
        Gemini&aposs vision capabilities. Images are converted to base64 and sent to the model along with your questions, enabling visual understanding
        and detailed analysis.
      </p>
      <Rio
        code={`def process_image_with_gemini(image_file, prompt, vision_llm):
    image = Image.open(image_file)
    
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode()
    
    message = HumanMessage(
        content=[
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{img_base64}"}}
        ]
    )
    
    response = vision_llm.invoke([message])
    return response.content`}
        language={"python"}
        showLineNumbers={true}
      />
      <video className="w-full rounded-md md:p-10 my-6" width={564}
        height={420} autoPlay muted loop playsInline>
        <source src="/projects/multimodal-chat/image.mp4" type="video/mp4" className="rounded-lg" />
        Your browser does not support the video tag.
      </video>

      <p className="my-3">
        <span className="font-bold">3. Intelligent PDF Processing: </span>Large documents are automatically chunked using recursive text splitting
        to maintain context while staying within token limits. The system handles multiple file formats and preserves document structure for better
        retrieval accuracy.
      </p>
      <Rio
        code={`def chunk_text(text, chunk_size=1000, chunk_overlap=200):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
    )
    return text_splitter.split_text(text)`}
        language={"python"}
        showLineNumbers={true}
      />

      <p className="my-3">
        The conversation memory ensures context is maintained across multiple turns, while the modular design allows easy switching between chat modes.
        The entire system is built with privacy considerations, using temporary file handling and session-based state management.
      </p>

      <p className="my-3">
        You can find the full project on my github:{" "}
        <Link href={"https://github.com/Jazbarrionuev0/Multimodal-chat"} className="font-semibold">
          RAG Chat with Gemini{" "}
        </Link>{" "}
      </p>
    </div>
  );
}