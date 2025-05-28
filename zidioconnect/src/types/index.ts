export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  course: string;
  year: string;
  avatar?: string;
}

export interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Pending';
  date: string;
  description?: string;
  requirements?: string[];
  location?: string;
  salary?: string;
}

export interface JobListing {
  id: number;
  company: string;
  position: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  postedDate: string;
  deadline: string;
}

export interface ApplicationStats {
  total: number;
  shortlisted: number;
  pending: number;
  rejected: number;
} 