import {
  Home,
  Info,
  BookOpen,
  Mail,
  Video,
  Users,
  User,
  LayoutDashboard,
  Shield,
} from "lucide-react";

// Define all path routes here
export const routes = [
  {
    name: "Home",
    path: "/",
    component: "Home",
    icon: Home,
  },
  {
    name: "Explore",
    path: "/explore",
    component: "Explore",
    icon: Users,
  },
  {
    name: "Meeting",
    path: "/meeting",
    component: "Meeting",
    icon: Video,
  },
  {
    name: "Articles",
    path: "/articles",
    component: "Articles",
    icon: BookOpen,
  },
  {
    name: "About",
    path: "/about",
    component: "About",
    icon: Info,
  },
  {
    name: "Contact Us",
    path: "/contact",
    component: "Contactus",
    icon: Mail,
  },
  {
    name: "Login",
    path: "/login",
    component: "Login",
    icon: User,
  },
  {
    name: "Signup",
    path: "/signup",
    component: "Signup",
    icon: User,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Admin",
    path: "/admin",
    component: "Admin",
    icon: Shield,
  },
];

export const siteConfig = {
  name: "Sophia Circle",
  description: "A philosophical community platform",
  heroVideo: "/assests/hero.mp4",
  logo: "/assests/logo.jpg",
};
