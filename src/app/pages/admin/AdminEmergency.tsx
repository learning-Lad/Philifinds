import { useState } from 'react';
import { AlertCircle, Clock, CheckCircle, Phone, MapPin, User, MessageSquare } from 'lucide-react';

export default function AdminEmergency() {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const emergencyTickets = [
    {
      id: 1,
      user: 'Maria Santos',
      location: 'El Nido, Palawan',
      type: 'Medical Emergency',
      status: 'urgent',
      message: 'Need immediate medical assistance. Injured during island hopping tour.',
      timestamp: '2026-05-11 14:23',
      contact: '+63 917 123 4567',
    },
    {
      id: 2,
      user: 'John Reyes',
      location: 'Boracay, Aklan',
      type: 'Lost Documents',
      status: 'pending',
      message: 'Lost passport and wallet at beach. Need help contacting embassy.',
      timestamp: '2026-05-11 13:45',
      contact: '+63 928 765 4321',
    },
    {
      id: 3,
      user: 'Anna Cruz',
      location: 'Siargao, Surigao del Norte',
      type: 'Accommodation Issue',
      status: 'resolved',
      message: 'Hotel overbooked. Found alternative accommodation nearby.',
      timestamp: '2026-05-11 11:15',
      contact: '+63 905 234 5678',
    },
    {
      id: 4,
      user: 'Pedro Garcia',
      location: 'Cebu City, Cebu',
      type: 'Transportation',
      status: 'pending',
      message: 'Missed flight connection. Need rebooking assistance.',
      timestamp: '2026-05-11 10:30',
      contact: '+63 916 345 6789',
    },
    {
      id: 5,
      user: 'Lisa Tan',
      location: 'Baguio City, Benguet',
      type: 'Weather Alert',
      status: 'resolved',
      message: 'Typhoon warning received. Safely relocated to shelter.',
      timestamp: '2026-05-11 09:00',
      contact: '+63 927 456 7890',
    },
  ];

  const stats = [
    { label: 'Active Tickets', value: '23', icon: AlertCircle, color: 'bg-destructive' },
    { label: 'Pending Review', value: '12', icon: Clock, color: 'bg-accent' },
    { label: 'Resolved Today', value: '45', icon: CheckCircle, color: 'bg-primary' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'pending':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'resolved':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const emergencyContacts = [
    { service: 'National Emergency Hotline', number: '911' },
    { service: 'Philippine Red Cross', number: '143' },
    { service: 'Tourist Police Hotline', number: '(02) 524-1728' },
    { service: 'DOT Tourist Assistance', number: '(02) 8524-1703' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Emergency Management</h1>
        <p className="text-muted-foreground">Monitor and respond to traveler emergency requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-medium">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Emergency Tickets</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-xl text-sm">
                Urgent
              </button>
              <button className="px-4 py-2 bg-white border border-border rounded-xl text-sm">
                All
              </button>
            </div>
          </div>

          {emergencyTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                selectedTicket === ticket.id
                  ? 'border-primary shadow-lg'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium flex-shrink-0">
                    {ticket.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{ticket.user}</p>
                      <span className={`px-2 py-1 rounded-lg text-xs border ${getStatusColor(ticket.status)}`}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {ticket.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {ticket.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  ticket.type === 'Medical Emergency' ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'
                }`}>
                  {ticket.type}
                </div>
              </div>

              <p className="text-sm mb-3 pl-13">{ticket.message}</p>

              <div className="flex items-center gap-3 pl-13">
                <a
                  href={`tel:${ticket.contact}`}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:opacity-90"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-4 h-4" />
                  Call User
                </a>
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm hover:bg-muted"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <div className="bg-white rounded-2xl p-6 border border-border sticky top-8">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-destructive" />
              Emergency Contacts
            </h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-sm font-medium mb-1">{contact.service}</p>
                  <a
                    href={`tel:${contact.number}`}
                    className="text-primary hover:underline text-sm font-mono"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <h3 className="text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90">
                <AlertCircle className="w-4 h-4" />
                Broadcast Alert
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-muted">
                <User className="w-4 h-4" />
                Contact User
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-muted">
                <MapPin className="w-4 h-4" />
                Track Location
              </button>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="text-lg mb-3">Avg Response Time</h3>
            <p className="text-3xl font-medium text-primary mb-2">4.2 min</p>
            <p className="text-sm text-muted-foreground">
              23% faster than last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
