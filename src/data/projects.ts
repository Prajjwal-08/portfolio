export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "omybills",
    title: "OMyBills (App + API)",
    description:
      "A complete bills management ecosystem: a React Native app for tracking bills, reminders & categories, paired with a secure Node.js API featuring authentication, bill CRUD operations, and organized category endpoints.",
    image: "/omybills.png",
    tags: ["React Native", "Node.js", "Express", "REST API"],
  },
  {
    id: "file-management-system",
    title: "File Management System",
    description:
      "A Laravel solution for secure file handling, user roles, folder management, and administrative controls.",
    image: "/file-mgmt.jpeg",
    tags: ["Laravel", "PHP", "MySQL", "Authentication"],
    github: "https://github.com/Prajjwal-08/File-Management-System",
  },
  {
    id: "king-joinery",
    title: "King Joinery",
    description:
      "A premium joinery and carpentry service website featuring a clean aesthetic, service showcase, and custom-built responsive layouts.",
    image: "/king joinery.png",
    tags: ["Web Design", "Tailwind CSS", "JavaScript", "Responsive"],
  },
  {
    id: "ipl-ecommerce",
    title: "IPL – E-commerce (Customer Panel)",
    description:
      "A Laravel-based e-commerce system where I built the complete customer interface including login, product listing, cart flow, and order management.",
    image: "/IPL.png",
    tags: ["Laravel", "E-Commerce", "MySQL", "Bootstrap"],
  },
  {
    id: "booking-management-system",
    title: "Booking Management System",
    description:
      "A full Laravel scheduling ecosystem featuring meetings, rescheduling, QR-based check-ins, logs, calendars, notifications, and retailer–rep workflows.",
    image: "/booking-management-ssytem.png",
    tags: ["Laravel", "QR Check-in", "APIs", "Workflow"],
  },
  {
    id: "astrology-web",
    title: "Astrology Web",
    description:
      "A WordPress-based astrology platform offering horoscope services, appointment booking, and a modern responsive UI.",
    image: "/astrologer.jpg",
    tags: ["WordPress", "UI/UX", "PHP", "E-Commerce"],
  },
];
