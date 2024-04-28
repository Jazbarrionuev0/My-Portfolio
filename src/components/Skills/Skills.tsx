import {
  communicationProtocolsTags,
  databaseTags,
  devOpsTags,
  artificialIntelligenceTags,
  programmingTags,
  projectManagmentTags,
  webDevelopmentTags,
  testingTags,
} from "@/src/utils/tags";
import TagContainer from "../TagContainer/TagContainer";

export default async function Skills() {
  return (
    <div className="py-12">
      <ul className="text-black">
        <li>
          <h4 className="font-normal">Code</h4> <TagContainer tags={programmingTags} />
        </li>
        <li>
          <h4 className="font-normal">Web Development</h4> <TagContainer tags={webDevelopmentTags} />
        </li>
        <li>
          <h4 className="font-normal">Artificial Intelligence</h4> <TagContainer tags={artificialIntelligenceTags} />
        </li>
        <li>
          <h4 className="font-normal">Database</h4> <TagContainer tags={databaseTags} />
        </li>
        <li>
          <h4 className="font-normal">Testing</h4> <TagContainer tags={testingTags} />
        </li>
        <li>
          <h4 className="font-normal">DevOps</h4> <TagContainer tags={devOpsTags} />
        </li>
        <li>
          <h4 className="font-normal">Communication Protocols</h4> <TagContainer tags={communicationProtocolsTags} />
        </li>
        <li>
          <h4 className="font-normal">Project Management</h4> <TagContainer tags={projectManagmentTags} />
        </li>
      </ul>
    </div>
  );
}
