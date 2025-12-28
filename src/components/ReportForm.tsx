import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { pushData } from "@/lib/firebase.service";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Send } from "lucide-react";

const ReportForm = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        category: "bug",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setLoading(true);
        try {
            await pushData("reports", {
                userId: currentUser.uid,
                userEmail: currentUser.email,
                ...formData,
                status: "pending",
                createdAt: new Date().toISOString(),
            });

            toast({
                title: "Laporan Terkirim",
                description: "Terima kasih atas laporan Anda. Tim kami akan segera meninjaunya.",
            });

            setFormData({
                subject: "",
                category: "bug",
                description: "",
            });
        } catch (error) {
            console.error("Error submitting report:", error);
            toast({
                title: "Gagal Mengirim",
                description: "Terjadi kesalahan saat mengirim laporan.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h2 className="text-xl font-bold mb-2">Laporkan Masalah</h2>
                <p className="text-muted-foreground mb-6">
                    Punya masalah atau saran? Beritahu kami agar kami dapat meningkatkan pengalaman Anda.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bug">Bug / Error</SelectItem>
                                <SelectItem value="feature">Saran Fitur</SelectItem>
                                <SelectItem value="content">Masalah Konten</SelectItem>
                                <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Judul</Label>
                        <Input
                            id="subject"
                            placeholder="Contoh: Error saat login"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            placeholder="Jelaskan masalahnya secara detail..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={5}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Kirim Laporan
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;
