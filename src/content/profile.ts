import { aiWorkflow } from "@/content/ai-workflow";

export const profile = {
  name: "Van AJ Vanguardia",
  title: "AI Product Engineer / Software Engineer.",
  statement:
    "I am an AI product engineer with more than three years of experience building web and mobile applications, from requirements through delivery, with the user’s task guiding each decision. At work I build with React and C# / ASP.NET Core; in my own products I use TypeScript, Next.js, React Native, and Expo.",
  introduction: `I am based in Cebu, Philippines. ${aiWorkflow.profileSummary}`,
  location: "Cebu, Philippines",
  availability: "Open to opportunities",
  email: "vanajvanguardia@gmail.com",
  github: "https://github.com/vn-aj-vngrd",
  linkedin: "https://www.linkedin.com/in/van-aj-vanguardia-a0654a223/",
  philosophy:
    "I start with the user’s task and choose the simplest architecture that can support it. I care about clear interfaces, accessible behavior, performance, documentation, and code that remains easy to test and change. AI tools help me move faster, but I still review the decisions and verify the behavior.",
  education:
    "BS Information Technology, University of San Carlos, Talamban Campus, 2024",
} as const;
