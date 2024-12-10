# FCE Form Component

A multi-step form component for Foreign Credential Evaluation (FCE) applications with state management, validation, and draft saving functionality.

## Features

- Multi-step form wizard with progress indicator
- Form state management with Zustand and persistence
- Form validation with Zod and React Hook Form
- Draft saving functionality
- Real-time price calculation
- Reset functionality with confirmation
- Responsive design
- Accessibility support

## Component Structure

```
FCE-Form/
├── index.tsx           # Main form component
├── StepIndicator.tsx   # Progress indicator component
├── constants.ts        # Form constants and pricing
├── schema.ts          # Zod validation schema
├── store.ts           # Zustand state management
├── types.ts           # TypeScript definitions
├── utils.ts           # Helper functions
└── steps/            # Form step components
    ├── ClientInfo.tsx        # Client information step
    ├── EvalueeInfo.tsx       # Evaluee information step
    ├── ServiceSelection.tsx  # Service selection step
    └── Review.tsx            # Review and submit step
```

## Form Steps

1. **Client Information** (`ClientInfo.tsx`)

   - Company/Individual name
   - Contact information
   - Address details (with country-specific regions)
   - Purpose of evaluation
2. **Evaluee Information** (`EvalueeInfo.tsx`)

   - Personal information
   - Multiple education records
   - Study period details
   - Dynamic education fields
3. **Service Selection** (`ServiceSelection.tsx`)

   - Document Evaluation Services
     - Foreign Credential Evaluation
     - Course-by-course Evaluation
     - Professional Experience Evaluation
     - Position Evaluation
   - Translation Service
   - Delivery options
   - Additional services with quantities
4. **Review** (`Review.tsx`)

   - Summary of all information
   - Price calculation
   - Final submission

## State Management

Using Zustand for form state management with persistence:

```typescript
interface FormState {
  formData: Partial<FormData>
  currentStep: FormStep
  draftId: string | null
  status: 'draft' | 'completed' | null
  isLoading: boolean
  isSaving: boolean

  // Actions
  setFormData: (data: Partial<FormData>) => void
  setCurrentStep: (step: FormStep) => void
  saveDraft: () => Promise<void>
  submitForm: () => Promise<void>
  loadDraft: (draftId: string) => Promise<void>
  resetForm: () => void
}
```

## Usage

```tsx
import FCEForm from "@/app/components/FCE-Form"

export default function FormPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <FCEForm />
      </div>
    </div>
  )
}
```

## Key Features Implementation

### Progress Indicator

- Visual step tracking
- Interactive step navigation
- Validation before step advancement

### Form Validation

- Real-time field validation
- Step-specific validation rules
- Custom validation messages

### Price Calculation

- Real-time price updates
- Multiple service combinations
- Quantity-based calculations

### Data Persistence

- Local storage backup
- Draft saving functionality
- Form reset capability

## TODO

- [ ] Implement form submission API integration
- [ ] Add loading states for async operations
- [ ] Enhance error handling and display
- [ ] Add comprehensive unit tests
- [ ] Implement form data persistence with backend
- [ ] Add form draft auto-saving
- [ ] Implement comprehensive price calculation validation
- [ ] Add print/export functionality for completed forms
- [ ] Implement form data encryption
- [ ] Add form completion progress tracking

## Contributing

When contributing to this component:

1. Ensure all comments are in English
2. Follow the existing code style and patterns
3. Update tests when modifying functionality
4. Update documentation for any changes
5. Test all form steps thoroughly
6. Ensure accessibility standards are maintained

## Dependencies

- React Hook Form
- Zod
- Zustand
- Tailwind CSS
- Shadcn UI Components
- Day.js
- Country-State-City
