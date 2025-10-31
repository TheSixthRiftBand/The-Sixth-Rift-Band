
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AdminSubscribers() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const auth = sessionStorage.getItem("adminAuth");
      if (!auth) {
        throw new Error("Not authenticated");
      }
      const res = await fetch("/api/subscribers", {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      if (!res.ok) {
        sessionStorage.removeItem("adminAuth");
        setLocation("/admin/login");
        throw new Error("Authentication failed");
      }
      return await res.json();
    },
  });

  const copyEmails = () => {
    if (subscribers) {
      const emails = subscribers.map((s: any) => s.email).join(", ");
      navigator.clipboard.writeText(emails);
      toast({
        title: "Copied!",
        description: `${subscribers.length} email addresses copied to clipboard`,
      });
    }
  };

  const generateEmailTemplate = () => {
    const template = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #D4A574 0%, #8B7355 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #f9f9f9; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>The Sixth Rift</h1>
    <p>${emailSubject}</p>
  </div>
  <div class="content">
    ${emailContent.replace(/\n/g, '<br>')}
  </div>
  <div class="footer">
    <p>You're receiving this because you subscribed to The Sixth Rift newsletter</p>
    <p>© 2025 The Sixth Rift - Creating music beyond dimensions</p>
  </div>
</body>
</html>
    `.trim();

    navigator.clipboard.writeText(template);
    toast({
      title: "Email HTML Copied!",
      description: "Paste this into your email service",
    });
  };

  if (isLoading) {
    return <div className="p-8">Loading subscribers...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">
            Subscriber Management
          </h1>
          <Button
            onClick={() => {
              sessionStorage.removeItem("adminAuth");
              setLocation("/admin/login");
              toast({
                title: "Logged out",
                description: "You have been logged out successfully",
              });
            }}
            variant="outline"
          >
            Logout
          </Button>
        </div>

        {/* Subscribers List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Subscribers ({subscribers?.length || 0})</span>
              <Button onClick={copyEmails} variant="outline">
                Copy All Emails
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {subscribers?.map((subscriber: any) => (
                <div
                  key={subscriber.id}
                  className="flex justify-between items-center p-3 bg-muted rounded-lg"
                >
                  <span className="font-medium">{subscriber.email}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Template Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Create Email Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Subject Line
              </label>
              <Input
                placeholder="e.g., New Track Release: Cosmic Dreams"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email Content
              </label>
              <Textarea
                placeholder="Write your message here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={10}
              />
            </div>
            <Button
              onClick={generateEmailTemplate}
              disabled={!emailSubject || !emailContent}
              className="w-full"
            >
              Generate HTML Email Template
            </Button>
            <p className="text-sm text-muted-foreground">
              This will copy a styled HTML email to your clipboard. You can paste
              it into any email service (Gmail, Resend, Mailchimp, etc.)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
