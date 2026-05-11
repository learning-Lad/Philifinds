import { useNavigate } from 'react-router';
import { ArrowRight, Sparkles, MapPin, DollarSign, Clock, Shield, Users, Heart, Cloud } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Planning',
      description: 'Let Nimnim create personalized itineraries tailored to your preferences and budget',
    },
    {
      icon: DollarSign,
      title: 'Smart Budgeting',
      description: 'Real-time cost estimates for flights, hotels, and activities to keep you on track',
    },
    {
      icon: Clock,
      title: 'Minutes, Not Hours',
      description: 'Generate complete travel plans in under 3 minutes with our intelligent system',
    },
    {
      icon: Shield,
      title: '24/7 Emergency Support',
      description: 'Travel with confidence knowing help is always available when you need it',
    },
  ];

  const stats = [
    { value: '12,459+', label: 'Happy Travelers' },
    { value: '3,847', label: 'Active Itineraries' },
    { value: '15', label: 'Destinations' },
    { value: '₱45M+', label: 'Saved Collectively' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-cream/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-primary">PhiliFinds</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#destinations" className="text-foreground hover:text-primary transition-colors">
                Destinations
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">AI-Powered Travel Planning</span>
              </div>

              <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
                From Idea to Itinerary In{' '}
                <span className="text-primary">Minutes</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover the Philippines like never before. Tell us your plan, get your AI itinerary, and travel smarter every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  <span className="text-lg">Start Planning Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/itinerary/new')}
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-2xl hover:bg-primary/5 transition-colors"
                >
                  <span className="text-lg">Try Demo</span>
                </button>
              </div>

              <div className="flex items-center gap-8">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl font-medium text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1697473259118-473211915531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="El Nido Lagoon"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl mb-2">El Nido, Palawan</h3>
                  <p className="text-white/90">Most requested destination</p>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meet Nimnim</p>
                    <p className="font-medium">Your AI Travel Guide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl md:text-4xl mb-2">{stat.value}</p>
                <p className="text-sage-green">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Box Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              Plan Smarter.{' '}
              <span className="text-primary">Travel Better.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan the perfect Philippine adventure, powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Large feature card */}
            <div className="lg:col-span-2 bg-secondary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl mb-4">Tell Us Your Plan</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Answer a few simple questions about your destination, budget, and travel style
                </p>
                <button
                  onClick={() => navigate('/itinerary/new')}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
                >
                  <span>Start Planning</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Mascot card */}
            <div className="bg-mint-green rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-secondary rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                <Cloud className="w-16 h-16 text-white" />
              </div>
              <h4 className="text-xl mb-2">Meet Nimnim</h4>
              <p className="text-muted-foreground text-sm">
                Your friendly AI travel companion
              </p>
            </div>

            {/* Phone mockup */}
            <div className="bg-primary rounded-3xl p-8 flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center text-primary-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-sage-green" />
                <h4 className="text-xl mb-2">Mobile Optimized</h4>
                <p className="text-sage-green">
                  Plan on the go with our mobile-friendly interface
                </p>
              </div>
              <div className="absolute -right-8 -top-8 w-48 h-48 bg-sage-green/20 rounded-full"></div>
            </div>

            {/* Image card */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1759861995638-3300bd81440e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Philippine Islands"
                className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="text-2xl mb-2">15+ Destinations</h4>
                <p className="text-white/90">From Palawan to Batanes, we've got you covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground">
              Powerful features to make your travel planning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border hover:shadow-lg transition-all hover:border-primary/50"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to your perfect Philippine adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h4 className="text-xl mb-3">Tell Us Your Plan</h4>
                <p className="text-muted-foreground">
                  Share your destination, budget, duration, and travel preferences
                </p>
              </div>
              <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-border"></div>
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h4 className="text-xl mb-3">Get Your AI Itinerary</h4>
                <p className="text-muted-foreground">
                  Nimnim generates a personalized day-by-day plan with costs and activities
                </p>
              </div>
              <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-border"></div>
            </div>

            <div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h4 className="text-xl mb-3">Travel Smarter</h4>
                <p className="text-muted-foreground">
                  Share your itinerary, track progress, and get 24/7 emergency support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-sage-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-mint-green rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl mb-6">
            Take the Step. The Philippines Will Meet You There.
          </h2>
          <p className="text-xl text-sage-green mb-8">
            Join thousands of travelers who've discovered their perfect Philippine adventure
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-white text-primary rounded-2xl hover:bg-cream transition-colors shadow-lg text-lg"
            >
              Start Planning Free
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-colors text-lg"
            >
              View Demo Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">PhiliFinds</span>
              </div>
              <p className="text-white/60 text-sm">
                AI-powered travel planning for the Philippines
              </p>
            </div>

            <div>
              <h5 className="mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2026 PhiliFinds. Built with ❤️ for Philippine travelers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
