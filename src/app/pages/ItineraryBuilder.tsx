import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Cloud,
  MapPin,
  Calendar,
  Wallet,
  Compass,
} from 'lucide-react';
import NimnimLoader from '../components/shared/NimnimLoader';

type TravelStyle = 'adventure' | 'relaxing' | 'culture';
type BudgetTier = 'backpacker' | 'mid-range' | 'luxury';

const TOTAL_STEPS = 4;

export default function ItineraryBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    duration: '',
    budget: '' as BudgetTier | '',
    travelStyle: '' as TravelStyle | '',
  });

  const destinations = [
    'Palawan', 'Boracay', 'Siargao', 'Cebu', 'Baguio', 'Vigan',
    'Manila', 'Batanes', 'Bohol', 'Davao', 'Ilocos Norte', 'Sagada',
  ];

  const budgetTiers: { id: BudgetTier; name: string; range: string; description: string; icon: string }[] = [
    { id: 'backpacker', name: 'Backpacker', range: '₱1,000 – ₱2,500 / day', description: 'Hostels, street food, public transport', icon: '🎒' },
    { id: 'mid-range', name: 'Mid-range', range: '₱2,500 – ₱6,000 / day', description: 'Hotels, restaurants, guided tours', icon: '🏨' },
    { id: 'luxury', name: 'Luxury', range: '₱6,000+ / day', description: 'Resorts, fine dining, private transfers', icon: '✨' },
  ];

  const travelStyles: { id: TravelStyle; name: string; icon: string; description: string }[] = [
    { id: 'adventure', name: 'Adventure', icon: '🏔️', description: 'Hiking, diving, island hopping, thrills' },
    { id: 'relaxing', name: 'Relaxing', icon: '🏖️', description: 'Beach resorts, spas, slow mornings' },
    { id: 'culture', name: 'Culture', icon: '🏛️', description: 'Heritage sites, local food, traditions' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/itinerary/3');
    }, 3000);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.destination !== '';
      case 2: return formData.startDate !== '' && formData.duration !== '';
      case 3: return formData.budget !== '';
      case 4: return formData.travelStyle !== '';
      default: return false;
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <NimnimLoader message="Creating your perfect Philippine adventure..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream">
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => step === 1 ? navigate('/dashboard') : setStep(step - 1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-primary-sage rounded-2xl flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Cloud className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <p className="text-sm text-muted-foreground">Planning with</p>
                <p className="font-medium">Nimnim</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
            <span className="text-sm text-primary">{Math.round((step / TOTAL_STEPS) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-bg-mint rounded-full h-2">
            <div
              className="bg-primary-forest h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <MapPin className="w-16 h-16 text-primary-forest mx-auto mb-4" />
                <h2 className="text-3xl mb-2">Where do you want to go?</h2>
                <p className="text-muted-foreground">Choose your dream destination in the Philippines</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => setFormData({ ...formData, destination: dest })}
                    className={`p-6 rounded-2xl border-2 transition-all shadow-sm ${
                      formData.destination === dest
                        ? 'border-primary-forest bg-primary-forest/5 shadow-md'
                        : 'border-border bg-white hover:border-primary-sage'
                    }`}
                  >
                    <p className="text-lg">{dest}</p>
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <label className="block mb-2">Or search a destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter city or province..."
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <Calendar className="w-16 h-16 text-primary-forest mx-auto mb-4" />
                <h2 className="text-3xl mb-2">When are you going?</h2>
                <p className="text-muted-foreground">Pick your start date and trip length</p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm space-y-6">
                <div>
                  <label className="block mb-3">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block mb-3">Duration</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['2 Days', '3 Days', '5 Days', '1 Week', '2 Weeks'].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setFormData({ ...formData, duration })}
                        className={`py-3 rounded-xl border-2 transition-all ${
                          formData.duration === duration
                            ? 'border-primary-forest bg-primary-forest/5'
                            : 'border-border hover:border-primary-sage'
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <Wallet className="w-16 h-16 text-primary-forest mx-auto mb-4" />
                <h2 className="text-3xl mb-2">What's your budget?</h2>
                <p className="text-muted-foreground">Choose a tier — Nimnim will tailor costs accordingly</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setFormData({ ...formData, budget: tier.id })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left shadow-sm ${
                      formData.budget === tier.id
                        ? 'border-primary-forest bg-primary-forest/5 shadow-md'
                        : 'border-border bg-white hover:border-primary-sage'
                    }`}
                  >
                    <div className="text-4xl mb-2">{tier.icon}</div>
                    <h4 className="text-lg mb-1">{tier.name}</h4>
                    <p className="text-sm text-primary-forest mb-2">{tier.range}</p>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <Compass className="w-16 h-16 text-primary-forest mx-auto mb-4" />
                <h2 className="text-3xl mb-2">Pick your travel style</h2>
                <p className="text-muted-foreground">This shapes the activities Nimnim suggests</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, travelStyle: style.id })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left shadow-sm ${
                      formData.travelStyle === style.id
                        ? 'border-primary-forest bg-primary-forest/5 shadow-md'
                        : 'border-border bg-white hover:border-primary-sage'
                    }`}
                  >
                    <div className="text-4xl mb-2">{style.icon}</div>
                    <h4 className="text-lg mb-1">{style.name}</h4>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex gap-4">
          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-primary-forest text-white py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={!canProceed()}
              className="flex-1 bg-primary-forest text-white py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-lg">Generate Itinerary</span>
            </button>
          )}
        </div>

        <div className="mt-8 bg-primary-sage/10 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-sage rounded-2xl flex items-center justify-center flex-shrink-0">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-medium mb-1">💡 Tip from Nimnim</p>
            <p className="text-sm text-muted-foreground">
              {step === 1 && 'Popular picks: Palawan for beaches, Baguio for cool weather, Vigan for culture!'}
              {step === 2 && 'Off-peak (June–November) often means better deals and fewer crowds.'}
              {step === 3 && 'Tiers map to regional pricing — Siargao & Boracay run higher than Cebu or Bohol.'}
              {step === 4 && 'Travel style steers the AI toward activities you actually want to do.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
