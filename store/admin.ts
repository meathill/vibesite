import type { Submission } from '@/types';
import { create } from 'zustand';

interface AdminState {
  isAuthenticated: boolean;
  submissions: Submission[];
  total: number;
  page: number;
  statusFilter: string;
  isLoading: boolean;
  selectedSubmission: Submission | null;

  setAuthenticated: (value: boolean) => void;
  setSubmissions: (submissions: Submission[], total: number) => void;
  setPage: (page: number) => void;
  setStatusFilter: (status: string) => void;
  setIsLoading: (value: boolean) => void;
  setSelectedSubmission: (submission: Submission | null) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  submissions: [],
  total: 0,
  page: 1,
  statusFilter: '',
  isLoading: false,
  selectedSubmission: null,

  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setSubmissions: (submissions, total) => set({ submissions, total }),
  setPage: (page) => set({ page }),
  setStatusFilter: (status) => set({ statusFilter: status, page: 1 }),
  setIsLoading: (value) => set({ isLoading: value }),
  setSelectedSubmission: (submission) => set({ selectedSubmission: submission }),
}));
