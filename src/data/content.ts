import portfolioDetails from "../../portfolio-details.json"

export type SkillCategory = keyof typeof portfolioDetails.skills

export const SKILLS_DATA = portfolioDetails.skills
export const PROJECTS_DATA = portfolioDetails.projects
export const ABOUT_CONTENT = portfolioDetails.about
