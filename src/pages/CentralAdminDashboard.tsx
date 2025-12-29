import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    LogOut,
    AlertTriangle,
    Settings,
    Shield,
    CheckCircle,
    XCircle,
    Server,
    Trash2,
    Ban,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeData } from "@/hooks/useFirebase";
import { updateData, deleteData } from "@/lib/firebase.service";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useDialogStore } from "@/hooks/useDialog";

const CentralAdminDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("performance");
    const { confirm } = useDialogStore();

    // Fetch Data
    const { data: systemData } = useRealtimeData("system");
    const { data: usersData } = useRealtimeData("users");
    const { data: reportsData } = useRealtimeData("reports");

    const [maxUsers, setMaxUsers] = useState(100);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [userSearch, setUserSearch] = useState("");

    // Initialize local state from firebase data
    useEffect(() => {
        if (systemData) {
            if (systemData.maxUsers) setMaxUsers(systemData.maxUsers);
            if (systemData.maintenance !== undefined) setMaintenanceMode(systemData.maintenance);
        }
    }, [systemData]);

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // System Settings Logic
    const handleSaveSettings = async () => {
        try {
            await updateData("system", {
                maxUsers: parseInt(maxUsers.toString()),
                maintenance: maintenanceMode
            });
            toast({ title: "Pengaturan Disimpan", description: "Perubahan sistem telah diterapkan." });
        } catch (error) {
            toast({ title: "Gagal", description: "Gagal menyimpan pengaturan.", variant: "destructive" });
        }
    };

    // Transform Data
    const users = usersData ? Object.entries(usersData).map(([id, u]: [string, any]) => ({ id, ...u })) : [];
    const reports = reportsData ? Object.entries(reportsData).map(([id, r]: [string, any]) => ({ id, ...r })) : [];

    // Filtered Lists
    const filteredUsers = users.filter(u =>
        u.displayName?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email?.toLowerCase().includes(userSearch.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    // Actions
    const handleDeleteUser = async (id: string) => {
        const confirmed = await confirm(
            "User dan semua datanya akan dihapus permanen",
            "Hapus User?"
        );
        if (confirmed) {
            await deleteData(`users/${id}`);
            toast({ title: "User Dihapus" });
        }
    };

    const handleBlockUser = async (id: string, currentStatus: boolean) => {
        await updateData(`users/${id}`, { isActive: !currentStatus });
        toast({ title: currentStatus ? "User Diblokir" : "User Diaktifkan" });
    };

    const handleReportStatus = async (id: string, status: 'pending' | 'process' | 'done') => {
        await updateData(`reports/${id}`, { status });
        toast({ title: "Status Laporan Diupdate" });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-red-100 text-red-800 border-red-200';
            case 'process': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'done': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border/50 bg-card hidden lg:block">
                <div className="p-6">
                    <h1 className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Central Admin
                    </h1>
                </div>
                <nav className="px-4 space-y-2">
                    <Button variant={activeTab === "performance" ? "secondary" : "ghost"} className="w-full justify-start gap-3" onClick={() => setActiveTab("performance")}>
                        <Server className="w-5 h-5" /> Performa & Pengaturan
                    </Button>
                    <Button variant={activeTab === "users" ? "secondary" : "ghost"} className="w-full justify-start gap-3" onClick={() => setActiveTab("users")}>
                        <Users className="w-5 h-5" /> Manajemen Pengguna
                    </Button>
                    <Button variant={activeTab === "reports" ? "secondary" : "ghost"} className="w-full justify-start gap-3" onClick={() => setActiveTab("reports")}>
                        <AlertTriangle className="w-5 h-5" /> Laporan Masalah
                    </Button>
                    <div className="pt-4 mt-4 border-t border-border/50">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive" onClick={handleLogout}>
                            <LogOut className="w-5 h-5" /> Keluar
                        </Button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {activeTab === "performance" && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">Performa & Pengaturan</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Pengunjung</CardTitle></CardHeader>
                                <CardContent><div className="text-2xl font-bold">1,234</div></CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Pengunjung Aktif</CardTitle></CardHeader>
                                <CardContent><div className="text-2xl font-bold text-green-500">56</div></CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Status Server</CardTitle></CardHeader>
                                <CardContent className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="font-bold">Online (99.9%)</span>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader><CardTitle>Pengaturan Umum</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <h4 className="font-medium">Maintenance Mode</h4>
                                        <p className="text-sm text-muted-foreground">Aktifkan mode perbaikan (hanya admin yang bisa akses).</p>
                                    </div>
                                    <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium">Pembatasan Pengguna (Max Users)</h4>
                                    <Input
                                        type="number"
                                        value={maxUsers}
                                        onChange={(e) => setMaxUsers(parseInt(e.target.value))}
                                        className="max-w-xs"
                                    />
                                    <p className="text-sm text-muted-foreground">Batas maksimal user yang dapat mendaftar/login.</p>
                                </div>
                                <Button onClick={handleSaveSettings}>Simpan Pengaturan</Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Manajemen Pengguna</h2>
                            <div className="flex gap-4">
                                <Badge variant="secondary" className="px-4 py-1">Total Users: {users.length}</Badge>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Cari nama atau email..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="pl-9" />
                        </div>

                        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.displayName || "No Name"}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell><Badge variant="outline">{user.role || "user"}</Badge></TableCell>
                                            <TableCell>
                                                <Badge className={user.isActive !== false ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}>
                                                    {user.isActive !== false ? "Aktif" : "Non-Aktif"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleBlockUser(user.id, user.isActive !== false)} title={user.isActive !== false ? "blokir" : "aktifkan"}>
                                                    <Ban className={`w-4 h-4 ${user.isActive !== false ? "text-orange-500" : "text-green-500"}`} />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                {activeTab === "reports" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-900">
                                <div className="text-2xl font-bold">{reports.filter(r => r.status === 'pending' || !r.status).length}</div>
                                <div className="text-sm font-medium">Laporan Baru</div>
                            </div>
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-900">
                                <div className="text-2xl font-bold">{reports.filter(r => r.status === 'process').length}</div>
                                <div className="text-sm font-medium">Sedang Diproses</div>
                            </div>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-900">
                                <div className="text-2xl font-bold">{reports.filter(r => r.status === 'done').length}</div>
                                <div className="text-sm font-medium">Selesai</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {reports.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).map(report => (
                                <div key={report.id} className="bg-card p-6 rounded-xl border border-border/50 shadow-sm relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline">{report.category}</Badge>
                                                <span className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="font-bold text-lg">{report.subject}</h3>
                                            <p className="text-sm text-muted-foreground">Pelapor: {report.userEmail}</p>
                                        </div>
                                        <Badge variant="outline" className={`${getStatusColor(report.status)} uppercase`}>
                                            {report.status || 'pending'}
                                        </Badge>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-lg text-sm mb-4">
                                        {report.description}
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <Button size="sm" variant={report.status === 'pending' ? 'default' : 'outline'} className={report.status === 'pending' ? 'bg-red-500 hover:bg-red-600' : ''} onClick={() => handleReportStatus(report.id, 'pending')}>
                                            Belum
                                        </Button>
                                        <Button size="sm" variant={report.status === 'process' ? 'default' : 'outline'} className={report.status === 'process' ? 'bg-yellow-500 hover:bg-yellow-600' : ''} onClick={() => handleReportStatus(report.id, 'process')}>
                                            Proses
                                        </Button>
                                        <Button size="sm" variant={report.status === 'done' ? 'default' : 'outline'} className={report.status === 'done' ? 'bg-green-500 hover:bg-green-600' : ''} onClick={() => handleReportStatus(report.id, 'done')}>
                                            Selesai
                                        </Button>
                                        {report.status === 'done' && (
                                            <Button size="sm" variant="destructive" onClick={async () => {
                                                const confirmed = await confirm(
                                                    "Laporan yang dihapus tidak dapat dikembalikan",
                                                    "Hapus Laporan?"
                                                );
                                                if (confirmed) {
                                                    await deleteData(`reports/${report.id}`);
                                                    toast({ title: "Laporan Dihapus" });
                                                }
                                            }}>
                                                <Trash2 className="w-4 h-4 ml-2" /> Hapus
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {reports.length === 0 && <div className="text-center text-muted-foreground p-8">Belum ada laporan masalah.</div>}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CentralAdminDashboard;
