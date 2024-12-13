import { CheckoutForm } from "@/app/[locale]/(fce-form)/components/CheckoutForm"

const CheckoutPage = () => {
  // Here you would be getting the basked etc.
  // We're hard-coding the oruce for simplicity
  const priceId = 'price_1QVKKcJMcR2XIhynAkrlH1jl'

  return (
    <main>
      <div className="max-w-screen-lg mx-auto my-8">
        <CheckoutForm priceId={priceId} />
      </div>
    </main>
  )
}

export default CheckoutPage
