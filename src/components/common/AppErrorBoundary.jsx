import React from 'react';

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#050608] px-6 text-white">
          <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.24em] text-zinc-400">
              Application Error
            </p>
            <h1 className="mb-3 text-2xl font-semibold">
              Algo impediu esta pagina de carregar.
            </h1>
            <p className="text-sm leading-relaxed text-zinc-300">
              Tente atualizar a pagina. Se o problema continuar, abra o console do navegador para ver
              o erro detalhado.
            </p>
            {this.state.error?.message ? (
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-black/40 p-4 text-left text-xs text-red-300">
                {this.state.error.message}
              </pre>
            ) : null}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
