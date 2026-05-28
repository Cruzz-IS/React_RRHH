import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, Mail, Shield } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
 
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation<{ from?: { pathname?: string } }>();
  const from = location.state?.from?.pathname ?? '/dashboard';
 
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });
 
  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    setServerError(null);
    try {
      await login(values);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage =
        typeof err === 'object' && err !== null && 'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response === 'object' &&
        (err as { response?: { data?: { message?: string } } }).response?.data?.message
          ? (err as { response: { data: { message: string } } }).response.data.message
          : typeof err === 'object' && err !== null && 'message' in err &&
            typeof (err as { message?: string }).message === 'string'
          ? (err as { message: string }).message
          : 'Error al iniciar sesión. Intente nuevamente.';

      setServerError(errorMessage);
    }
  };
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
 
        {/* Logo / Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">BAC Honduras</h1>
          <p className="mt-1 text-sm text-slate-400">
            Sistema de Recursos Humanos
          </p>
        </div>
 
        <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Iniciar Sesión
          </h2>
 
          {serverError && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <span className="mt-0.5 text-red-400">⚠</span>
              <span>{serverError}</span>
            </div>
          )}
 
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
 
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="correo@empresa.com"
                  disabled={isSubmitting}
                  className={[
                    'w-full rounded-lg border bg-slate-900/50 py-2.5 pl-10 pr-4',
                    'text-sm text-white placeholder:text-slate-500',
                    'outline-none transition-all duration-200',
                    'focus:ring-2 focus:ring-blue-500/50',
                    errors.email
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-slate-600 focus:border-blue-500',
                    isSubmitting ? 'cursor-not-allowed opacity-60' : '',
                  ].join(' ')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
 
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  className={[
                    'w-full rounded-lg border bg-slate-900/50 py-2.5 pl-10 pr-10',
                    'text-sm text-white placeholder:text-slate-500',
                    'outline-none transition-all duration-200',
                    'focus:ring-2 focus:ring-blue-500/50',
                    errors.password
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-slate-600 focus:border-blue-500',
                    isSubmitting ? 'cursor-not-allowed opacity-60' : '',
                  ].join(' ')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v: boolean) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>
 
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  disabled={isSubmitting}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-blue-600"
                />
                Recordarme
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
 
            <button
              type="submit"
              disabled={isSubmitting}
              className={[
                'flex w-full items-center justify-center gap-2 rounded-lg',
                'bg-blue-600 py-2.5 text-sm font-semibold text-white',
                'transition-all duration-200',
                'hover:bg-blue-500 active:scale-[0.98]',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800',
                isSubmitting
                  ? 'cursor-not-allowed opacity-70'
                  : 'shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40',
              ].join(' ')}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Iniciando sesión…
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
 
        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Sistema RRHH
        </p>
      </div>
    </div>
  );
};
 
export default LoginPage;