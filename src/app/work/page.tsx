import WorkContainer from "@/src/components/WorkContainer/WorkContainer";
import {works} from '@/src/utils/works'

export default async function WorkPage () {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
        <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">My Work</h2>
        <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">Dedicated to creating products that developers love and sharing knowledge with the next generation. 
          Here&lsquo;s a snapshot of my journey.</p>
        <WorkContainer works={works}/>
    </div>
  )
}