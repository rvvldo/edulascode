import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: "new_story" | "info" | "achievement";
    time: string;
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: 1,
        title: "Cerita Baru Tersedia!",
        message: "Ayo baca 'Petualangan di Hutan Kalimantan' sekarang dan dapatkan poin!",
        type: "new_story",
        time: "Baru saja",
        read: false,
    },
    {
        id: 2,
        title: "Selamat Datang!",
        message: "Selamat bergabung di Edulascode. Mulai petualanganmu sekarang.",
        type: "info",
        time: "1 jam lalu",
        read: false,
    },
    {
        id: 3,
        title: "Pencapaian Baru",
        message: "Kamu mendapatkan badge 'Pemula Hijau'",
        type: "achievement",
        time: "1 hari lalu",
        read: true,
    }
];

export function NotificationSidebar() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "new_story": return <BookOpen className="w-5 h-5 text-primary" />;
            case "achievement": return <Star className="w-5 h-5 text-yellow-500" />;
            default: return <Bell className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-6">
                    <SheetTitle>Notifikasi</SheetTitle>
                    <SheetDescription>
                        Lihat update terbaru dan aktivitasmu.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[85vh] pr-4">
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-xl border transition-all hover:bg-muted/50 cursor-pointer ${notification.read ? "bg-background border-border/50" : "bg-primary/5 border-primary/20"}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex gap-3 items-start">
                                    <div className="mt-1 bg-background p-2 rounded-full shadow-sm">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`text-sm font-semibold mb-1 ${!notification.read ? "text-primary" : "text-foreground"}`}>
                                            {notification.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                                            {notification.message}
                                        </p>
                                        <span className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider">
                                            {notification.time}
                                        </span>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
