export function ButtonLoading() {
  return (
    <button onClick={null} className="btn btn--disabled btn--icon">
      <span class="fa--xs fa--primary">
        <i class="fa fa-spinner fa-spin"></i>
      </span>
    </button>
  );
}
