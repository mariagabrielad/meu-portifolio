// Botão usado em todo o site. Com loading={true} fica bloqueado e mostra o spinner.
export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  ...rest
}) {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled || loading} {...rest}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
