export interface TimelineItem {
  title: string;
  organization: string;
  description: string;
  period: string;
  type: "education" | "experience";
}

export const education: TimelineItem[] = [
  {
    title: "Masters in Computer Application (MCA)",
    organization: "Manipal University",
    description: "Post Graduation in Computer Applications and advanced software systems.",
    period: "2023 - 2025",
    type: "education",
  },
  {
    title: "Bachelors in Computer Application (BCA)",
    organization: "JECRC University",
    description: "Specialisation in Data Science, full-stack software development, and databases.",
    period: "2021 - 2023",
    type: "education",
  },
  {
    title: "Senior Secondary (12th)",
    organization: "Vidyasthali Public School",
    description: "Commerce stream with strong mathematical and analytical foundation.",
    period: "2019 - 2020",
    type: "education",
  },
];

export const experience: TimelineItem[] = [
  {
    title: "Full Stack Developer",
    organization: "Programmates Pvt Ltd",
    description:
      "Developing high-performance, dynamic web platforms, custom APIs, and e-commerce solutions with PHP, Laravel, CodeIgniter, WordPress, and Shopify.",
    period: "Aug, 2023 - Present",
    type: "experience",
  },
  {
    title: "Web Developer Intern",
    organization: "TensaX Innovation Lab",
    description:
      "Engineered reactive frontend interfaces and dynamic user experiences leveraging Svelte, JavaScript, and Tailwind CSS.",
    period: "Jan, 2023 - Jun, 2023",
    type: "experience",
  },
];
