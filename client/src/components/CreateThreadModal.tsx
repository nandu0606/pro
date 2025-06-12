import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { insertDiscussionThreadSchema } from "@shared/schema";

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  forumId: number;
}

const CreateThreadModal = ({ isOpen, onClose, forumId }: CreateThreadModalProps) => {
  const { toast } = useToast();

  // Extend the schema with validation
  const formSchema = insertDiscussionThreadSchema.extend({
    title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
    content: z.string().min(10, "Content must be at least 10 characters").max(2000, "Content must be less than 2000 characters"),
  });

  // Create form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      forumId: forumId,
      title: "",
      content: "",
      userId: 1, // Using a default user ID for now
      isPinned: false,
    },
  });

  // Set up mutation
  const createThreadMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return apiRequest('/api/threads', { method: 'POST', body: values });
    },
    onSuccess: () => {
      // Show success message
      toast({
        title: "Thread Created",
        description: "Your discussion thread has been created successfully.",
      });
      
      // Reset form
      form.reset();
      
      // Close modal
      onClose();
      
      // Invalidate cache to refresh thread list
      queryClient.invalidateQueries({ queryKey: ['/api/forums', forumId, 'threads'] });
    },
    onError: () => {
      // Show error message
      toast({
        title: "Error",
        description: "Failed to create the thread. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createThreadMutation.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-cosmic-blue-deep border-gold/30 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-gold text-xl font-bold">Create New Discussion</DialogTitle>
          <DialogDescription className="text-white/70">
            Share your thoughts, questions, or insights with the community.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold">Discussion Title</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter a descriptive title"
                      className="bg-cosmic-black/50 border-gold/20 focus:border-gold/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold">Discussion Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Share your thoughts on this topic..."
                      className="bg-cosmic-black/50 border-gold/20 focus:border-gold/40 min-h-[150px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <input type="hidden" {...form.register("forumId")} value={forumId} />
            <input type="hidden" {...form.register("userId")} value={1} />
            <input type="hidden" {...form.register("isPinned")} value="false" />
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gold hover:bg-gold/80 text-cosmic-black font-medium"
                disabled={createThreadMutation.isPending}
              >
                {createThreadMutation.isPending ? "Creating..." : "Create Thread"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadModal;