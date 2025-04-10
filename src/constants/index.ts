export interface Project {
  title: string;
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  spotlightImage: string;
  githubLink: string;
}

export const projects: Project[] = [
  {
    title: "Project 1",
    description: "A brief description of Project 1. This project demonstrates various skills and technologies.",
    tags: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Node.js", color: "#339933" }
    ],
    spotlightImage: "/project1.jpg",
    githubLink: "https://github.com/username/project1"
  },
  {
    title: "Project 2",
    description: "Description of Project 2. Showcases different aspects of web development.",
    tags: [
      { name: "Vue.js", color: "#4FC08D" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Tailwind", color: "#38B2AC" }
    ],
    spotlightImage: "/project2.jpg",
    githubLink: "https://github.com/username/project2"
  },
  {
    title: "Project 3",
    description: "Another amazing project that highlights various technical skills and problem-solving abilities.",
    tags: [
      { name: "Angular", color: "#DD0031" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Express", color: "#000000" }
    ],
    spotlightImage: "/project3.jpg",
    githubLink: "https://github.com/username/project3"
  }
];

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
]; 