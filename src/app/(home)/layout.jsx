import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomeLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="p-6">{children}</div>
      <Footer />
    </div>
  );
}
