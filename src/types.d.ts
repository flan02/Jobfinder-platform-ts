export type typeJob = {
  title: string;
  locationType: string;
  location: string;
  description: string;
  type: string;
  salary: number;
  companyName: string;
  aplicationEmail: string;
  aplicationUrl: string;
  companyLogoUrl: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
  //slug: string;
};

export type typeUser = {
  email: string;
  password: string;
  username: string;
}