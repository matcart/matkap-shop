import { useStore } from '@/contexts/StoreContext';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from 'react-hook-form';
import { Clock, Store } from 'lucide-react';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: 'card' | 'swish';
}

const Checkout = () => {
  const { state } = useStore();
  const form = useForm<CheckoutFormData>();
  
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const pickingFee = 39.00;
  const reservationFee = 6.40;
  const grandTotal = total + pickingFee + reservationFee;
  const vat = grandTotal * 0.12; // 12% VAT rate

  const handleSubmit = (data: CheckoutFormData) => {
    console.log('Form submitted:', data);
    // TODO: Implement payment processing
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-8">Kassa</h1>
            
            {/* Delivery Section */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-6">1. Leveransinformation</h2>
              
              <div className="flex items-start gap-4 mb-6">
                <Store className="w-6 h-6 mt-1" />
                <div>
                  <div className="font-medium">Hämta i butik</div>
                  <div className="text-gray-600">ICA Nära Näsbydal</div>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-8">
                <Clock className="w-6 h-6 mt-1" />
                <div>
                  <div className="font-medium">Redo för upphämtning om ca 2-24 tim</div>
                  <div className="text-gray-600">Du får ett mail när beställningen är redo</div>
                </div>
              </div>

              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="space-y-6">
                  <h3 className="font-medium mb-4">Kontaktuppgifter</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Förnamn</Label>
                      <Input 
                        id="firstName"
                        {...form.register('firstName', { required: true })}
                        placeholder="Förnamn"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Efternamn</Label>
                      <Input 
                        id="lastName"
                        {...form.register('lastName', { required: true })}
                        placeholder="Efternamn"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-postadress</Label>
                    <Input 
                      id="email"
                      type="email"
                      {...form.register('email', { required: true })}
                      placeholder="E-postadress"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefonnummer</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      {...form.register('phone', { required: true })}
                      placeholder="Telefonnummer"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">2. Betalning</h2>
              
              <RadioGroup defaultValue="card">
                <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Kortbetalning</Label>
                  </div>
                  <div className="flex gap-2">
                    <img src="/assets/payment/mastercard.svg" alt="Mastercard" className="h-6" />
                    <img src="/assets/payment/visa.svg" alt="Visa" className="h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="swish" id="swish" />
                    <Label htmlFor="swish">Swish</Label>
                  </div>
                  <img src="/assets/payment/swish.svg" alt="Swish" className="h-6" />
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Att betala</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Varor ({state.cart.length} st)</span>
                  <span>{total.toFixed(2)} kr</span>
                </div>

                <h3 className="font-medium pt-4">Övriga kostnader</h3>
                
                <div className="flex justify-between">
                  <span>Plockavgift</span>
                  <span>{pickingFee.toFixed(2)} kr</span>
                </div>

                <div className="flex justify-between">
                  <span>Reservation för viktvaror och kassar</span>
                  <span>{reservationFee.toFixed(2)} kr</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Totalt:</span>
                    <span>{grandTotal.toFixed(2)} kr</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Varav moms</span>
                    <span>{vat.toFixed(2)} kr</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-ica-red text-white rounded-full py-3 font-medium mt-4 hover:bg-red-700 transition-colors"
                >
                  Bekräfta och betala
                </button>

                <p className="text-sm text-center text-gray-600 mt-4">
                  Genom att bekräfta beställningen godkänner<br />
                  du ICA Nära Näsbydal Onlines Köpvillkor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;