import Link from "next/link";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  href: string;
};

const NavItem = ({ icon, label, open, href }: NavItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      {icon}
      {open && <span className={`ml-2`}>{label}</span>}
    </Link>
  );
};

export default NavItem;
