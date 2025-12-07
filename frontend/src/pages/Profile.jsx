import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Package, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+380 XX XXX XX XX',
  });

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-12-01',
      total: 89999,
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2024-12-10',
      total: 52999,
      status: 'In Transit',
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2024-12-15',
      total: 28500,
      status: 'Processing',
      items: 1,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-success';
      case 'In Transit':
        return 'text-accent';
      case 'Processing':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="luxury-container">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center">
              <User className="h-12 w-12 text-accent" />
            </div>
            <div>
              <h1 className="text-5xl font-serif font-bold mb-2">{formData.name}</h1>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="section-padding">
        <div className="luxury-container">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="glass-card mb-8">
              <TabsTrigger value="orders">
                <Package className="h-4 w-4 mr-2" />
                {t('profile.orders')}
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                {t('profile.settings')}
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold mb-6">Order History</h2>
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-xl"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                          <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total</p>
                          <p className="text-xl font-bold text-gradient-gold">
                            {order.total.toLocaleString()} {t('common.currency')}
                          </p>
                        </div>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {orders.length === 0 && (
                  <div className="text-center py-12 glass-card rounded-xl">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold">Account Settings</h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                <div className="glass-card p-8 rounded-xl space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="glass"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="glass"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="glass"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button variant="gold" onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                {/* Logout */}
                <div className="mt-8 glass-card p-6 rounded-xl">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('profile.logout')}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};