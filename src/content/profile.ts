import { aiWorkflow } from "@/content/ai-workflow";

export const profile = {
  name: "Van AJ Vanguardia",
  title: "Product-driven full-stack developer.",
  statement:
    "For more than three years, I have built and maintained web and mobile applications, prioritizing user experience from requirements through delivery. My work centers on React and C# / ASP.NET Core, alongside personal products in the TypeScript ecosystem with Next.js, React Native, and Expo.",
  introduction:
    `I am based in Cebu, Philippines. ${aiWorkflow.profileSummary}`,
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
