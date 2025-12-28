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
import { Loader2, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useRealtimeData } from "@/hooks/useFirebase";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const ReportForm = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        category: "bug",
        description: "",
    });

    // Fetch reports
    const { data: reportsData } = useRealtimeData("reports");
    const userReports = reportsData
        ? Object.entries(reportsData)
            .map(([id, data]: [string, any]) => ({ id, ...data }))
            .filter((report) => report.userId === currentUser?.uid)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-red-100 text-red-800 border-red-200';
            case 'process': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'done': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-3 h-3 mr-1" />;
            case 'process': return <Loader2 className="w-3 h-3 mr-1" />;
            case 'done': return <CheckCircle2 className="w-3 h-3 mr-1" />;
            default: return <AlertCircle className="w-3 h-3 mr-1" />;
        }
    };

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
                description: `Terjadi kesalahan: ${(error as Error).message}`,
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
            {/* Riwayat Laporan */}
            <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Riwayat Laporan Anda</h3>
                <div className="space-y-4">
                    {userReports.length > 0 ? (
                        userReports.map((report) => (
                            <Card key={report.id} className="p-4 border-border/50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className="text-xs">
                                                {report.category}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h4 className="font-semibold text-sm">{report.subject}</h4>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                            {report.description}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`${getStatusColor(report.status)} flex items-center`}
                                    >
                                        {getStatusIcon(report.status)}
                                        <span className="capitalize">{report.status || 'pending'}</span>
                                    </Badge>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                            Belum ada laporan yang dikirim
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ReportForm;
