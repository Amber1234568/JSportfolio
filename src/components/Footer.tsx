export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-[680px] mx-auto px-6 py-10 border-t border-gray-100">
      <p className="text-[12px] text-gray-400">© {year} Jingcheng Shao (Amber)</p>
    </footer>
  );
}
