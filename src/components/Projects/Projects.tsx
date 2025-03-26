import Project, { ProjectProps } from "./Project";
import "./Projects.css";

/**
 * TODO: replace each `websiteHref`, `imgSrc`, `title`, and `description`
 * with your project information.
 */
const projects: ProjectProps[] = [
  // Project 1
  {
    websiteHref: "https://github.com/evelynkwan/appeasement",
    imgSrc: "/images/projects/project1.jpeg",
    title: "Appeasement",
    description:
      "A Pokemon style RPG with an audience appeasement system and randomly generated turn based fights with upgrades along the way",
  },
  // Project 2
  {
    websiteHref: "https://github.com/evelynkwan/betterbikepath.github.io",
    imgSrc: "/images/projects/project2.jpeg",
    title: "Get-A-Way",
    description:
      "Get-A-Way is a web application designed to create safer bike routes by avoiding hazardous areas",
  },
];

/**
 * `Projects` returns a list of `Project` components,
 * defined in the following component. Be sure to replace
 * all of the information in this file (do not edit `Project.tsx`
 * only edit the list of `projects` above).
 */
export default function Projects() {
  return (
    <>
      <h2 id="projects">Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <Project
            key={index}
            websiteHref={project.websiteHref}
            imgSrc={project.imgSrc}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </>
  );
}
