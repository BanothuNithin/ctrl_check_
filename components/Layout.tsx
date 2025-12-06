import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GitBranch,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  CheckSquare,
  LayoutTemplate,
} from "lucide-react";
import { cn, Button, Avatar, Input } from "./ui/design-system";

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }: any) => (
  <Link
    to={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
      isActive
        ? "bg-slate-900 text-white shadow-md"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon
      size={18}
      className={cn(
        isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"
      )}
    />
    <span>{label}</span>
  </Link>
);

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: GitBranch, label: "Workflows", href: "/workflows" },
    { icon: LayoutTemplate, label: "Templates", href: "/templates" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-slate-200 bg-white/80 backdrop-blur-xl z-30">
        <div className="p-6 flex items-center gap-2">
          <img src="/add-logo.png" alt="CtrlCheck Logo" className="h-8 w-8" />
          <span className="font-bold text-lg tracking-tight">CtrlCheck</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              isActive={
                location.pathname === item.href ||
                location.pathname.startsWith(item.href + "/")
              }
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-900 mb-1">
              Pro Plan
            </p>
            <p className="text-xs text-slate-500 mb-3">80% of tokens used</p>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 w-[80%]" />
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl p-4 z-50 animate-in slide-in-from-left">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg">CtrlCheck</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={location.pathname === item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 mt-8"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Log Out
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <div className="hidden sm:flex relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                className="pl-9 bg-slate-50 border-transparent focus:bg-white focus:border-slate-200"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell size={18} />
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden sm:block">
                Jane Doe
              </span>
              <Avatar fallback="JD" className="bg-indigo-100 text-indigo-700" />
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};
