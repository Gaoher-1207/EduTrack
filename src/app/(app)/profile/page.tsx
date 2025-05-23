
'use client';

import { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, User, CalendarDays, Edit3, Briefcase, Loader2 } from 'lucide-react';
import { UserRoleContext } from '@/context/UserRoleContext';

export default function ProfilePage() {
  const context = useContext(UserRoleContext);

  if (!context || context.isLoadingRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const { currentUser: user } = context;

  if (!user) {
    // Should be redirected by layout if no user, but as a fallback:
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>
      <Card className="max-w-2xl mx-auto shadow-xl rounded-lg">
        <CardHeader className="items-center text-center p-6 bg-secondary/30">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint || "user avatar"} />
            <AvatarFallback className="text-2xl">{user.name ? user.name.substring(0, 1) : 'U'}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold text-primary">{user.name}</CardTitle>
          <CardDescription className="text-muted-foreground capitalize flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> {user.role}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/20">
              <User className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/20">
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="font-medium text-foreground">{user.email || 'N/A (add email in settings)'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/20">
              <CalendarDays className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Joined EduAttend</p>
                <p className="font-medium text-foreground">January 15, 2023 (Mock Data)</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
