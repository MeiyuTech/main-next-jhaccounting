import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FormData, FormStep } from './types'

interface FormState {
  // Form data
  formData: Partial<FormData>
  // Current step
  currentStep: FormStep
  // Draft ID from Supabase
  draftId: string | null
  // Form status
  status: 'draft' | 'completed' | null
  // Loading states
  isLoading: boolean
  isSaving: boolean

  // Actions
  setFormData: (data: Partial<FormData>) => void
  setCurrentStep: (step: FormStep) => void
  setDraftId: (id: string) => void
  setStatus: (status: 'draft' | 'completed' | null) => void

  // Save draft to Supabase
  saveDraft: () => Promise<void>
  // Submit final form
  submitForm: () => Promise<void>
  // Load draft from Supabase
  loadDraft: (draftId: string) => Promise<void>
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      formData: {},
      currentStep: FormStep.CLIENT_INFO,
      draftId: null,
      status: null,
      isLoading: false,
      isSaving: false,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data }
        })),

      setCurrentStep: (step) =>
        set({ currentStep: step }),

      setDraftId: (id) =>
        set({ draftId: id }),

      setStatus: (status) =>
        set({ status }),

      saveDraft: async () => {
        const state = get()
        set({ isSaving: true })

        try {
          // TODO: Implement Supabase save logic
          // If no draftId, create new draft
          // If has draftId, update existing draft

          // Example:
          // const { data, error } = await supabase
          //   .from('fce_forms')
          //   .upsert({
          //     id: state.draftId,
          //     form_data: state.formData,
          //     status: 'draft',
          //     current_step: state.currentStep
          //   })

        } catch (error) {
          console.error('Failed to save draft:', error)
        } finally {
          set({ isSaving: false })
        }
      },

      submitForm: async () => {
        const state = get()
        set({ isLoading: true })

        try {
          // TODO: Implement Supabase submit logic
          // Update status to completed
          // Example:
          // const { data, error } = await supabase
          //   .from('fce_forms')
          //   .update({
          //     status: 'completed',
          //     form_data: state.formData
          //   })
          //   .eq('id', state.draftId)

          set({ status: 'completed' })
        } catch (error) {
          console.error('Failed to submit form:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      loadDraft: async (draftId) => {
        set({ isLoading: true })

        try {
          // TODO: Implement Supabase load logic
          // Example:
          // const { data, error } = await supabase
          //   .from('fce_forms')
          //   .select('*')
          //   .eq('id', draftId)
          //   .single()

          // if (data) {
          //   set({
          //     formData: data.form_data,
          //     currentStep: data.current_step,
          //     status: data.status,
          //     draftId: data.id
          //   })
          // }
        } catch (error) {
          console.error('Failed to load draft:', error)
        } finally {
          set({ isLoading: false })
        }
      }
    }),
    {
      name: 'fce-form-storage',
      // Only persist these fields
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        draftId: state.draftId,
        status: state.status
      })
    }
  )
)