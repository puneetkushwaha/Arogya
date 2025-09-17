import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingCheckups = () => {
  const upcomingAppointments = [
    {
      id: 1,
      title: "Annual Health Checkup",
      doctor: "Dr. Priya Sharma",
      specialty: "General Physician",
      date: "2025-01-20",
      time: "10:30 AM",
      location: "Apollo Hospital, Delhi",
      type: "routine",
      reminderSet: true,
      priority: "medium"
    },
    {
      id: 2,
      title: "Cardiology Consultation",
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      date: "2025-01-25",
      time: "2:00 PM",
      location: "Max Hospital, Mumbai",
      type: "follow-up",
      reminderSet: true,
      priority: "high"
    },
    {
      id: 3,
      title: "Blood Test - Lipid Profile",
      doctor: "Lab Technician",
      specialty: "Pathology",
      date: "2025-01-18",
      time: "8:00 AM",
      location: "SRL Diagnostics",
      type: "test",
      reminderSet: false,
      priority: "low"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "medication",
      title: "Medicine Reminder",
      message: "Take Metformin 500mg after dinner",
      time: "8:00 PM",
      priority: "high"
    },
    {
      id: 2,
      type: "checkup",
      title: "Blood Pressure Check",
      message: "Weekly BP monitoring due",
      time: "Tomorrow",
      priority: "medium"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'routine': return 'Calendar';
      case 'follow-up': return 'RefreshCw';
      case 'test': return 'TestTube';
      case 'medication': return 'Pill';
      case 'checkup': return 'Stethoscope';
      default: return 'Clock';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return date?.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upcoming Checkups */}
      <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-text-primary">Upcoming Checkups</h2>
          <Button variant="ghost" size="sm" iconName="Plus">
            Add Appointment
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingAppointments?.map((appointment) => (
            <div key={appointment?.id} className="border medical-border rounded-lg p-4 hover:bg-muted/50 transition-gentle">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getPriorityBg(appointment?.priority)}`}>
                    <Icon name={getTypeIcon(appointment?.type)} size={18} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-1">{appointment?.title}</h3>
                    <p className="text-sm text-text-secondary mb-1">{appointment?.doctor} • {appointment?.specialty}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{formatDate(appointment?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{appointment?.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBg(appointment?.priority)} ${getPriorityColor(appointment?.priority)}`}>
                  {appointment?.priority?.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name="MapPin" size={12} />
                  <span>{appointment?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment?.reminderSet && (
                    <div className="flex items-center space-x-1 text-xs text-success">
                      <Icon name="Bell" size={12} />
                      <span>Reminder Set</span>
                    </div>
                  )}
                  <Button variant="ghost" size="xs" iconName="MoreHorizontal" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t medical-border">
          <Button variant="outline" size="sm" iconName="Calendar" className="w-full">
            View All Appointments
          </Button>
        </div>
      </div>
      {/* Health Alerts */}
      <div className="bg-card rounded-xl p-6 card-elevation-1 border medical-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-text-primary">Health Alerts</h2>
          <Button variant="ghost" size="sm" iconName="Settings">
            Manage
          </Button>
        </div>

        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div key={alert?.id} className={`border rounded-lg p-4 ${getPriorityBg(alert?.priority)} border-l-4`} style={{ borderLeftColor: alert?.priority === 'high' ? 'var(--color-error)' : alert?.priority === 'medium' ? 'var(--color-warning)' : 'var(--color-success)' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-card rounded-lg">
                    <Icon name={getTypeIcon(alert?.type)} size={16} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-1">{alert?.title}</h3>
                    <p className="text-sm text-text-secondary mb-2">{alert?.message}</p>
                    <div className="flex items-center space-x-1 text-xs text-text-secondary">
                      <Icon name="Clock" size={12} />
                      <span>{alert?.time}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="xs" iconName="X" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t medical-border">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Bell" className="flex-1">
              All Alerts
            </Button>
            <Button variant="outline" size="sm" iconName="Settings" className="flex-1">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCheckups;