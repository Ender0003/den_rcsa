'use client';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/50 text-center py-4">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Козаровський Денис. All rights reserved.
      </p>
    </footer>
  );
}