import { Home, Info, BookOpen, Mail, Video, Users, Quote } from "lucide-react";

// Define all path routes here
export const routes = [
  {
    name: "Home",
    path: "/",
    component: "Home",
    icon: Home,
  },
  {
    name: "About",
    path: "/about",
    component: "About",
    icon: Info,
  },
  {
    name: "Articles",
    path: "/articles",
    component: "Articles",
    icon: BookOpen,
  },
  {
    name: "Contact Us",
    path: "/contact",
    component: "Contactus",
    icon: Mail,
  },
  {
    name: "Meeting",
    path: "/meeting",
    component: "Meeting",
    icon: Video,
  },
  {
    name: "Philosophers",
    path: "/philosophers",
    component: "Philosophers",
    icon: Users,
  },
  {
    name: "Quotes",
    path: "/quotes",
    component: "Quotes",
    icon: Quote,
  },
];

export const siteConfig = {
  name: "Sophia Circle",
  description: "A philosophical community platform",
  heroVideo: "/assests/hero.mp4",
  logo: "/assests/logo.jpg",
};
