export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "CMS & E-commerce" | "Tools & Cloud";
  icon: string;
  level?: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "JavaScript", category: "Frontend", icon: "/js1.png" },
  { name: "Tailwind CSS", category: "Frontend", icon: "/Tailwind.png" },
  { name: "HTML5", category: "Frontend", icon: "/html.png" },
  { name: "CSS3", category: "Frontend", icon: "/css.png" },
  { name: "Svelte", category: "Frontend", icon: "/svelte.png" },

  // Backend
  { name: "PHP", category: "Backend", icon: "/php.png" },
  { name: "Laravel", category: "Backend", icon: "/laravel.png" },
  { name: "CodeIgniter", category: "Backend", icon: "/ci.png" },

  // CMS & E-commerce
  { name: "WordPress", category: "CMS & E-commerce", icon: "/wordpress.png" },
  { name: "Shopify", category: "CMS & E-commerce", icon: "/shopify.webp" },

  // Tools & Cloud
  { name: "Firebase", category: "Tools & Cloud", icon: "/firebase.png" },
  { name: "Figma", category: "Tools & Cloud", icon: "/figma.png" },
];
