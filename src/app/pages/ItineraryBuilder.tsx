import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles, Cloud, MapPin, Calendar, DollarSign, Users, Compass } from 'lucide-react';
import NimnimLoader from '../components/shared/NimnimLoader';

type TravelStyle = 'relaxing' | 'adventure' | 'island-hopping' | 'cultural';

export default function ItineraryBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    duration: '',
    groupSize: '1',
    travelStyle: '' as TravelStyle | '',
  });

  const destinations = [
    'Palawan', 'Boracay', 'Siargao', 'Cebu', 'Baguio', 'Vigan',
    'Manila', 'Batanes', 'Bohol', 'Davao', 'Ilocos Norte', 'Sagada'
  ];

  const travelStyles = [
    { id: 'relaxing', name: 'Relaxing', icon: '🏖️', description: 'Beach resorts, spas, and leisure' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️', description: 'Hiking, diving, and thrills' },
    { id: 'island-hopping', name: 'Island Hopping', icon: '⛵', description: 'Explore multiple islands' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️', description: 'History, food, and traditions' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/itinerary/3'); // Mock ID
    }, 3000);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.destination !== '';
      case 2:
        return formData.budget !== '' && formData.duration !== '';
      case 3:
        return formData.groupSize !== '' && formData.travelStyle !== '';
      default:
        return false;
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <NimnimLoader message="Creating your perfect Philippine adventure..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
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
                className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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

      {/* Progress Bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            <span className="text-sm text-primary">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Destination */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
            <div className="text-center mb-8">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl mb-2">Where do you want to go?</h2>
              <p className="text-muted-foreground">Choose your dream destination in the Philippines</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {destinations.map((dest) => (
                <button
                  key={dest}
                  onClick={() => setFormData({ ...formData, destination: dest })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.destination === dest
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border bg-white hover:border-primary/50'
                  }`}
                >
                  <p className="text-lg">{dest}</p>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border">
              <label className="block mb-2">Or enter a custom destination</label>
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

        {/* Step 2: Budget & Duration */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl mb-2">Plan your timeline & budget</h2>
              <p className="text-muted-foreground">Tell us how long you'll stay and your budget</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border space-y-6">
              <div>
                <label className="block mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>Budget (PHP)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {['10,000', '20,000', '30,000', '50,000+'].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setFormData({ ...formData, budget })}
                      className={`py-3 rounded-xl border-2 transition-all ${
                        formData.budget === budget
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      ₱{budget}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Or enter custom amount..."
                />
              </div>

              <div>
                <label className="block mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Duration</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {['2 Days', '3 Days', '5 Days', '1 Week', '2 Weeks'].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setFormData({ ...formData, duration })}
                      className={`py-3 rounded-xl border-2 transition-all ${
                        formData.duration === duration
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
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

        {/* Step 3: Group Size & Travel Style */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <Compass className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl mb-2">Choose your travel style</h2>
              <p className="text-muted-foreground">Help us personalize your itinerary</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-border">
                <label className="block mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Group Size</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: '1', label: 'Solo' },
                    { value: '2', label: 'Couple' },
                    { value: '3-5', label: 'Small Group' },
                    { value: '6+', label: 'Large Group' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, groupSize: option.value })}
                      className={`py-3 rounded-xl border-2 transition-all ${
                        formData.groupSize === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-4 text-lg">Travel Style</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFormData({ ...formData, travelStyle: style.id as TravelStyle })}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        formData.travelStyle === style.id
                          ? 'border-primary bg-primary/5 shadow-lg'
                          : 'border-border bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{style.icon}</div>
                      <h4 className="text-lg mb-1">{style.name}</h4>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-12 flex gap-4">
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={!canProceed()}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-lg">Generate Itinerary</span>
            </button>
          )}
        </div>

        {/* Nimnim Helper */}
        {!isGenerating && (
          <div className="mt-8 bg-secondary/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium mb-1">💡 Tip from Nimnim</p>
              <p className="text-sm text-muted-foreground">
                {step === 1 && "Popular destinations include Palawan for beaches, Baguio for cool weather, and Vigan for culture!"}
                {step === 2 && "Budget tip: Consider traveling during off-peak season (June-November) for better deals!"}
                {step === 3 && "Your travel style helps me recommend the best activities and accommodations for you!"}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
