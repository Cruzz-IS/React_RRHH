import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  LogOut,
  User,
  Shield,
  Briefcase,
} from 'lucide-react';


interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}


const StatCardItem = ({ title, value, description, icon, color }: StatCard) => (
  <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <div className={`rounded-lg p-2.5 ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);


interface ActivityItem {
  id: number;
  action: string;
  time: string;
  type: 'empleado' | 'planilla' | 'bono';
}

const activityData: ActivityItem[] = [
  { id: 1, action: 'Nueva planilla generada para Abril 2024',  time: 'Hace 2 horas',  type: 'planilla' },
  { id: 2, action: 'Empleado Juan Pérez agregado al sistema',  time: 'Hace 5 horas',  type: 'empleado' },
  { id: 3, action: 'Bono de productividad asignado (Q 500.00)', time: 'Ayer',          type: 'bono'     },
  { id: 4, action: 'Planilla Marzo 2024 marcada como pagada',  time: 'Hace 2 días',   type: 'planilla' },
  { id: 5, action: 'María González: cargo actualizado',        time: 'Hace 3 días',   type: 'empleado' },
];

const activityIcon: Record<ActivityItem['type'], React.ReactNode> = {
  empleado: <Users    className="h-4 w-4 text-blue-400"   />,
  planilla: <FileText className="h-4 w-4 text-green-400"  />,
  bono:     <DollarSign className="h-4 w-4 text-yellow-400" />,
};


const roleBadge: Record<string, { label: string; className: string }> = {
  Admin:    { label: 'Administrador', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  Manager:  { label: 'Manager',       className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  Employee: { label: 'Empleado',      className: 'bg-green-500/20 text-green-400 border-green-500/30' },
};


const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { isAdmin, isAdminOrManager } = useRole();

  const badge = roleBadge[user?.role ?? ''] ?? {
    label: user?.role ?? '',
    className: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  const stats: StatCard[] = [
    {
      title:       'Total Empleados',
      value:       '—',
      description: 'Empleados activos en el sistema',
      icon:        <Users       className="h-5 w-5 text-blue-400"   />,
      color:       'bg-blue-500/10',
    },
    {
      title:       'Planillas del Mes',
      value:       '—',
      description: 'Planillas procesadas este mes',
      icon:        <FileText    className="h-5 w-5 text-green-400"  />,
      color:       'bg-green-500/10',
    },
    {
      title:       'Nómina Total',
      value:       '—',
      description: 'Nómina total del periodo actual',
      icon:        <DollarSign  className="h-5 w-5 text-yellow-400" />,
      color:       'bg-yellow-500/10',
    },
    {
      title:       'Bonos Asignados',
      value:       '—',
      description: 'Bonos activos en el periodo',
      icon:        <TrendingUp  className="h-5 w-5 text-purple-400" />,
      color:       'bg-purple-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      <header className="border-b border-slate-700 bg-slate-800/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">BAC Honduras</p>
              <p className="text-xs text-slate-400">Sistema RRHH</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600">
                <User className="h-4 w-4 text-slate-300" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.fullName ?? '—'}</p>
                <p className="text-xs text-slate-400">{user?.email ?? '—'}</p>
              </div>
              <span
                className={`hidden rounded-full border px-2.5 py-0.5 text-xs font-medium sm:inline-flex ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>

            <button
              onClick={() => void logout()}
              className="flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-400 transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Bienvenido, {user?.firstName ?? 'Usuario'} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {new Date().toLocaleDateString('es-HN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {isAdminOrManager && (
          <section className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Resumen general
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCardItem key={stat.title} {...stat} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Accesos rápidos
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {isAdminOrManager && (
              <a
                href="/empleados"
                className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-blue-500/50 hover:bg-slate-700"
              >
                <div className="rounded-lg bg-blue-500/10 p-2.5">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Empleados</p>
                  <p className="text-xs text-slate-400">Gestionar personal</p>
                </div>
              </a>
            )}

            <a
              href="/planillas"
              className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-green-500/50 hover:bg-slate-700"
            >
              <div className="rounded-lg bg-green-500/10 p-2.5">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">Planillas</p>
                <p className="text-xs text-slate-400">Ver nómina</p>
              </div>
            </a>

            {isAdmin && (
              <a
                href="/configuracion"
                className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-purple-500/50 hover:bg-slate-700"
              >
                <div className="rounded-lg bg-purple-500/10 p-2.5">
                  <Briefcase className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Cargos</p>
                  <p className="text-xs text-slate-400">Gestionar cargos</p>
                </div>
              </a>
            )}

          </div>
        </section>

        {isAdminOrManager && (
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Actividad reciente
            </h2>
            <div className="rounded-xl border border-slate-700 bg-slate-800">
              <ul className="divide-y divide-slate-700">
                {activityData.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 px-5 py-4"
                  >
                    <div className="mt-0.5 rounded-lg bg-slate-700 p-1.5">
                      {activityIcon[item.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-slate-200">{item.action}</p>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default DashboardPage;