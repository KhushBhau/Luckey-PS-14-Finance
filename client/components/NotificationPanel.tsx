import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle,
  Info,
  X,
  Clock,
  DollarSign,
  Target,
  Zap
} from "lucide-react";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'challenge';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Investment Successful',
      message: 'Your investment of ₹500 has been processed successfully.',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'challenge',
      title: 'Daily Challenge Available',
      message: 'Complete today\'s challenge to earn ₹25 bonus!',
      timestamp: '1 hour ago',
      read: false,
      action: {
        label: 'View Challenge',
        onClick: () => {
          console.log('Navigate to challenges');
          onClose();
        }
      }
    },
    {
      id: '3',
      type: 'info',
      title: 'Emergency Fund Update',
      message: 'Your emergency fund has reached 60% of your goal.',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'SIP Reminder',
      message: 'Your daily SIP of ₹50 is due today.',
      timestamp: '5 hours ago',
      read: false,
      action: {
        label: 'Process SIP',
        onClick: () => {
          console.log('Process SIP');
          onClose();
        }
      }
    },
    {
      id: '5',
      type: 'success',
      title: 'Streak Bonus Earned',
      message: 'Congratulations! You\'ve earned ₹100 for your 7-day investment streak.',
      timestamp: '1 day ago',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'challenge':
        return <Zap className="w-5 h-5 text-purple-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Success</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'challenge':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Challenge</Badge>;
      case 'info':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge variant="secondary">Notification</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <Card className="w-96 h-full rounded-none border-l shadow-xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="w-full mt-2"
            >
              Mark all as read
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto h-full">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Bell className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No notifications</p>
              <p className="text-sm text-gray-400">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          {getNotificationBadge(notification.type)}
                          <span className="text-xs text-gray-400">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      {notification.action && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.action?.onClick();
                          }}
                        >
                          {notification.action.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
