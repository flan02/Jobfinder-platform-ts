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
  companyLogoUrL: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type typeUser = {
  email: string;
  password: string;
  username: string;
}