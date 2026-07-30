import { company } from "@/config/company";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-16">
      <div className="max-w-7xl mx-auto text-center">
        <p>{company.copyright}</p>
      </div>
    </footer>
  );
}