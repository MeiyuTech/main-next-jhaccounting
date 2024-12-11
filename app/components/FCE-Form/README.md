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

## Supabase Configuration

```sql
-- 主表：FCE申请表
create table fce_applications (
  id uuid primary key default gen_random_uuid(),
  status text not null check (status in ('draft', 'submitted', 'processing', 'completed', 'cancelled')),
  current_step smallint not null default 0,

  -- Client Information
  firm_name text not null,
  street_address text not null,
  street_address2 text,
  city text not null,
  state text not null,
  zip_code text not null,
  phone text not null,
  fax text,
  email text not null,
  purpose text not null,
  purpose_other text,
  country text not null,

  -- Evaluee Information
  pronouns text not null,
  first_name text not null,
  last_name text not null,
  middle_name text,
  date_of_birth date not null,

  -- Service Selection
  service_type jsonb not null, -- 存储复杂的service type选择
  delivery_method text not null,
  additional_services text[], -- 存储选择的额外服务数组
  additional_services_quantity jsonb not null default '{}'::jsonb,

  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  total_price numeric(10,2)
);

-- 教育经历表（一对多关系）
create table fce_educations (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references fce_applications(id) on delete cascade,

  country_of_study text not null,
  degree_obtained text not null,
  school_name text not null,
  study_start_date date not null,
  study_end_date date not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 文件上传表
create table fce_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references fce_applications(id) on delete cascade,

  file_path text not null,
  file_type text not null,
  original_name text not null,
  size_in_bytes bigint not null,

  uploaded_at timestamptz not null default now()
);

-- 审核记录表
create table fce_reviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references fce_applications(id) on delete cascade,

  reviewer_id uuid not null,
  status text not null check (status in ('pending', 'approved', 'rejected')),
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS 策略
alter table fce_applications enable row level security;
alter table fce_educations enable row level security;
alter table fce_documents enable row level security;
alter table fce_reviews enable row level security;

-- 创建索引
create index idx_fce_applications_status on fce_applications(status);
create index idx_fce_applications_email on fce_applications(email);
create index idx_fce_educations_application on fce_educations(application_id);
create index idx_fce_documents_application on fce_documents(application_id);
create index idx_fce_reviews_application on fce_reviews(application_id);
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
