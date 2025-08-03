const MenuButton = ({ onClick, isActive, children }: { onClick: () => void; isActive?: boolean; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-2 border-0 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-admin-primary text-white shadow-md"
        : "bg-admin-card-bg text-admin-text hover:bg-admin-secondary hover:shadow-sm border border-admin-border"
    }`}
  >
    {children}
  </button>
);

export default MenuButton;
