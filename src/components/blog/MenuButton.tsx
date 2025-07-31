const MenuButton = ({ onClick, isActive, children }: { onClick: () => void; isActive?: boolean; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-2 border-0 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200"
    }`}
  >
    {children}
  </button>
);

export default MenuButton;
