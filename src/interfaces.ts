export interface IContactForm {
  name: string;
  subject: string;
  email: string;
  message: string;
}
export interface IPerson {
  firstName: string;
  lastName: string;
  githubName: string;
  hobbys: string[];
  description: string;
}

export interface IProject {
  id: number;
  name: string;
  image: string;
  tags: string[];
  repo: string;
  url: string;
  description: string;
}
export interface ISkill {
  type: string;
  value: number;
}