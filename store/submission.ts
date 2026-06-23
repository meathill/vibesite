import { create } from 'zustand';

interface SubmissionFormState {
  projectName: string;
  contact: string;
  description: string;
  intent: string;
  file: File | null;
  isSubmitting: boolean;
  error: string | null;

  setProjectName: (value: string) => void;
  setContact: (value: string) => void;
  setDescription: (value: string) => void;
  setIntent: (value: string) => void;
  setFile: (file: File | null) => void;
  setIsSubmitting: (value: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  projectName: '',
  contact: '',
  description: '',
  intent: '',
  file: null as File | null,
  isSubmitting: false,
  error: null as string | null,
};

export const useSubmissionFormStore = create<SubmissionFormState>((set) => ({
  ...initialState,

  setProjectName: (value) => set({ projectName: value }),
  setContact: (value) => set({ contact: value }),
  setDescription: (value) => set({ description: value }),
  setIntent: (value) => set({ intent: value }),
  setFile: (file) => set({ file }),
  setIsSubmitting: (value) => set({ isSubmitting: value }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
