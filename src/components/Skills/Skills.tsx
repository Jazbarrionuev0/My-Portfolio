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

const skills = [
  {
    title: "Code",
    tags: programmingTags,
  },
  {
    title: "Web Development",
    tags: webDevelopmentTags,
  },
  {
    title: "Artificial Intelligence",
    tags: artificialIntelligenceTags,
  },
  {
    title: "Database",
    tags: databaseTags,
  },
  {
    title: "DevOps",
    tags: devOpsTags,
  },
  {
    title: "Communication Protocols",
    tags: communicationProtocolsTags,
  },
  {
    title: "Project Management",
    tags: projectManagmentTags,
  },
];

export default async function Skills() {
  return (
    <div className="py-12">
      <ul className="text-black">
        {skills.map((skill) => (
          <li key={skill.title}>
            <h4 className="font-normal">{skill.title}</h4> <TagContainer tags={skill.tags} />
          </li>
        ))}
      </ul>
    </div>
  );
}
